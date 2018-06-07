import {Result} from "./rpc";
import ReconnectingWebSocket from "reconnectingwebsocket";
import {webSocketURL} from "./utils/utils";

export class RpcClient {

    private readonly ws : ReconnectingWebSocket;

    private readonly callMethodID = new Map<string, number>();

    private waitResult = false;

    public constructor( url:string, continuationCallback : (_ : RpcClient) => void ) {

        this.ws = new ReconnectingWebSocket(webSocketURL(url), [], {
            debug: true,
            automaticOpen: false,
        });

        this.ws.onconnecting(() => {
            console.log('WS: connecting')
        });
        const that = this;
        this.ws.onopen = function () {
            continuationCallback(that);
        };
        this.ws.open();
    }

    public async Call(method: string, params: any)   {

        if (this.waitResult) {
            const prevOnMessage = this.ws.onmessage;
            return new Promise<Result>( (resolve, reject) => {
                this.ws.onmessage = async (event) => {
                    prevOnMessage(event);
                    resolve(await this.Call(method,params));
                };
            });
        }
        this.waitResult = true;
        const result = await this.doCall(method, params);
        this.waitResult = false;
        return result;
    }

    private doCall(method: string, params: any){
        let id = this.callMethodID.get(method);
        if (!id) {
            id = 0;
            this.callMethodID.set(method, id);
        }
        try{
            this.ws.send(JSON.stringify({
                jsonrpc: '2.0',
                method: method,
                params: params,
                id: id,
            }));
        } catch (e) {
            console.log("RpcClient: sending failed!");
            throw e;
        }

        return new Promise<Result>( (resolve, reject) => {
            this.ws.onmessage = (event) => {
                try {
                    resolve( <Result> JSON.parse(event.data) );
                } catch (e) {
                    reject("parse json error: " + e.toString());
                }
            };
        });
    }
}


