import { GraphQLFieldResolver } from 'graphql';

import { Context } from '..';

export const StandingsTeam: Record<
    string,
    GraphQLFieldResolver<Record<string, any>, Context>
> = {
    team({ team }, _, { dataSources }) {
        return dataSources.nhl.getTeam(team?.id);
    },
};
