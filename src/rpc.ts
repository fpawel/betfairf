export type Handler = (params: any) => Result;

export type Result = { result: any } | {error:string};

// import { RpcClient } from "./rpc-client";
// import { RpcServer } from "./rpc-server";
//
// const rpcServer = new RpcServer('rpc/out');
//
// rpcServer.Register('NewMessage', (params) => {
//     console.log(`Ура! сервер ответил: "${params.Message}"`);
//     return {
//         result: { Message: "OK!"},
//     };
// });
//
// const rpcClient = new RpcClient( 'rpc/in',async (c) => {
//     const a = await c.Call('HelloService.Hello', {
//          'msg': 'The quick brown fox jumps over the lazy dog'
//     });
//     console.log("HelloService.Hello:",a);
// });
//
// (window as any).callServer = async function (s: string) {
//     console.log( await rpcClient.Call('HubService.Broadcast', { Message: s }) );
// };

