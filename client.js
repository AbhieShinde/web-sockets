import WebSocket from "ws";
import dotenv from "dotenv";

dotenv.config();

// get arguments from command line
const channel = process.argv.slice(2)[0];

if (!channel) {
	console.error("Please provide a channel ID as an argument.");
	process.exit(1);
}

console.log("Connecting to server...");

const ws = new WebSocket(process.env.WEBSOCKET_URL, {
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

// send messages to server every 5 seconds
setInterval(function ping() {
	ws.send(
		JSON.stringify({ channel, message: `Message from channel ${channel}` }),
	);
}, 5000);
