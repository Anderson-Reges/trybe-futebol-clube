import {
  ILeaderboardService,
  ILeaderboardObjectFunc,
  ILeaderboard,
} from '../interfaces/leaderboard.interface';
import { IMatch } from '../interfaces/match.interface';
import Match from '../database/models/match.model';
import Team from '../database/models/team.model';

export default class LeaderboardService implements ILeaderboardService {
  constructor(
    private teamModel: typeof Team,
    private matcheModel: typeof Match,
  ) {}

  public totalVictories = (matches: IMatch[], teamId: number): number => {
    const victories = matches.reduce((acc, match) => {
      if (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals) {
        return acc + 1;
      }
      if (match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return victories;
  };

  public totalDraws = (matches: IMatch[], teamId: number): number => {
    const draws = matches.reduce((acc, match) => {
      if (match.homeTeamId === teamId && match.homeTeamGoals === match.awayTeamGoals) {
        return acc + 1;
      }
      if (match.awayTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return draws;
  };

  public totalPoints = (matches: IMatch[], teamId: number): number => {
    const victories = this.totalVictories(matches, teamId);
    const draws = this.totalDraws(matches, teamId);

    const totalPoints = victories * 3 + draws;

    return totalPoints;
  };

  public totalGames = (matches: IMatch[], teamId: number): number => {
    const games = matches.reduce((acc, match) => {
      if (match.homeTeamId === teamId || match.awayTeamId === teamId) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return games;
  };

  public totalLosses = (matches: IMatch[], teamId: number): number => {
    const losses = matches.reduce((acc, match) => {
      if (match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals) {
        return acc + 1;
      }
      if (match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return losses;
  };

  public goalsFavor = (matches: IMatch[], teamId: number): number => {
    const goalsFavor = matches.reduce((acc, match) => {
      if (match.homeTeamId === teamId) return acc + match.homeTeamGoals;
      if (match.awayTeamId === teamId) return acc + match.awayTeamGoals;
      return acc;
    }, 0);
    return goalsFavor;
  };

  public goalsOwn = (matches: IMatch[], teamId: number): number => {
    const goalsOwn = matches.reduce((acc, match) => {
      if (match.homeTeamId === teamId) return acc + match.awayTeamGoals;
      if (match.awayTeamId === teamId) return acc + match.homeTeamGoals;
      return acc;
    }, 0);
    return goalsOwn;
  };

  public goalsBalance = (matches: IMatch[], teamId: number): number => {
    const GP = this.goalsFavor(matches, teamId);
    const GC = this.goalsOwn(matches, teamId);

    const goalsBalance = GP - GC;
    return goalsBalance;
  };

  public efficiency = (matches: IMatch[], teamId: number): string => {
    const P = this.totalPoints(matches, teamId);
    const J = this.totalGames(matches, teamId);

    const efficiency = ((P / (J * 3)) * 100).toFixed(2);
    return efficiency;
  };

  public genLeaderboard = (matches: IMatch[], teamId: number) => ({
    totalPoints: this.totalPoints(matches, teamId),
    totalGames: this.totalGames(matches, teamId),
    totalVictories: this.totalVictories(matches, teamId),
    totalDraws: this.totalDraws(matches, teamId),
    totalLosses: this.totalLosses(matches, teamId),
    goalsFavor: this.goalsFavor(matches, teamId),
    goalsOwn: this.goalsOwn(matches, teamId),
    goalsBalance: this.goalsBalance(matches, teamId),
    efficiency: this.efficiency(matches, teamId),
  });

  public sortResults = (leaderboard: ILeaderboard[]): ILeaderboard[] => {
    const sortResult = leaderboard.sort((a, b) => {
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;
      return 0;
    });
    return sortResult;
  };

  public findAllTeamsAndFinishedMatches = async (): Promise<ILeaderboardObjectFunc> => {
    const teams = await this.teamModel.findAll();
    const matches = await this.matcheModel.findAll({
      where: { inProgress: false },
      raw: true,
    });

    return { teams, matches };
  };

  public leaderboardHome = async (): Promise<ILeaderboard[]> => {
    const { teams, matches } = await this.findAllTeamsAndFinishedMatches();

    const leaderboardHome = teams.map((team) => {
      const homeMatches = matches.filter((match) => match.homeTeamId === team.id);
      return {
        name: team.teamName,
        ...this.genLeaderboard(homeMatches, team.id),
      };
    });

    return this.sortResults(leaderboardHome);
  };

  public leaderboardAway = async (): Promise<ILeaderboard[]> => {
    const { teams, matches } = await this.findAllTeamsAndFinishedMatches();

    const leaderboardAway = teams.map((team) => {
      const awayMatches = matches.filter((match) => match.awayTeamId === team.id);
      return {
        name: team.teamName,
        ...this.genLeaderboard(awayMatches, team.id),
      };
    });

    return this.sortResults(leaderboardAway);
  };

  public leaderboard = async (): Promise<ILeaderboard[]> => {
    const { teams, matches } = await this.findAllTeamsAndFinishedMatches();

    const leaderboard = teams.map((team) => ({
      name: team.teamName,
      ...this.genLeaderboard(matches, team.id),
    }));

    return this.sortResults(leaderboard);
  };
}
