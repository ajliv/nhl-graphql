import { RESTDataSource } from 'apollo-datasource-rest';

export default class NHL extends RESTDataSource {
    baseURL = 'https://statsapi.web.nhl.com/api/v1';

    async getConference(id: number) {
        if (!id) {
            return;
        }
        try {
            const resp = await this.get<{ conferences?: any[] }>(
                `/conferences/${id}`
            );
            return resp.conferences ? resp.conferences[0] : undefined;
        } catch (error) {
            return;
        }
    }

    async getConferences() {
        try {
            const resp = await this.get<{ conferences?: any[] }>(
                '/conferences'
            );
            return resp.conferences ?? [];
        } catch (error) {
            return [];
        }
    }

    async getDivision(id: number) {
        if (!id) {
            return;
        }
        try {
            const resp = await this.get<{ divisions?: any[] }>(
                `/divisions/${id}`
            );
            return resp.divisions ? resp.divisions[0] : undefined;
        } catch (error) {
            return;
        }
    }

    async getDivisions() {
        try {
            const resp = await this.get<{ divisions?: any[] }>('/divisions');
            return resp.divisions ?? [];
        } catch (error) {
            return [];
        }
    }

    async getPerson(id: number) {
        if (!id) {
            return;
        }
        try {
            const resp = await this.get<{ people?: any[] }>(`/people/${id}`);
            return resp.people ? resp.people[0] : undefined;
        } catch (error) {
            return;
        }
    }

    async getStandings({ type, date }: { type?: string; date?: string }) {
        try {
            const url = type ? `/standings/${type}` : '/standings';
            const params = new URLSearchParams();

            if (date) {
                params.set('date', date);
            }

            const resp = await this.get<{ records?: any[] }>(url, params);

            return resp.records ?? [];
        } catch (error) {
            return;
        }
    }

    async getTeam(id: number) {
        if (!id) {
            return;
        }
        try {
            const resp = await this.get<{ teams?: any[] }>(`/teams/${id}`, {
                expand: 'team.roster',
            });
            return resp.teams ? resp.teams[0] : undefined;
        } catch (error) {
            return;
        }
    }
}
