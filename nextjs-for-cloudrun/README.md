- Reference
  - https://cloud.google.com/blog/ja/topics/developers-practitioners/cloud-run-story-serverless-containers
  - https://jdriscoll.pro/google-cloud-run-vs-cloud-functions-45e1307be8df
  - https://nextjs.org/docs/deployment
  - https://cloud.google.com/sdk/gcloud/reference/container/images/delete

## Create Local Docker Image

```bash
$ time docker build -t nextjs-on-cloudrun .

real    3m38.337s
user    0m1.120s
sys     0m0.997s
```

```bash
$ docker images
REPOSITORY           TAG       IMAGE ID       CREATED              SIZE
nextjs-on-cloudrun   latest    3330b2a7bb9b   About a minute ago   357MB
```

## Launch Local Docker Image

```bash
$ docker run -p 3000:3000 nextjs-on-cloudrun
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```


## Create Remote Docker Image

```bash
$ gcloud config list
[core]
account = something@something.iam.gserviceaccount.com
disable_usage_reporting = False
project = something
[functions]
region = asia-northeast1

Your active configuration is: [default]
```


```bash
$ time gcloud builds submit --tag gcr.io/something/nextjs-on-cloudrun --project something

DONE
-------------------------------------------------------------------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE
                                   IMAGES                                                   STATUS
d329c1f5-e695-4a5e-9f22-d13ebf774f04  2022-01-02T12:59:41+00:00  2M8S      gs://something_cloudbuild/source/1641128378.292137-5f313b4f54aa4427ac6f771ffd41df6e.tgz  gcr.io/something/nextjs-on-cloudrun (+1 more)  SUCCESS

real    2m14.298s
user    0m3.543s
sys     0m0.145s
```

## Deploy


```bash
$ gcloud run deploy nextjs-on-cloudrun \
  --image gcr.io/something/nextjs-on-cloudrun \
  --project something \
  --platform managed \
  --region asia-northeast1 \
  --memory 128Mi \
  --cpu 1 \
  --port 3000 \
  --allow-unauthenticated

Service [nextjs-on-cloudrun] revision [nextjs-on-cloudrun-00001-qaf] has been deployed and is serving 100 percent of traffic.
Service URL: https://nextjs-on-cloudrun-something-an.a.run.app

real    0m21.177s
user    0m1.145s
sys     0m0.156s
```

## CleanUp


```bash
$ gcloud run services delete nextjs-on-cloudrun \
  --region asia-northeast1 \
  --platform managed
```

Webプロセスを削除

```bash
$ time gcloud run services delete nextjs-on-cloudrun --region asia-northeast1 --platform managed
Service [nextjs-on-cloudrun] will be deleted.

Do you want to continue (Y/n)?  y

Deleting [nextjs-on-cloudrun]...done.
Deleted service [nextjs-on-cloudrun].

real    0m13.430s
user    0m0.820s
sys     0m0.100s
```

そのあとにリモートのDockerイメージを削除

```bash
$ time gcloud container images delete gcr.io/something/nextjs-on-cloudrun --force-delete-tags
WARNING: Implicit ":latest" tag specified: gcr.io/something/nextjs-on-cloudrun
WARNING: Successfully resolved tag to sha256, but it is recommended to use sha256 directly.
Digests:
- gcr.io/something/nextjs-on-cloudrun@sha256:022b60e06967699fe0b2d3a8d098b533020de3f423ad6e969923a2fefea59732
  Associated tags:
 - latest
Tags:
- gcr.io/something/nextjs-on-cloudrun:latest
This operation will delete the tags and images identified by the digests above.

Do you want to continue (Y/n)?  y

Deleted [gcr.io/something/nextjs-on-cloudrun:latest].
Deleted [gcr.io/something/nextjs-on-cloudrun@sha256:022b60e06967699fe0b2d3a8d098b533020de3f423ad6e969923a2fefea59732].

real    0m10.261s
user    0m0.824s
sys     0m0.065s
```