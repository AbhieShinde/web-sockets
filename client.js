import WebSocket from "ws";

// get arguments from command line
const channel = process.argv.slice(2)[0];

if (!channel) {
	console.error("Please provide a channel ID as an argument.");
	process.exit(1);
}

console.log("Connecting to server...");

const ws = new WebSocket("ws://127.0.0.1:8080", {
	headers: { channel },
});

ws.on("error", (err) => console.error(`${err.name}: ${err.message}`));

ws.on("open", function open() {
	console.clear();
	console.log("Connected to server!");
	ws.send(JSON.stringify({ channel, message: "Jay Shriram!" }));
});

ws.on("message", function incoming(data) {
	console.log("received from server: %s", data);
});

ws.on("close", function close() {
	console.log("Disconnecting from server...");
	process.exit(1);
});

// send messages to server every 2 seconds
setInterval(function ping() {
	ws.send(
		JSON.stringify({ channel, message: `Message from channel ${channel}` }),
	);
}, 2000);
