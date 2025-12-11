FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api-gateway/package.json ./apps/api-gateway/

RUN npm install

COPY . .

RUN npm run build --workspace=api-gateway


FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/apps/api-gateway/dist ./dist

CMD ["node", "dist/src/main.js"]