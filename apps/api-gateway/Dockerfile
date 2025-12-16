FROM node:20-alpine AS base
WORKDIR /app

FROM base AS pruner

COPY package.json package-lock.json ./
COPY apps ./apps
COPY packages ./packages
COPY turbo.json ./

RUN npx turbo prune api-gateway --docker

FROM base AS builder

COPY --from=pruner /app/out/json/ ./
COPY --from=pruner /app/out/package-lock.json ./package-lock.json

RUN npm install

COPY --from=pruner /app/out/full/ ./

RUN npm run build --workspace=api-gateway

FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api-gateway/dist ./dist
COPY --from=builder /app/apps/api-gateway/package.json ./package.json

CMD ["node", "dist/main.js"]