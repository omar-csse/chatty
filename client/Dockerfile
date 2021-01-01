FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn global add react-scripts --silent
RUN yarn install
RUN yarn run build

FROM node:lts-alpine
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "3000", "-s", "."]