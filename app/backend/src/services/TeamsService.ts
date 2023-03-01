import { ModelStatic } from 'sequelize';
import { ITeam, ITeamsServices } from '../interfaces/team.interface';
import Team from '../database/models/team.model';

export default class TeamService implements ITeamsServices {
  protected _model: ModelStatic<Team> = Team;

  async findAll(): Promise<ITeam[]> {
    const teams = await this._model.findAll();
    return teams;
  }

  async findById(id: number): Promise<ITeam | null> {
    const team = await this._model.findByPk(id);
    return team;
  }
}
