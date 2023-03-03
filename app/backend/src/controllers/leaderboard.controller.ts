import { Response, Request } from 'express';
import { ILeaderboardService } from '../interfaces/leaderboard.interface';

class Leaderboard {
  private _service: ILeaderboardService;

  constructor(service: ILeaderboardService) {
    this._service = service;
  }

  public AllHome = async (_req: Request, res: Response) => {
    const leaderboardHome = await this._service.leaderboardHome();
    return res.status(200).json(leaderboardHome);
  };

  public AllAway = async (_req: Request, res: Response) => {
    const leaderboardAway = await this._service.leaderboardAway();
    return res.status(200).json(leaderboardAway);
  };

  public All = async (_req: Request, res: Response) => {
    const leaderboardAway = await this._service.leaderboard();
    return res.status(200).json(leaderboardAway);
  };
}

export default Leaderboard;
