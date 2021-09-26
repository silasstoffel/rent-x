# Rent-x

## Setup with dev mode

1 - Create containers

```shell
docker compose up
```

2 - Run Migrations

```shell
docker exec -it rentx-api bash

cd /usr/app

yarn typeorm migration:run

```

3 - API Docs

[http://localhost:3333/api-docs](http://localhost:3333/api-docs) - Development


## Tests

```shell
docker exec -it rentx-api bash

cd /usr/app

yarn test

```
