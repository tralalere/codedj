# Exporter video Youtube
======

Le composant "Exporter vidéo Youtube" permet construire une vidéo au format mp4 à partir d'un son mp3 et une image statique.

Le composant est implémenté via le paquet npm *fluent-ffmpeg* offrant une api fluent qui fait appel à librairie linux *FFMpeg*.



### Installation de FFmpeg
======

Selon votre version du serveur ubuntu 32bit ou 64bit, copier le contenu respectivement des archives **ffmpeg/ffmpeg-release-32bit-static.tar.xz** et **ffmpeg/ffmpeg-release-64bit-static.tar.xz** dans le dossier **/usr/bin**

```
$ tar xvf ffmpeg/ffmpeg/ffmpeg-release-64bit-static.tar.xz

$ ls -l ffmpeg-3.4-64bit-static/
total 185704
-rw-r--r-- 1 node node    35147 Oct 16 17:38 GPLv3.txt
-rwxr-xr-x 1 node node 48875080 Oct 16 17:31 ffmpeg
-rwxr-xr-x 1 node node 50075080 Oct 16 17:38 ffmpeg-10bit
-rwxr-xr-x 1 node node 48780872 Oct 16 17:31 ffprobe
-rwxr-xr-x 1 node node 41625288 Oct 16 17:31 ffserver
drwxr-xr-x 2 node node     4096 Oct 16 17:33 manpages
drwxr-xr-x 2 node node     4096 Oct 16 17:14 model
-rwxr-xr-x 1 node node   742472 Oct 16 17:31 qt-faststart
-rw-r--r-- 1 node node     2883 Oct 16 17:38 readme.txt

$ cp ffmpeg-3.4-64bit-static/* /usr/bin

$ ffmpeg -version
ffmpeg version 3.4-static http://johnvansickle.com/ffmpeg/  Copyright (c) 2000-2017 the FFmpeg developers
built with gcc 6.4.0 (Debian 6.4.0-7) 20170920
configuration: --enable-gpl --enable-version3 --enable-static --disable-debug --disable-ffplay --disable-indev=sndio --disable-outdev=sndio --cc=gcc-6 --enable-fontconfig --enable-frei0r --enable-gnutls --enable-gray --enable-libfribidi --enable-libass --enable-libvmaf --enable-libfreetype --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libopenjpeg --enable-librubberband --enable-librtmp --enable-libsoxr --enable-libspeex --enable-libvorbis --enable-libopus --enable-libtheora --enable-libvidstab --enable-libvo-amrwbenc --enable-libvpx --enable-libwebp --enable-libx264 --enable-libx265 --enable-libxvid --enable-libzimg
libavutil      55. 78.100 / 55. 78.100
libavcodec     57.107.100 / 57.107.100
libavformat    57. 83.100 / 57. 83.100
libavdevice    57. 10.100 / 57. 10.100
libavfilter     6.107.100 /  6.107.100
libswscale      4.  8.100 /  4.  8.100
libswresample   2.  9.100 /  2.  9.100
libpostproc    54.  7.100 / 54.  7.100
```
