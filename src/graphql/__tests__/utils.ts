import express from 'express';
import fetch from 'node-fetch';
import moment from 'moment';
import { HttpLink } from 'apollo-link-http';
import { execute, toPromise } from 'apollo-link';

import { mockNHL } from '../datasources/__tests__/fixtures';

import { createGraphQLServer } from '..';

export async function startTestServer() {
    const server = createGraphQLServer({
        context: () => ({
            now: moment.utc('2019-10-01', 'YYYY-MM-DD').toDate(),
        }),
        dataSources: () => ({ nhl: mockNHL() }),
    });

    const app = express();
    server.applyMiddleware({ app });
    const httpServer = app.listen(8080);

    const link = new HttpLink({
        uri: `http://localhost:8080/graphql`,
        fetch: fetch as any,
    });

    return {
        stop: () => new Promise<any>(resolve => httpServer.close(resolve)),
        graphql: (operation: any) => toPromise(execute(link, operation)),
    };
}
