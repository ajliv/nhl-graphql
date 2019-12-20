import { Team } from '../Team';
import { mockTeam, mockNHL } from '../../datasources/__tests__/fixtures';

const nhl = mockNHL();

const mockContext = {
    now: new Date(1569902400000), // 2019-10-01T00:00:00.000Z,
    dataSources: {
        nhl,
    },
};

it('should fetch a roster', async () => {
    const { roster } = Team as any;
    const mockRoster = mockTeam.roster.roster;

    const resp = await roster(mockTeam, {}, mockContext);

    expect(nhl.getPerson).toHaveBeenCalledTimes(mockRoster.length);

    for (const { person } of mockRoster) {
        expect(nhl.getPerson).toHaveBeenCalledWith(person.id);
    }

    expect(resp).toMatchSnapshot();
});
