export interface ILeaderboardPoints {
  teamName: string,
  p: {
    totalPoints: number,
    totalVictories: number
  },
  j: number,
  e: number,
  d: number,
  gp: number,
  gc: number,
}
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
