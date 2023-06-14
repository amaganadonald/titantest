##FROM node AS buildenv

##WORKDIR /generator

##ENV projectName "titanv28"

##COPY package.json .

##RUN npm install

##RUN node node_modules/quasar-cli/bin/quasar-build

# Runtime stage

##FROM nginx
##ENV projectName "titanv28"
##COPY --from=buildenv /generator/dist/spa-mat /usr/share/nginx/html
#COPY ./${projectName}/default.conf /etc/nginx/conf.d/default.conf

##EXPOSE 9000
# develop stage
##FROM node:20-alpine as develop-stage
##WORKDIR /app
##COPY package*.json ./
##RUN yarn global add @quasar/cli
##COPY . .
# build stage
##FROM develop-stage as build-stage
##RUN yarn
##RUN quasar build
# production stage
##FROM nginx:1.25.0-alpine as production-stage
##COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
##EXPOSE 8000
##CMD ["nginx", "-g", "daemon off;"]

FROM node:20-alpine as global-deps-stage
##RUN npm i --location=global @quasar/cli@latest

FROM global-deps-stage as develop-stage
WORKDIR /src
COPY package.json ./
COPY yarn.lock ./
COPY . .

FROM develop-stage as local-deps-stage
RUN yarn

FROM local-deps-stage as build-stage
RUN quasar build -m spa

FROM nginx:stable-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /src/dist/spa /usr/share/nginx/html
##COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8000
CMD ["nginx", "-g", "daemon off;"]

