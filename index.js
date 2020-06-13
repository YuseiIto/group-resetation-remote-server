"use strict";
console.log("Server started");

const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 50000 });

let hosts = [];

function broadcast(messageType, spaceId) {
    for (const ws of hosts) {
        if (ws.spaceId == spaceId) {
            ws.ws.send(messageType);
        }
    }
}

setInterval(function() {
    for (const ws of hosts) {
        ws.ws.send("check");
    }

    hosts = [];

    console.log("Hostlists are released!");
}, 10000);

wss.on("connection", (ws) => {
    console.log("Connection established with a client!");
    let isReady = false;
    let type = "host"; // 'host' or 'opetator'

    ws.on("message", (data) => {

        const [message, spaceId] = data.split('#').map(x => x);

        console.log(`received a massage : ${message}`);

        switch (message) {
            case "ready":
                isReady = true;
                hosts.push({ ws, spaceId });
                break;
            case "next":
                broadcast('next', spaceId);
                break;
            case "prev":
                broadcast('prev', spaceId);
                break;
        }
        console.log(`Signal ${message}@${spaceId} `)
    });
});