const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 50000 });
console.log("WSS started!");
wss.on("connection", (ws) => {
    console.log("Connection established with a client!");
    ws.on("message", (message) => {
        console.log(`received a massage : ${message}`);
        ws.send("Hello");
    });
});