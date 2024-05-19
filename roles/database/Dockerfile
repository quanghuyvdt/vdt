FROM mongo
# ENV MONGO_INITDB_ROOT_USERNAME=root
# ENV MONGO_INITDB_ROOT_PASSWORD=1234
VOLUME [ "/data/db" ]
COPY init.js /docker-entrypoint-initdb.d/
EXPOSE 27017
CMD [ "mongod" ]