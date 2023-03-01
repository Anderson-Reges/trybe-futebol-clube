import { Response, Request } from 'express';
import { IMatchService } from '../interfaces/match.interface';

class MatchController {
  private _service: IMatchService;

  constructor(service: IMatchService) {
    this._service = service;
  }

  findAll = async (_req: Request, res: Response) => {
    const matches = await this._service.findAll();

    return res.status(200).json(matches);
  };
}

export default MatchController;
