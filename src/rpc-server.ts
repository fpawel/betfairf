import {Handler, Result} from "./rpc";
import ReconnectingWebSocket from "reconnectingwebsocket";
import {webSocketURL} from "./utils/utils";

export class RpcServer {

    private  readonly rpc : { [K in string]: Handler   } = {};

    private  readonly ws : ReconnectingWebSocket;

    public Register(functionName: string, h: Handler) {
        if (this.rpc[functionName]) {
            throw `${functionName} already exists`;
        }
        this.rpc[functionName] = h;
    }

    public constructor(url:string){
        this.ws = new ReconnectingWebSocket(webSocketURL(url), [], {
            debug: true,
            automaticOpen: false,
        });

        this.ws.onmessage = (event) => {

            let x = processDataFromPeer(this.rpc, event.data);
            try {
                this.ws.send(JSON.stringify(x));
            } catch (e) {
                console.error('sending to server failed: ', x, e.toString());
                throw e;
            }

        };

        this.ws.open();
    }
}

function processDataFromPeer(rpc : { [K in string]: Handler }, data: string): any {
    let x: {
        jsonrpc?: string,
        method?: string,
        params?: any,
        id?: any,
    };

    const response = (y: any) => {
        y['jsonrpc'] = '2.0';
        y['id'] = x.id;
        return y;
    };

    const error = (code: number, message: string) => {
        return response({error: {code: code, message: message}});
    };

    try {
        x = JSON.parse(data);
    } catch (e) {
        return error(-32700, "parse error: " + e.toString());
    }

    let invalidJsonError = (s: String) => {
        return error(-32600, "invalid JSON-RPC: " + s + ": " + data);
    };

    if (!x.jsonrpc) {
        return invalidJsonError("'jsonrpc' not presented")
    }
    if (x.jsonrpc !== '2.0') {
        return invalidJsonError("jsonrpc !== '2.0'");
    }
    if (!x.method) {
        return invalidJsonError("'method' not presented");
    }

    const fun: Handler = rpc[x.method];
    if (!fun) {
        return error(-32601, `method not found: ${x.method}`);
    }

    let result: Result;

    try {
        result = fun(x.params);
    } catch (e) {
        return error(-32001, "internal exception: " + e.toString());
    }

    if ('error' in result) {
        return error(-32000, "internal error:  " + result.error);
    }

    if (result.result) {
        return response({result: result.result});
    }

    return response({method: x.method});
}

