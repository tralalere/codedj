FROM node:8

RUN apt-get update
RUN apt-get install -y curl libav-tools sox nodejs npm bash

RUN mkdir /home/node/codedj

ADD ./ /home/node/codedj

EXPOSE 8000

# build the image
# docker build -t tralalere/codedj-backend .
# run container
# docker run --name codedj -p 8000:8000 tralalere/codedj-backend /bin/bash
