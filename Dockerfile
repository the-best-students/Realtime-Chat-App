# --- STAGE 1: Build the Frontend ---
# Use a Node 20 environment for building
FROM node:20-alpine AS frontend_builder

# Set the working directory inside the container
WORKDIR /app

# Copy the frontend package files and install dependencies
# This is more efficient as it invalidates the cache only when package.json changes
COPY frontend/package*.json ./frontend/
RUN npm install --legacy-peer-deps --prefix frontend

# Copy the rest of the frontend source code
COPY frontend/ ./frontend/

# Build the frontend (this creates the 'dist' folder)
RUN npm run build --prefix frontend


# --- STAGE 2: Install Backend Dependencies and Prepare the Production Image ---
# Use a fresh Node 20 environment for the final runtime image
FROM node:20-alpine AS production_stage

# Set the working directory
WORKDIR /app

# Copy the main package files
COPY package*.json .

# Copy the entire backend source code (which includes server.js, lib/, and middleware/)
COPY backend/ ./backend/

# Install *only* production dependencies for the main project
# The "start" script only needs dependencies listed in 'dependencies'
RUN npm install --omit=dev

# Copy the built frontend 'dist' folder from the first stage
# This puts the static assets at /app/frontend/dist/ where server.js expects them.
COPY --from=frontend_builder /app/frontend/dist ./frontend/dist

# EXPOSE the port the server listens on
EXPOSE 3000

# Command to run the application in production
# This runs your "start" script: "node backend/server.js"
CMD ["npm", "start"]