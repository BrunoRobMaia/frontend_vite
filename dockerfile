# Etapa de construção (Build Stage)
FROM node:18-alpine AS builder

# Configuração do ambiente
ENV NODE_ENV=production

# Instala o pnpm globalmente
RUN corepack enable && corepack prepare pnpm@latest --activate

# Cria e define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json pnpm-lock.yaml* ./

# Instala as dependências de produção
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prod=false

# Copia o restante dos arquivos do projeto
COPY . .

# Constrói a aplicação
RUN pnpm build

# Etapa de produção (Production Stage)
FROM nginx:stable-alpine

# Remove o arquivo de configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia o arquivo de configuração personalizado do Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Remove arquivos desnecessários do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos construídos da etapa anterior
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Define a saúde do container
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
