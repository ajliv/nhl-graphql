import { gql } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';

import { mockPerson, mockNHL } from '../datasources/__tests__/fixtures';

import { createGraphQLServer } from '..';

const GET_ANTOINE = gql`
    query getAntoine($id: Int) {
        player(id: $id) {
            birthDate
            fullName
            position
            primaryNumber
            currentTeam {
                name
                abbreviation
            }
        }
    }
`;

describe('Queries', () => {
    it('fetches antoine', async () => {
        const nhl = mockNHL();
        const server = createGraphQLServer({
            dataSources: () => ({ nhl }),
        });
        const { query } = createTestClient(server);
        const res = await query({
            query: GET_ANTOINE,
            variables: { id: 8474849 },
        });

        expect(res).toMatchSnapshot();
        expect(nhl.getPerson).toHaveBeenCalledWith(8474849);
        expect(nhl.getTeam).toHaveBeenCalledWith(mockPerson.currentTeam.id);
    });
});
