import WebSocket, { WebSocketServer } from "ws";
import dotenv from "dotenv";

dotenv.config();

const wss = new WebSocketServer({ port: 8080 });

wss.on("listening", function listening() {
	console.clear();
	console.log("Server is listening on port 8080");
});

// When any client connects to this server via WebSocket
wss.on("connection", function connection(ws, req) {
	const channel = req.headers.channel || "general";

	console.log("Client connected with channel:", channel);

	// send new joining message to every other connected clients, excluding itself
	wss.clients.forEach(function each(client) {
		if (client !== ws && client.readyState === WebSocket.OPEN) {
			client.send(
				JSON.stringify({
					channel,
					message: "A new user has joined the channel",
				}),
			);
		}
	});

	// when a message is received, broadcasting to every other connected WebSocket clients, excluding itself
	ws.on("message", function message(data) {
		console.log("Broadcasting:", JSON.parse(data.toString()));

		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(data.toString());
			}
		});
	});

	ws.on("error", (err) => console.error(`${err.name}: ${err.message}`));
});
