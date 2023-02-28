import { ModelStatic } from 'sequelize';
import { ITeam, ITeamsServices } from '../interfaces/team.interface';
import Team from '../database/models/team.model';

export default class TeamService implements ITeamsServices {
  protected model: ModelStatic<Team> = Team;

  async findAll(): Promise<ITeam[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
