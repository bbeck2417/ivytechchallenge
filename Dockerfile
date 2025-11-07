# Use official Node LTS base image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package manifests and install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy app sources
COPY . .

# Cloud Run expects the app to listen on the PORT env var. Default to 8080.
ENV PORT 8080
EXPOSE 8080

# Start the app
CMD [ "node", "server.js" ]
