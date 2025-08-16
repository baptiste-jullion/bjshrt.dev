# Start with official Node image (so you get npm, npx, etc.)
FROM node:24-slim

# Install curl for fetching Bun
RUN apt-get update && apt-get install -y curl unzip \
    && curl -fsSL https://bun.sh/install | bash \
    && mv /root/.bun/bin/bun /usr/local/bin/bun \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./

# Install dependencies with Bun
RUN bun install

# Copy rest of the project
COPY . .

# Expose Nuxt default port
EXPOSE 3000

# Default command for development
CMD ["bun", "run", "dev"]
