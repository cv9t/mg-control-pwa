FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn ci

COPY . .

RUN yarn build:web

FROM nginx:1.25-alpine-slim 

COPY ./apps/web/nginx.conf /etc/nginx/templates/nginx.conf.template

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/apps/web /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]