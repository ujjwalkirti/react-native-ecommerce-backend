# Stage 1: Build Stage
FROM node:lts AS build

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for caching dependencies)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the remaining files
COPY . .

# Compile TypeScript
RUN npm run build

# Stage 2: Production Stage
FROM node:lts-alpine AS production

# Set working directory
WORKDIR /usr/src/app

# Copy only necessary files from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Set environment variable (optional)
ENV NODE_ENV=production

# Expose a default port (metadata only)
EXPOSE 3000  

# Start the application
CMD ["node", "dist/index.js"]
