FROM ampregistry:5000/tengine:3.0.0

ENV WORK_PATH /etc/nginx

ENV CONF_FILE_NAME nginx.conf

RUN rm $WORK_PATH/$CONF_FILE_NAME

COPY ./$CONF_FILE_NAME $WORK_PATH/

COPY ./dist/. $WORK_PATH/dist/

RUN chmod a+r $WORK_PATH/$CONF_FILE_NAME

# RUN   mkdir -p /data/h5/

# ADD  visiter_h5.tar.gz  /data/h5/

# RUN  mv /data/h5/dist/*   /data/h5/

# RUN  rm -rf   /data/h5/dist

# tvapp
# RUN chmod a+r $WORK_PATH/$CONF_FILE_NAME

# RUN   mkdir -p /data/tvapp-web/

# ADD  pangu_tvapp.tar.gz  /data/tvapp-web/

CMD ["nginx", "-g", "daemon off;"]

# RUN mkdir -p /data/ops/

# ADD pangu-builder-front-devops.tar.gz /data/ops/

# RUN  mv /data/ops/dist/*  /data/ops/

# RUN  rm -rf  /data/ops/dist
