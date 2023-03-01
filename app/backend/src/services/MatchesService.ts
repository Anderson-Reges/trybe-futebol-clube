import { ModelStatic } from 'sequelize';
import Team from '../database/models/team.model';
import Match from '../database/models/match.model';
import { IMatch, IMatchService } from '../interfaces/match.interface';

export default class MatchService implements IMatchService {
  protected _model: ModelStatic<Match> = Match;

  async findAll(): Promise<IMatch[]> {
    const matches = await this._model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }
}
