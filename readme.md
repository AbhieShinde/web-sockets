`docker build -t abhieshinde/websocket-server:latest .`
`docker run -p 8080:8080 abhieshinde/websocket-server:latest`
`docker buildx build --platform linux/amd64 -t abhieshinde/websocket-server:latest --push .`
