# graphql-template

Template repository for GraphQL services with [Apollo Federation](https://www.apollographql.com/docs/apollo-server/federation/introduction/) support

## Requirements

* [docker](https://docs.docker.com/install/)
* [docker-compose](https://docs.docker.com/compose/install/)
* [nodejs](https://nodejs.org/en/)
* [yarn](https://yarnpkg.com/en/docs/install)

## Getting Started

* Copy the **.env.example** file in the root of the project as **.env** and fill in any necessary [env vars](#environment-variables)
* Run `make` to run local development server
* App will be running at http://localhost:4000/graphql
* Run `make stop` to destroy local environment

### Environment variables

See **src/config.ts** for config validation rules

| Key          | Description                            | Default      | Required |
| ------------ | -------------------------------------- | :----------: | :------: |
| GRAPHQL_PATH | The pathname to serve GraphQL requests | `"/graphql"` |          |
| LOG_FORMAT   | The [morgan] log format                | `"combined"` |          |
| PORT         | The application port                   | `4000`       |          |
| REDIS_HOST   | The Redis cache hostname               |              | ✅       |
| REDIS_PORT   | The Redis cache port                   | `6379`       |          |

### Health checks

Apollo Server provides a [health check](https://www.apollographql.com/docs/apollo-server/monitoring/health-checks/) endpoint at `/.well-known/apollo/server-health`

[morgan]: https://www.npmjs.com/package/morgan#predefined-formats
