import ReconnectingWebSocket from 'reconnectingwebsocket';

export type Handler = (params: any) => Result;

type Result = { result: any } | {error:string};

export namespace Server {

    export function register(functionName: string, h: Handler) {

        if (!rpc) {
            (window as any).Rpc = {
                [functionName]: h,
            };
            return;
        }
        if (rpc[functionName]) {
            throw `${functionName} already exists`;
        }
        rpc[functionName] = h;
    }


    const rpc: {
        [K in string]: Handler;
    } = {};

    const ws = new ReconnectingWebSocket('ws://localhost:8080/rpc/out', [], {
        debug: true,
        automaticOpen: false,
    });


    rpc['NewMessage'] = (params) => {
        console.log(`Ура! сервер ответил: "${params.Message}"`);
        return {
            result: { Message: "OK!"},
        };
    };

    ws.onmessage = (event) => {

        let x = processDataFromServer(event.data);
        try {
            ws.send(JSON.stringify(x));
        } catch (e) {
            console.error('sending to server failed: ', x, e.toString());
            throw e;
        }

    };

    ws.open();


    function processDataFromServer(data: string): any {
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
}

export namespace Client {



    let ws = new ReconnectingWebSocket('ws://localhost:8080/rpc/in', [], {debug: true, automaticOpen: false});
    ws.onconnecting(() => {
        console.log('WS: connecting')
    });
    ws.onopen = function () {
        call('HelloService.Hello', {
            'msg': 'The quick brown fox jumps over the lazy dog'
        });
    };
    ws.open();

    const callMethodID = new Map<string, number>();
    let process = false;
    export function call(method: string, params: any) {

        if (process) {
            const prevOnMessage = ws.onmessage;
            ws.onmessage = async (event) => {
                prevOnMessage(event);
                await call(method,params);
            };
            return
        }

        let id = callMethodID.get(method);
        if (!id) {
            id = 0;
            callMethodID.set(method, id);
        }
        let awaitResult = new Promise<Result>(function (resolve, reject) {
            ws.onmessage = (event) => {
                process = false;
                ws.onmessage = () => {};
                try {
                    const r : Result = JSON.parse(event.data) ;
                    resolve( r );
                } catch (e) {
                    reject("parse json error: " + e.toString());
                }
            };
            process = true;
        });
        ws.send(JSON.stringify({
            jsonrpc: '2.0',
            method: method,
            params: params,
            id: id,
        }));
        return awaitResult;
    }


    (window as any).callServer = async function (s: string) {
        console.log( await call('HubService.Broadcast', { Message: s }) );
    };



}










