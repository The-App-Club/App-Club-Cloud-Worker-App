- Accomplish
  - Plantscaleへの接続

- Todo
  - Serveできてない

- Ref
  - [wordpress](https://hub.docker.com/_/wordpress)
  - [planetscale](https://planetscale.com/blog/announcing-vitess-8)
  - [ca-root-configuration](https://docs.planetscale.com/concepts/secure-connections#ca-root-configuration)
  - [using-environment-variables-in-wordpress-wp-config](https://stackoverflow.com/questions/9300950/using-environment-variables-in-wordpress-wp-config)
  - [azure-mysql-ssl](https://k-miyake.github.io/blog/azure-mysql-ssl/)
  - [configure-wordpress-on-azure-cloud-service-to-connect-to-azure-mysql-over-ssl](https://stackoverflow.com/questions/47959933/configure-wordpress-on-azure-cloud-service-to-connect-to-azure-mysql-over-ssl)
  - [wp-gcloud-run](https://github.com/peterkracik/wp-gcloud-run)
  - [connect-to-mariadb](https://www.mariadbtutorial.com/getting-started/connect-to-mariadb/)
  - [wp-cli](https://qiita.com/IK12_info/items/4a9190119be2a0f347a0)

```bash
$ time docker build -t wordpress-for-cloudrun .

$ docker run -p 80:8080 wordpress-for-cloudrun
```

- Deploy

```bash
$ export GOOGLE_CLOUD_PROJECT_ID=something

$ time gcloud builds submit --tag gcr.io/${GOOGLE_CLOUD_PROJECT_ID}/wordpress-for-cloudrun

$ time gcloud run deploy wordpress --port 8080 --platform managed --region asia-northeast1 --allow-unauthenticated --set-env-vars GOOGLE_CLOUD_PROJECT_ID=${GOOGLE_CLOUD_PROJECT_ID} --image gcr.io/${GOOGLE_CLOUD_PROJECT_ID}/wordpress-for-cloudrun
```

- Clean Up

```bash
$ docker images | awk '$1=="<none>"{print $3}' | xargs docker rmi

$ docker ps -a | awk '{print $1}' | tail -n+2 | xargs -I@ bash -c 'docker stop @ && docker rm @'
```

```sql
DROP TABLE IF EXISTS wp_commentmeta;
DROP TABLE IF EXISTS wp_comments;
DROP TABLE IF EXISTS wp_links;
DROP TABLE IF EXISTS wp_options;
DROP TABLE IF EXISTS wp_postmeta;
DROP TABLE IF EXISTS wp_posts;
DROP TABLE IF EXISTS wp_term_relationships;
DROP TABLE IF EXISTS wp_term_taxonomy;
DROP TABLE IF EXISTS wp_termmeta;
DROP TABLE IF EXISTS wp_terms;
DROP TABLE IF EXISTS wp_usermeta;
DROP TABLE IF EXISTS wp_users;
```