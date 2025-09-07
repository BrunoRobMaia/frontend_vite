FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json* ./

RUN pnpm install

COPY . .

RUN pnpm build

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
