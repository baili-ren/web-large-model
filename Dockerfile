FROM nginx:1.17.6

RUN mkdir -p /app
WORKDIR /app

ADD nginx.conf /etc/nginx/conf.d/default.conf
ADD dist/ /usr/share/nginx/html/
