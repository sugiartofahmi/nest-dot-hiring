## Description

This application was created for one of the backend test requirements at [DOT Indonesia](https://www.dot.co.id/)

## Tech Stack

- ### NodeJS LTS v20
- ### Yarn v1.22
- ### NestJS v10
- ### PostgreSQL v14.11
- ### Drizzle
- ### Zod

## Project Setup

- Use NodeJS LTS v20
- Copy file .env.example, rename to .env and adjust the configuration
- Run `yarn install`
- Run `yarn db:push`

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Endpoints

| Method   | URL             | Description               |
| -------- | --------------- | ------------------------- |
| `GET`    | `/api/todos`    | Retrieve all todos.       |
| `POST`   | `/api/todos`    | Create a new todos.       |
| `GET`    | `/api/todos/28` | Retrieve todos #28.       |
| `PATCH`  | `/api/todos/28` | Update data in todos #28. |
| `PUT`    | `/api/todos/28` | Update data in todos #28. |
| `DELETE` | `/api/todos/28` | Delete data #28           |

## Request Body

```bash
{
    "title":"Adjust response",
    "completed": false
}
```

## API Documentation

1. [Online](https://iw3mrj573i.apidog.io/endpoint-8599914)
2. Local, check on directory ./api-doc
