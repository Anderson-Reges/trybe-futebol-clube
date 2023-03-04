# TFC (Trybe Futebol Clube)

# 👨‍💻 O que foi desenvolvido
Este projeto trata-se de um site informativo sobre partidas e classificações de futebol! ⚽. nesse projeto o front-end ja veio pronto, e o que foi desenvolvido nele foi a criação da API que alimentarar o front.

## Técnologias usadas

Back-end:
> Desenvolvido usando: NodeJS, ExpressJS, Sequelize, TypeScript, MYSQL, POO


## Instalando Dependências

> Backend & Frontend
  - dentro da raiz principal do `app` execute:
```bash
  npm run install:apps
``` 
  - em seguida suba o o `docker-compose` para o funcionamento do `app`.
```bash
  npm run compose:up
```
  - e para descer o `docker-compose` use: 
```bash
  npm run compose:down
```
<hr>

⚠️ Atenção ⚠️ : para executar essa parte, o arquivo `.env` com as variaveis de ambiente da config e do server deve existir, caso contrario retornara um erro.
  - as variaveis de ambiente são:
    ```.env
     JWT_SECRET=
     APP_PORT=
     DB_USER=
     DB_PASS=
     DB_HOST=
     DB_PORT=
    ```

<hr>

## Executando aplicação

> Para rodar o back-end:
 - **Atenção ⚠️: antes rode o comando `npm run prestart` para buildar e popular o banco de dados.**
  ```
    cd app/backend && npm start
  ```
> Para rodar o front-end:

  ```
    cd app/frontend && npm start
  ```

## Executando Testes

> Para rodar os testes padrões
  ```
    cd app/backend && npm test
  ```
> Para rodar testes de `coverage`
```
   cd app/backend && npm run test:coverage
```
