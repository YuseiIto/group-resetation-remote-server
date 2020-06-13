"use strict";
console.log("Server started");

const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 50000 });

let hosts = [];

function broadcastNext() {
    for (const ws of hosts) {
        ws.send("next");
    }
}

function broadcastPrev() {
    for (const ws of hosts) {
        ws.send("prev");
    }
}

setInterval(function() {
    for (const e of hosts) {
        e.send("check");
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
                hosts.push(ws);
                console.log("Signal: ready");
                break;
            case "next":
                broadcastNext();
                console.log("Signal : next");
                break;
            case "prev":
                broadcastPrev();
                console.log("Signal : prev");
                break;
        }
    });
});