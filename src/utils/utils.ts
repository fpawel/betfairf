export function webSocketURL (uri : string) {
    const proto = document.location.protocol.replace("http", "ws");
    return `${proto}//${document.location.host}${uri}`;
}