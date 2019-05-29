#!/bin/bash +x

PROJECT="/home/ubuntu/vikings/web"
PROJECT_TMP="/home/ubuntu/tmp/web"
TAR_TMP="/home/ubuntu/tmp"
WWW_DIR="/var/www/public"

cd $PROJECT_TMP && tar -xvf $TAR_TMP/web-vikings-source.tar.gz

sleep 3

shopt -s extglob
cd $PROJECT && rm -rf ./!(node_modules)

/usr/bin/rsync -a $PROJECT_TMP/ $PROJECT/

sleep 3

rm -rf $PROJECT_TMP/*

#rm $PROJECT/package-lock.json

cd $PROJECT && npm install

mkdir $PROJECT/public

cd $PROJECT && npm run build

rm -rf $WWW_DIR/*

/usr/bin/rsync -a $PROJECT/public/ $WWW_DIR/

chmod -R 775 /var/www/public

sudo /etc/init.d/nginx restart

#cd $PROJECT && pm2 start server.js

exit 0