import { ModelStatic } from 'sequelize';
import Team from '../database/models/team.model';

export default class TeamService {
  protected model: ModelStatic<Team> = Team;

  async findAll(): Promise<Team[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findById(id: number): Promise<Team | null> {
    const team = await this.model.findByPk(id);
    return team;
  }
}
