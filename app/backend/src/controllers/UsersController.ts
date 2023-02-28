import jwt = require('jsonwebtoken');
import { Request, Response } from 'express';
import { IUsersService } from '../interfaces/user.interface';

const secret = process.env.JWT_SECRET as string;

export default class UsersController {
  private _service: IUsersService;

  constructor(service: IUsersService) {
    this._service = service;
  }

  Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await this._service.findUser(email, password);
    if (!user) return res.status(404).json({ message: 'unregistered user' });
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    const token = jwt.sign(payload, secret, {
      expiresIn: '7d',
    });

    return res.status(200).json({ token });
  };
}
