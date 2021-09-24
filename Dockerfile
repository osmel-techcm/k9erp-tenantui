FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=node /app/dist/tenantUi /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]