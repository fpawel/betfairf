import ReconnectingWebSocket from 'reconnectingwebsocket';

export type Handler = (params: any) => Result;

interface Result {
    result?: any;
    error?: string;
}

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

register('SomeFoo', (params: any) => {
    console.log('SomeFoo: ', params);
    return {};
});



const ws = new ReconnectingWebSocket('ws://localhost:8080/rpc/out', [], {
    debug: true,
    automaticOpen: false,
});

ws.onmessage = (event) => {

    if (!rpc) {
        throw 'Rpc not defined'
    }

    let x  = processDataFromServer(event.data);
    console.log( event.data, '-->',x);
    try {
        ws.send(JSON.stringify(x));
    } catch (e) {
        console.error('sending to server failed: ', x, e.toString());
        throw e;
    }

};

ws.open();

let rpc = (window as any).Rpc;

function processDataFromServer(data: string) {
    let x: {
        jsonrpc?: string,
        method?: string,
        params?: any,
        id?: number,
    };
    try {
        x = JSON.parse(data);
    } catch (e) {
        return {
            jsonrpc: '2.0',
            error: { code: -32700, message: "Parse error: " + e.toString() },
            id:null,
        };
    }

    let {jsonrpc, method, params, id} = x;
    if (!jsonrpc || jsonrpc !== '2.0' || !id || !method) {
        return {
            jsonrpc: '2.0',
            error: {code: -32600, message: "Invalid JSON-RPC."}, id: id
        };
    }
    const fun : Handler = rpc[method];
    if (!fun) {
        return {
            jsonrpc: '2.0',
            error: {code: -32601, message: "Procedure not found: " + method}, id: id
        };
    }

    let result : Result;

    try {
        result = fun(params);
    } catch (e) {
        return {
            jsonrpc: '2.0',
            error: {code: -32000, message: "Web client error: " + e.toString()}, id: id
        };
    }

    if (result.error) {
        return {
            jsonrpc: '2.0',
            error: {code: -32603, message: "Internal JSON-RPC error: " + result.error}, id: id
        };
    }

    if (result.result) {
        return { jsonrpc: '2.0', result: result, id: id };
    }

    return { jsonrpc: '2.0', method: method, id: id };
}
