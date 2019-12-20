import NHL from '../NHL';

import mockPersonResponse from './get-person.json';
import mockTeamResponse from './get-team.json';

export { mockPersonResponse, mockTeamResponse };
export const mockPerson = mockPersonResponse.people[0];
export const mockTeam = mockTeamResponse.teams[0];

export function mockNHL() {
    const nhl = new NHL();
    jest.spyOn(nhl, 'getPerson').mockImplementation(async () => mockPerson);
    jest.spyOn(nhl, 'getTeam').mockImplementation(async () => mockTeam);
    return nhl;
}
