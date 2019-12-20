import { GraphQLFieldResolver } from 'graphql';

import { Context } from '..';

export const Conference: Record<
    string,
    GraphQLFieldResolver<Record<string, any>, Context>
> = {
    async divisions({ id }, _, { dataSources }) {
        const divisions = await dataSources.nhl.getDivisions();
        return divisions.filter(d => d.conference?.id === id);
    },
};
