import { GraphQLFieldResolver } from 'graphql';

import { Context } from '..';

export const Division: Record<
    string,
    GraphQLFieldResolver<Record<string, any>, Context>
> = {
    conference({ conference }, _, { dataSources }) {
        return dataSources.nhl.getConference(conference?.id);
    },

    shortName({ nameShort }) {
        return nameShort;
    },
};
