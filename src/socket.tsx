import  ReconnectingWebSocket from 'reconnecting-websocket';

const rws = new ReconnectingWebSocket('ws://my.site.com');

rws.addEventListener('open', () => {
    rws.send('hello!');
    return undefined;
});