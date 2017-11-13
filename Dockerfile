FROM node:8

RUN apt-get update
RUN apt-get install -y curl\
                       libav-tools\
                       sox\
                       bash\
                       vim\
                       libsox-fmt-mp3
RUN mkdir /codedj
ADD ./ /codedj

RUN tar xvf /codedj/back/exporter/ffmpeg/ffmpeg-release-64bit-static.tar.xz
RUN ls -lisa /ffmpeg-3.4-64bit-static
RUN cp /ffmpeg-3.4-64bit-static/ffmpeg /usr/local/bin
RUN cp /ffmpeg-3.4-64bit-static/ffprobe /usr/local/bin

RUN cd /codedj
RUN npm install
RUN npm i mocha -g
RUN npm i chai -g

EXPOSE 8000
EXPOSE 9229

# build the image
# docker build -t tralalere/codedj-backend .
# run container
# docker run --name codedj -p 8000:8000 tralalere/codedj-backend /bin/bash
