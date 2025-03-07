FROM node:20-alpine AS build

ARG buildenv

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build:${buildenv}

FROM nginx:alpine

COPY --from=build /app/nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=build /app/dist /usr/share/nginx/html

ENV PORT=80
ENV HOST=0.0.0.0
EXPOSE 80

CMD ["sh", "-c", "envsubst '$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
