cp config.prod.json config.json
docker build -t gcr.io/seismic-trail-221522/tracking_test/api:prod .
docker push gcr.io/seismic-trail-221522/tracking_test/api:prod
