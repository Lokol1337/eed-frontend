# develop stage
FROM node:lts-alpine as develop-stage
WORKDIR /home/app/code
COPY package.json ./
RUN yarn install
COPY . .

# build stage
FROM develop-stage as build-stage
RUN yarn build

# production stage
FROM nginx:1.15.7-alpine as production-stage
COPY --from=build-stage /home/app/code/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
