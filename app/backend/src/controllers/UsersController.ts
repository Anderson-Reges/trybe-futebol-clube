import jwt = require('jsonwebtoken');
import bcrypt = require('bcryptjs');
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import { IUsersService } from '../interfaces/user.interface';

dotenv.config();
const secret = process.env.JWT_SECRET as string;

export default class UsersController {
  private _service: IUsersService;

  constructor(service: IUsersService) {
    this._service = service;
  }

  Login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await this._service.findUser(email, password);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    const result = bcrypt.compareSync(password, user.password);
    if (!result) return res.status(401).json({ message: 'Invalid email or password' });

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

  LoginRole = async (req: Request, res: Response) => {
    const { role: { role } } = req.body;
    return !role
      ? res.status(500).json({ message: 'internal error' })
      : res.status(200).json({ role });
  };
}
