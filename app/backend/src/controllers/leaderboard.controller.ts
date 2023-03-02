import { Response, Request } from 'express';
import { ILeaderboardResult } from '../interfaces/leaderboard.interface';
import { IMatch } from '../interfaces/match.interface';
import { ITeam } from '../interfaces/team.interface';
import TeamService from '../services/TeamsService';
import MatchService from '../services/MatchesService';

const teamService = new TeamService();
const matchService = new MatchService();

class Leaderboard {
  public static totalPointAndVictories = (id: number, matchesVictories: IMatch[]) => {
    let totalPoints = 0;
    let totalVictories = 0;
    matchesVictories.forEach((match) => {
      if (match.teamVictoryId === id) {
        totalPoints += 3;
        totalVictories += 1;
      }
    });

    return {
      totalPoints,
      totalVictories,
    };
  };

  public static totalGames = (id: number, matchesVictories: IMatch[]): number => {
    let totalGames = 0;
    matchesVictories.forEach((match) => {
      if (match.homeTeamId === id || match.awayTeamId === id) {
        totalGames += 1;
      }
    });

    return totalGames;
  };

  public static totalDraws = (id: number, matchesVictories: IMatch[]): number => {
    let totalDraws = 0;
    matchesVictories.forEach((match) => {
      if ((match.homeTeamId === id || match.awayTeamId === id)
        && match.teamVictoryId === 0) {
        totalDraws += 1;
      }
    });

    return totalDraws;
  };

  public static totalLosses = (id: number, matchesVictories: IMatch[]): number => {
    let totalLosses = 0;
    matchesVictories.forEach(({ homeTeamId, awayTeamId, teamVictoryId }) => {
      if ((homeTeamId === id || awayTeamId === id)
      && (teamVictoryId === awayTeamId || teamVictoryId === homeTeamId)) {
        totalLosses += 1;
      }
    });

    return totalLosses;
  };

  public static goalsFavor = (id: number, matchesVictories: IMatch[]): number => {
    let goalsFavor = 0;
    matchesVictories.forEach(({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamId === id) {
        goalsFavor += homeTeamGoals;
      }
      if (awayTeamId === id) {
        goalsFavor += awayTeamGoals;
      }
    });

    return goalsFavor;
  };

  public static goalsOwn(id: number, matches: IMatch[]): number {
    let goalsOwn = 0;
    matches.forEach(({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }) => {
      if (homeTeamId === id) {
        goalsOwn += awayTeamGoals;
      }
      if (awayTeamId === id) {
        goalsOwn += homeTeamGoals;
      }
    });
    return goalsOwn;
  }

  public static constructResult = (points: ILeaderboardResult) => ({
    name: points.teamName,
    totalPoints: points.p.totalPoints + points.e,
    totalGames: points.j,
    totalVictories: points.p.totalVictories,
    totalDraws: points.e,
    totalLosses: points.d,
    goalsFavor: points.gp,
    goalsOwn: points.gc,
  });

  public static leaderboardPoint = (teams: ITeam[], matchVictories: IMatch[]) => {
    const leaderboard = teams.map(({ id, teamName }) => {
      const p = this.totalPointAndVictories(id, matchVictories);
      const j = this.totalGames(id, matchVictories);
      const e = this.totalDraws(id, matchVictories);
      const d = this.totalLosses(id, matchVictories);
      const gp = this.goalsFavor(id, matchVictories);
      const gc = this.goalsOwn(id, matchVictories);
      return this.constructResult({ teamName, p, j, e, d, gp, gc });
    });
    return leaderboard;
  };

  leaderboardHome = async (_req: Request, res: Response) => {
    const allTeams = await teamService.findAll();
    const allMatchers = await matchService.findMatchesInProgress(false);
    const matchesVictories = allMatchers.map((match) => {
      if (match.homeTeamGoals > match.awayTeamGoals) {
        return { ...match, teamVictoryId: match.homeTeamId };
      }
      if (match.awayTeamGoals > match.homeTeamGoals) {
        return { ...match, teamVictoryId: match.awayTeamId };
      }
      return { ...match, teamVictoryId: 0 };
    });

    const resultPoint = Leaderboard.leaderboardPoint(allTeams, matchesVictories);
    return res.status(200).json(resultPoint);
  };
}

export default Leaderboard;
