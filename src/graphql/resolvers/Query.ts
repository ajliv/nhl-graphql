import { GraphQLFieldResolver } from 'graphql';

import { Context } from '..';

export const Query: Record<string, GraphQLFieldResolver<void, Context>> = {
    conference(_, { id }, { dataSources }) {
        return dataSources.nhl.getConference(id);
    },

    async conferences(_, __, { dataSources }) {
        try {
            const resp = await dataSources.nhl.getConferences();
            return resp ?? [];
        } catch (error) {
            return [];
        }
    },

    division(_, { id }, { dataSources }) {
        return dataSources.nhl.getDivision(id);
    },

    async divisions(_, __, { dataSources }) {
        try {
            const resp = await dataSources.nhl.getDivisions();
            return resp ?? [];
        } catch (error) {
            return [];
        }
    },

    player(_, { id }, { dataSources }) {
        return dataSources.nhl.getPerson(id);
    },

    team(_, { id }, { dataSources }) {
        return dataSources.nhl.getTeam(id);
    },
};
