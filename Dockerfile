# Use Node.js LTS version
FROM node:lts

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy remaining files
COPY . .

# Build the production version
RUN npm run build

# Set environment variable (optional)
ENV NODE_ENV=production

# Expose a default port (metadata only)
EXPOSE 3000  

# Start the application using env var for PORT
CMD ["sh", "-c", "PORT=${PORT:-3000} npm run start"]
