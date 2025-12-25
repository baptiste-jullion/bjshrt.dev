FROM node:22-slim AS base
ENV BUN_INSTALL=/bun \
	PATH="/bun/bin:$PATH"
RUN apt-get update \
	&& apt-get install -y curl unzip \
	&& rm -rf /var/lib/apt/lists/* \
	&& curl -fsSL https://bun.sh/install | bash
WORKDIR /app

FROM base AS deps
COPY package*.json ./
RUN bun install

FROM deps AS build
COPY . .
RUN bun run build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]