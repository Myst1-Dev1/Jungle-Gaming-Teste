FROM node:22-alpine AS builder

WORKDIR /app

# Copia somente o package.json + lock + config dos workspaces
COPY package.json package-lock.json ./

# Copia somente os package.json dos apps/libs (importante para npm workspaces)
COPY apps/auth-service/package.json ./apps/auth-service/

# Instala dependências dos workspaces
RUN npm install

# Agora copia o restante do código
COPY . .

# Build do serviço específico
RUN npm run build --workspace=auth-service


FROM node:22-alpine AS runner

WORKDIR /app

# Copia a pasta dist do serviço
COPY --from=builder /app/apps/auth-service/dist ./dist

# Copia node_modules completo
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "dist/main.js"]