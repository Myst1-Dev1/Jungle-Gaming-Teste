FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/tasks-service/package.json ./apps/tasks-service/

RUN npm install

COPY . .

RUN npm run build --workspace=tasks-service


FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/apps/tasks-service/dist ./dist

CMD ["node", "dist/main.js"]