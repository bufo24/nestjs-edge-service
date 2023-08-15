# NestJS Edge Service

## Description

A service which can create, get and update edges using GraphQL.

## Installation of node modules

```bash
$ yarn
```

## Configuration
Copy `.env.example` to `.env` and fill in the needed variables.
```bash
cp .env.example .env
```

For docker: also make sure to create a `docker.env`. The hosts of Postgres en RabbitMQ should be `postgres` and `rabbitmq` instead of localhost. This is because docker compose handles comminucation between docker containers using the docker compose service name instead of localhost.

Example:
```properties
POSTGRES_HOST=postgres
RABBITMQ_HOST=rabbitmq:5672
```

## Running the app

```bash
# watch mode
$ yarn start:dev
```

There are 2 docker scripts for running the app, `docker:run:no-app` can be used to just run the backend services (Postgres & RabbitMQ), where you can run the app using `start:dev` to keep the hot reload during development. Whenever you don't need the hot reloads, simply run `docker:run`, which builds the app using docker.
```bash
# run postgres and rabbitmq
yarn docker:run:no-app

# run postgres and rabbitmq together with the app
yarn docker:run

# stop docker containers
yarn docker:down
```
