##FROM nginx
##COPY /dist/spa  /var/www
##COPY nginx.conf /etc/nginx/nginx.conf
##EXPOSE 3000
##ENTRYPOINT ["nginx", "-g", "daemon off;"]

##FROM httpd:latest
##COPY /dist/spa /var/local/apache2/htdocs/titanv23

FROM node:latest AS build-stage
WORKDIR /app

COPY package*.json ./
COPY quasar.conf.js ./
COPY ./ ./

RUN npm install
RUN npm install -g @vue/cli
RUN npm install -g @quasar/cli
RUN quasar build

FROM nginx AS production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
