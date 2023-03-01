export interface IMatch {
  id?: number,
  homeTeamId: number,
  homeTeamGoals: number
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export interface IMatchService {
  findAll(): Promise<IMatch[]>
}
