import { GraphQLFieldResolver } from 'graphql';
import moment from 'moment';

import { Context } from '..';

export const Player: Record<
    string,
    GraphQLFieldResolver<Record<string, any>, Context>
> = {
    __resolveReference({ id }, ctx) {
        const { dataSources } = ctx as Context;
        return dataSources.nhl.getPerson(id);
    },

    age({ birthDate }, _, { now }) {
        if (birthDate) {
            return moment(now).diff(
                moment.utc(birthDate, 'YYYY-MM-DD'),
                'years'
            );
        }
    },

    birthDate({ birthDate }) {
        if (birthDate) {
            return moment.utc(birthDate, 'YYYY-MM-DD').toDate();
        }
    },

    currentTeam({ currentTeam }, _, { dataSources }) {
        return dataSources.nhl.getTeam(currentTeam?.id);
    },

    position({ primaryPosition }) {
        return primaryPosition?.abbreviation;
    },

    positionType({ primaryPosition }) {
        return primaryPosition?.type;
    },
};
