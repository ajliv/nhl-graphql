import { Player } from '../Player';
import { mockPerson, mockNHL } from '../../datasources/__tests__/fixtures';

const now = new Date(1569902400000); // 2019-10-01T00:00:00.000Z
const nhl = mockNHL();

const mockContext = {
    now,
    dataSources: {
        nhl,
    },
};

it('should return an age based on context `now`', async () => {
    const { age } = Player as any;
    const result = await age(mockPerson, {}, mockContext);
    expect(result).toMatchSnapshot();
});

it('should return a birthDate', async () => {
    const { birthDate } = Player as any;
    const result = await birthDate(mockPerson, {}, mockContext);
    expect(result).toMatchSnapshot();
});

it('should fetch a currentTeam', async () => {
    const { currentTeam } = Player as any;
    await currentTeam(mockPerson, {}, mockContext);
    expect(nhl.getTeam).toHaveBeenLastCalledWith(mockPerson.currentTeam.id);
});

it('should return a position', async () => {
    const { position } = Player as any;
    const result = await position(mockPerson, {}, mockContext);
    expect(result).toBe('LW');
});

it('should return a positionType', async () => {
    const { positionType } = Player as any;
    const result = await positionType(mockPerson, {}, mockContext);
    expect(result).toBe('Forward');
});
