# Use the official Node.js 18 image as the base
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 8080 for the WebSocket server
EXPOSE 8080

# Start the WebSocket server
CMD ["node", "server.js"]