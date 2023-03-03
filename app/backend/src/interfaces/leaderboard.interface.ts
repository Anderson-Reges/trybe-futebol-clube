import { ITeam } from './team.interface';
import { IMatch } from './match.interface';

export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: string | number,
}

export interface ILeaderboardObjectFunc {
  teams: ITeam[],
  matches: IMatch[],
}

export interface ILeaderboardService {
  totalPoints(matches: IMatch[], teamId: number): number,
  totalGames(matches: IMatch[], teamId: number): number,
  totalVictories(matches: IMatch[], teamId: number): number,
  totalDraws(matches: IMatch[], teamId: number): number,
  totalLosses(matches: IMatch[], teamId: number): number,
  goalsFavor(matches: IMatch[], teamId: number): number,
  goalsOwn(matches: IMatch[], teamId: number): number,
  goalsBalance(matches: IMatch[], teamId: number): number,
  efficiency(matches: IMatch[], teamId: number): string,
  sortResults(leaderboard: ILeaderboard[]): ILeaderboard[],
  findAllTeamsAndFinishedMatches(): Promise<ILeaderboardObjectFunc>
  leaderboardHome(): Promise<ILeaderboard[]>
  leaderboardAway(): Promise<ILeaderboard[]>
  leaderboard(): Promise<ILeaderboard[]>
}
