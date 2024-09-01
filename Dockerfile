FROM node:21-alpine3.20 AS build
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine3.20-slim
WORKDIR /usr/share/nginx/html
COPY --from=build /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]