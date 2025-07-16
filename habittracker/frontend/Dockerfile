# Stage 1: Build the app
FROM node:18 AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build the app (Vite or React)
RUN npm run build

# Stage 2: Serve the static files
FROM node:18-slim
WORKDIR /app

# Install `serve` globally
RUN npm install -g serve

# Copy only the built output from builder stage
COPY --from=builder /app/dist ./dist

# Expose the port that `serve` uses
EXPOSE 3000

# Run the app using serve
CMD ["serve", "-s", "dist", "-l", "3000"]
