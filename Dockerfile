FROM ampregistry:5000/tengine:3.0.0

ENV WORK_PATH /etc/nginx

ENV CONF_FILE_NAME nginx.conf

RUN rm $WORK_PATH/$CONF_FILE_NAME

COPY ./$CONF_FILE_NAME $WORK_PATH/

COPY ./dist/. $WORK_PATH/dist/

RUN chmod a+r $WORK_PATH/$CONF_FILE_NAME

CMD ["nginx", "-g", "daemon off;"]
