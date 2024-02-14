import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("listening", function listening() {
	console.clear();
	console.log("Server is listening on port 8080");
});

// When any client connects to this server via WebSocket
wss.on("connection", function connection(ws, req) {
	ws.on("error", (err) => console.error(`${err.name}: ${err.message}`));

	console.log("Client connected with channel ID:", req.headers.channel);

	// broadcasting to every other connected WebSocket clients, excluding itself
	ws.on("message", function message(data) {
		console.log(
			"broadcasting message:",
			JSON.parse(data.toString()).message,
		);

		wss.clients.forEach(function each(client) {
			if (client !== ws && client.readyState === WebSocket.OPEN) {
				client.send(JSON.parse(data.toString()).message);
			}
		});
	});
});
