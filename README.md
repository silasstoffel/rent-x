# Rent-x

[![Package][Express-image]][Express-url]
[![Technology][node-image]][node-url]
[![Technology][typescript-image]][typescript-url]
[![Package][Swagger-image]][Swagger-url]
[![Technology][Docker-image]][Docker-url]


[Express-url]: https://www.npmjs.com/package/Express
[Express-image]: https://img.shields.io/badge/Express-green?style=for-the-badge&logo=Express&logoColor=black

[node-url]: https://nodejs.org/
[node-image]: https://img.shields.io/badge/NodeJS-green?style=for-the-badge&logo=Node.js&logoColor=black

[typescript-url]: https://www.typescriptlang.org
[typescript-image]: https://img.shields.io/badge/Typescript-blue?style=for-the-badge&logo=TypeScript&logoColor=white

[Swagger-url]: https://swagger.io/
[Swagger-image]: https://img.shields.io/badge/Swagger-orange?style=for-the-badge&logo=Swagger&logoColor=white

[Docker-url]: https://www.docker.com//
[Docker-image]: https://img.shields.io/badge/Docker-blue?style=for-the-badge&logo=Docker&logoColor=white

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
