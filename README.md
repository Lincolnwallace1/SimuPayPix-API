<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

### Configuração do Ambiente Local

Para configurar o ambiente corretamente, siga os passos abaixo:

1. Certifique-se de ter uma imagem Docker do PostgreSQL configurada.
2. O banco de dados deve ser criado com o nome **simupaypix**.
3. Crie um arquivo `.env` na raiz do seu projeto com as seguintes variáveis de ambiente:

```shell
###################
# General config
# V.01
###################

API_PORT=8080
API_HOST=http://localhost:8080

###################
# Database config
# V.01
###################

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=simupaypix

###################
# Auth config
# V.01
###################

AUTH_ACCESS_TOKEN_SECRET=mdasdaasmasp
AUTH_ACCESS_TOKEN_EXP=1200
```

Em seguida rodar o comando `yarn start` em caso do uso de yarn ou `npm run` em caso de uso de npm.

## Configuração do Projeto em um Container Docker

Para rodar o projeto em um container Docker, siga os passos abaixo:

1. Certifique-se de ter uma imagem Docker do PostgreSQL configurada com o banco de dados **simupaypix**.
2. Crie um arquivo `.env` na raiz do seu projeto com as seguintes variáveis de ambiente (igual ao ambiente local):

```shell
###################
# General config
# V.01
###################

API_PORT=8080
API_HOST=http://localhost:8080

###################
# Database config
# V.01
###################

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=simupaypix

###################
# Auth config
# V.01
###################

AUTH_ACCESS_TOKEN_SECRET=mdasdaasmasp
AUTH_ACCESS_TOKEN_EXP=1200
```
 
3. Se o seu contêiner PostgreSQL estiver em uma rede Docker diferente, ajuste a variável `DB_HOST` para corresponder ao nome da rede onde o contêiner PostgreSQL está rodando.
4. Certifique-se de ter o Docker e o Docker Compose instalados.
5. Para criar a imagem e subir os containers, utilize os seguintes comandos:

``shell
docker-compose build
docker-compose up -d
```

Depois acessar a "localhost:8080/docs" e terá a API rodando.

Abaixo está o modelo do banco de dados:

![Modelo de banco de dados](assets/Diagrama%20do%20banco%20de%20dados.png)