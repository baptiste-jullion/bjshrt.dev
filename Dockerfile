FROM node:24-slim

# install bun
RUN curl -fsSL https://bun.sh/install | bash

WORKDIR /app

# install dependencies
COPY package.json bun.lock ./

RUN bun install

# copy source code
COPY . .

# build the application
RUN bun run start