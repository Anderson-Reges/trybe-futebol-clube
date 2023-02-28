import { Request, Response } from 'express';
import { IUsersService } from '../interfaces/user.interface';

export default class UsersController {
  private _service: IUsersService;

  constructor(service: IUsersService) {
    this._service = service;
  }

  Login = (req: Request, res: Response) => {
    const { email, password } = req.body;
  };
}
