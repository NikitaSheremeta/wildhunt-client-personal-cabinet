FROM nginx

RUN mkdir /app

COPY --from=node/client-personal-cabinet /app/dist /app

COPY conf.d/default.conf /etc/nginx/conf.d/default.conf
