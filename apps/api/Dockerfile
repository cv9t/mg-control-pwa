ARG PORT

FROM node:18-slim as builder

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn ci

COPY . .

RUN yarn build:api

FROM node:18-alpine as runner

WORKDIR /app

COPY --from=builder /app/dist/apps/api ./dist

COPY package*.json yarn.lock ./

EXPOSE ${PORT}

CMD ["node", "dist/main.js"]