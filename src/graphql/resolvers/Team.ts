import { GraphQLFieldResolver } from 'graphql';
import { sortBy } from 'lodash';

import { Context } from '..';

export const Team: Record<
    string,
    GraphQLFieldResolver<Record<string, any>, Context>
> = {
    conference({ conference }, _, { dataSources }) {
        return dataSources.nhl.getConference(conference?.id);
    },

    division({ division }, _, { dataSources }) {
        return dataSources.nhl.getDivision(division?.id);
    },

    roster({ roster }, _, { dataSources }) {
        const items = sortBy(roster?.roster ?? [], r =>
            parseInt(r.jerseyNumber, 10)
        );
        return Promise.all(
            items.map(r => dataSources.nhl.getPerson(r.person.id))
        );
    },
};
