import { ModelStatic } from 'sequelize';
import Team from '../database/models/team.model';
import Match from '../database/models/match.model';
import { IGoals, IMatch, IMatchService } from '../interfaces/match.interface';

export default class MatchService implements IMatchService {
  protected _model: ModelStatic<Match> = Match;

  async findAll(): Promise<IMatch[]> {
    const matches = await this._model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      raw: true,
      nest: true,
    });

    return matches;
  }

  async findMatchesInProgress(boolean: boolean): Promise<IMatch[]> {
    const matches = await this._model.findAll({
      where: { inProgress: boolean },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  async finisInProgressMatch(id: number): Promise<number> {
    const [affectedRows] = await this._model.update({
      inProgress: false,
    }, {
      where: { id },
    });

    return affectedRows;
  }

  async updateMatch(id: number, teamsGoals: IGoals): Promise<number> {
    const [affectedRows] = await this._model.update({
      homeTeamGoals: teamsGoals.homeTeamGoals,
      awayTeamGoals: teamsGoals.awayTeamGoals,
    }, {
      where: { id },
    });

    return affectedRows;
  }

  async createMatch(match: IMatch): Promise<IMatch> {
    const createdMatch = await this._model.create({ ...match, inProgress: true });

    return {
      id: createdMatch.id,
      homeTeamId: match.homeTeamId,
      awayTeamId: match.awayTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: true,
    };
  }
}
