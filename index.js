"use strict";
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 50000 });

wss.on("connection", (ws) => {
    console.log("Connection established with a client!");
    let isReady = false;

    setInterval(function() {
        if (isReady) {
            ws.send("next");
        }
    }, 1500);
    ws.on("message", (message) => {
        console.log(`received a massage : ${message}`);
        if (message === "ready") {
            isReady = true;
            console.log("Now client is ready!");
        }
    });
});