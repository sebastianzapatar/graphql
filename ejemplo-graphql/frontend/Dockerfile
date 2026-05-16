# ============================================================
# Dockerfile multi-stage para el frontend React + Vite
# Stage 1: Build con Node.js
# Stage 2: Servir con Nginx (ligero)
# ============================================================

# --- STAGE 1: Build ---
FROM node:20-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias primero (cacheo de capas Docker)
COPY package.json package-lock.json ./
RUN npm ci

# Variable de entorno para la URL del backend GraphQL
# En Docker, el frontend accede al backend via hostname del compose
ARG VITE_GRAPHQL_URL=http://localhost:8080/graphql
ENV VITE_GRAPHQL_URL=$VITE_GRAPHQL_URL

# Copiar codigo fuente y compilar
COPY . .
RUN npm run build

# --- STAGE 2: Serve ---
FROM nginx:alpine
# Copiar archivos compilados al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copiar configuracion custom de Nginx para SPA (React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
