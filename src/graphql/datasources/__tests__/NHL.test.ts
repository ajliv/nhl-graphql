import NHL from '../NHL';

import {
    mockPersonResponse,
    mockPerson,
    mockTeamResponse,
    mockTeam,
} from './fixtures';

describe('getPerson', () => {
    it('should return a person', async () => {
        const nhl = new NHL();

        jest.spyOn(nhl as any, 'get').mockImplementation(
            async () => mockPersonResponse
        );

        const resp = await nhl.getPerson(1);

        expect(resp).toEqual(mockPerson);
    });

    it('should return `undefined` when invalid id is provided', async () => {
        const nhl = new NHL();
        const resp = await (nhl.getPerson as any)();

        expect(resp).toBeUndefined();
    });
});

describe('getTeam', () => {
    it('should return a team', async () => {
        const nhl = new NHL();
        jest.spyOn(nhl as any, 'get').mockImplementation(
            async () => mockTeamResponse
        );

        const resp = await nhl.getTeam(25);

        expect(resp).toEqual(mockTeam);
    });

    it('should return `undefined` when invalid id is provided', async () => {
        const nhl = new NHL();
        const resp = await (nhl.getTeam as any)();

        expect(resp).toBeUndefined();
    });
});
