import { buildFederatedSchema } from '@apollo/federation';
import { DataSource } from 'apollo-datasource';
import { KeyValueCache } from 'apollo-server-caching';
import { gql, ApolloServer } from 'apollo-server-express';
import { ExpressContext } from 'apollo-server-express/dist/ApolloServer';

import NHL from './datasources/NHL';
import * as resolvers from './resolvers';
import schema from './schema.graphql';

export const HEALTHCHECK = '/.well-known/apollo/server-health';

interface ServerConfig {
    cache?: KeyValueCache<string>;
    context?(ctx: ExpressContext): BaseContext | Promise<BaseContext>;
    dataSources?(): DataSources;
}

export interface Context {
    now: Date;
    dataSources: {
        nhl: NHL;
        [key: string]: DataSource<BaseContext>;
    };
}

type DataSources = Context['dataSources'];
type BaseContext = Omit<Context, 'dataSources'>;

const typeDefs = gql(schema);

//
// ─── FACTORIES ──────────────────────────────────────────────────────────────────
//

export function createContext(): BaseContext {
    return {
        now: new Date(),
    };
}

export function createDataSources(): DataSources {
    return {
        nhl: new NHL(),
    };
}

export function createGraphQLServer({
    cache,
    context = createContext,
    dataSources = createDataSources,
}: ServerConfig = {}) {
    return new ApolloServer({
        cache,
        context,
        dataSources,
        persistedQueries: cache ? { cache } : false,
        schema: buildFederatedSchema([{ resolvers, typeDefs }]),
    });
}
