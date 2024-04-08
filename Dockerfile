FROM ampregistry:5000/tengine:3.0.0
RUN npm config set fse_binary_host_mirror https://npm.taobao.org/mirrors/fsevents && mkdir /home/node/web-large-model-demo

# 指定 docker 执行环境
ENV WORKPATH /home/node/web-large-model-demo
WORKDIR /home/node/web-large-model-demo

# RUN npm cache clean --force

# 当这两个文件未更改时，可利用缓存加速
COPY ./package.json /home/node/web-large-model-demo
COPY ./package-lock.json /home/node/web-large-model-demo
RUN npm install --registry=https://npm-registry.megvii-inc.com/

ARG ENV

COPY . /home/node/web-large-model-demo
RUN npm run build

# FROM nginx:latest
# FROM mcd.io/mcd-infras/nginx:latest
FROM registry.cn-hangzhou.aliyuncs.com/srg/www-nginx

RUN rm -rf /etc/nginx/conf.d/default.conf && \
    rm -rf /etc/nginx/nginx.conf
COPY --from=builder /home/node/web-large-model-demo/.nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /home/node/web-large-model-demo/dist/ /usr/share/nginx/html/
