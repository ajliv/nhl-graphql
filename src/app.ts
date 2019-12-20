import express from 'express';
import morgan from 'morgan';
import { RedisCache } from 'apollo-server-cache-redis';

import { name, version } from '../package.json';

import { GRAPHQL_PATH, LOG_FORMAT, REDIS_HOST, REDIS_PORT } from './config';
import { createGraphQLServer, HEALTHCHECK } from './graphql';

//
// ─── REQUEST HANDLERS ───────────────────────────────────────────────────────────
//

function errorHandler(): express.ErrorRequestHandler {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (err, req, res, next) => {
        const statusCode = res.statusCode >= 400 ? res.statusCode : 500;
        res.sendStatus(statusCode);
    };
}

function infoHandler(): express.RequestHandler {
    return (req, res) =>
        res.json({
            timestamp: new Date().toISOString(),
            name,
            version,
        });
}

function notFoundHandler(): express.RequestHandler {
    return (req, res, next) => {
        res.status(404);
        next(new Error('Not found'));
    };
}

//
// ─── APPLICATION FACTORY ────────────────────────────────────────────────────────
//

export function createApp(): express.Application {
    const app = express();
    const cache = new RedisCache({ host: REDIS_HOST, port: REDIS_PORT });
    const server = createGraphQLServer({ cache });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async function healthCheck(req: express.Request) {
        // add health check logic inside
    }

    app.set('trust proxy', true);
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan(LOG_FORMAT, { skip: req => req.path === HEALTHCHECK }));

    // application index
    app.get('/', infoHandler());

    // handle graphql requests
    app.use(server.getMiddleware({ path: GRAPHQL_PATH, onHealthCheck: healthCheck }));

    // handle 404's
    app.use(notFoundHandler());

    // handle error responses
    app.use(errorHandler());

    return app;
}
