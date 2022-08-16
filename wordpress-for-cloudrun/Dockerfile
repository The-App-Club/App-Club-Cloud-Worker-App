FROM trafex/php-nginx:latest

USER root

RUN apk add --no-cache curl

RUN cd /usr/local/bin && \
  curl -O https://raw.githubusercontent.com/wp-cli/builds/gh-pages/phar/wp-cli.phar && \
  chmod +x wp-cli.phar && \
  mv wp-cli.phar wp

# WordPressのダウンロード
RUN wp core download --locale=ja --path=/var/www/html

# 設定ファイルをコピー（データベース情報を設定）
COPY ./wp-config.php /var/www/html/wp-config.php

# WordPressのインストール
RUN wp core install \
  --url="https://wordpress-something-an.a.run.app" \
  --title="cowboy bebop" \
  --admin_user='HERE_YOUR_KEY' \
  --admin_password='HERE_YOUR_KEY' \
  --admin_email='HERE_YOUR_KEY' \
  --path=/var/www/html

# キャッチフレーズを空にする
RUN wp option update blogdescription ''

# 日本語
RUN wp language core install --activate ja

# タイムゾーンと日時表記
RUN wp option update timezone_string 'Asia/Tokyo'
RUN wp option update date_format 'Y-m-d'
RUN wp option update time_format 'H:i'

# パーマリンク設定
RUN wp option update permalink_structure /%year%/%monthnum%/%day%/%postname%/

# 外観
RUN wp theme delete twentysixteen
RUN wp theme delete twentyseventeen
RUN wp theme delete twentynineteen
RUN wp theme delete twentytwenty

# プラグイン
RUN wp plugin delete hello.php
RUN wp plugin delete akismet

# 固定ページ
RUN wp post create --post_type=page --post_title='About'

USER nobody

EXPOSE 8080