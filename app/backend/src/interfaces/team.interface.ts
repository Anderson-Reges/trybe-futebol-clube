import Team from '../database/models/team.model';

export type ITeam = {
  id: number,
  teamName: string,
};

export interface ITeamsServices {
  findAll(): Promise<Team[]>
  findById(id: number): Promise<Team | null>
}
