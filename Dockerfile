FROM node:14

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN yarn install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# build app for production with minification
# RUN yarn run build

EXPOSE 8080
CMD ["npm", "run", "serve"]

# develop stage
# FROM node:14 as develop-stage
# WORKDIR /home/app/code
# COPY package.json ./
# RUN yarn install
# COPY . .

# # build stage
# FROM develop-stage as build-stage
# CMD ["yarn", "serve"]
# RUN yarn build

# production stage
# FROM nginx:alpine as production-stage
# COPY --from=build-stage /home/app/code/dist /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]
