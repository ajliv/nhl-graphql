import { gql } from 'apollo-server-express';

import { startTestServer } from './utils';

const FETCH_TEAM = gql`
    query TeamQuery($team: Int) {
        team(id: $team) {
            name
            abbreviation
            roster {
                primaryNumber
            }
        }
    }
`;

const FETCH_PLAYER = gql`
    query PlayerQuery($player: Int) {
        player(id: $player) {
            fullName
            age
            birthDate
            position
            currentTeam {
                name
            }
        }
    }
`;

describe('E2E Server', () => {
    let graphql: (op: any) => Promise<any>;
    let stop: () => Promise<any>;

    beforeEach(async () => {
        const server = await startTestServer();
        graphql = server.graphql;
        stop = server.stop;
    });

    afterEach(async () => {
        await stop();
    });

    it('fetches a team', async () => {
        const resp = await graphql({
            query: FETCH_TEAM,
            variables: { team: 25 },
        });
        expect(resp).toMatchSnapshot();
    });

    it('fetches a person', async () => {
        const resp = await graphql({
            query: FETCH_PLAYER,
            variables: { person: 8474849 },
        });
        expect(resp).toMatchSnapshot();
    });
});
