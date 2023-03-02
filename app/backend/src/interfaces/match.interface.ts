export interface IMatch extends IGoals{
  id?: number,
  homeTeamId: number,
  awayTeamId: number,
  inProgress: boolean,
}

export interface IGoals {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchService {
  findAll(): Promise<IMatch[]>,
  findMatchesInProgress(boolean: boolean): Promise<IMatch[]>
  finisInProgressMatch(id: number): Promise<number>
  updateMatch(id: number, teamsGoals: IGoals): Promise<number>
  createMatch(match: IMatch): Promise<IMatch>
}
