`docker build -t abhieshinde/websocket-server:latest .`
`docker run -p 8080:8080 abhieshinde/websocket-server:latest`
`docker buildx build --platform linux/amd64 -t abhieshinde/websocket-server:latest --push .`

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=websocket-server&type=docker&image=abhieshinde%2Fwebsocket-server%3Alatest&instance_type=free&instances_min=0&autoscaling_sleep_idle_delay=300&ports=8080%3Bhttp%3B%2F&hc_protocol%5B8080%5D=tcp&hc_grace_period%5B8080%5D=5&hc_interval%5B8080%5D=30&hc_restart_limit%5B8080%5D=3&hc_timeout%5B8080%5D=5&hc_path%5B8080%5D=%2F&hc_method%5B8080%5D=get)
