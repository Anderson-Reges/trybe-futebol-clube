import { Response, Request } from 'express';
import { IMatchService } from '../interfaces/match.interface';

class MatchController {
  private _service: IMatchService;

  constructor(service: IMatchService) {
    this._service = service;
  }

  findAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const matches = await this._service.findAll();

    if (inProgress) {
      const boolean: boolean = JSON.parse(inProgress as string);
      const filtredMatches = await this._service.findMatchesInProgress(boolean);
      return res.status(200).json(filtredMatches);
    }

    return res.status(200).json(matches);
  };
}

export default MatchController;
