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

  finisInProgressMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this._service.finisInProgressMatch(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };

  updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this._service.updateMatch(Number(id), req.body);
    return res.status(200).json({ message: 'Match updated with success' });
  };

  createMatch = async (req: Request, res: Response) => {
    const createdMatch = await this._service.createMatch(req.body);
    return res.status(201).json(createdMatch);
  };
}

export default MatchController;
