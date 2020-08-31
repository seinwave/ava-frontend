// This module exposes a singleton WebSocket connection to ShareDB server.
import sharedb from 'sharedb/lib/client';

// Uncomment lines 5 & 6 for use with dev server
// const host = window.location.host.replace("3000", "4000");
// const webSocket = new WebSocket('ws://' + host);

// Uncomment line 9 for use in deployment
const webSocket = new WebSocket('wss://ava-backend.herokuapp.com/');

const connection = new sharedb.Connection(webSocket);
export default connection;
