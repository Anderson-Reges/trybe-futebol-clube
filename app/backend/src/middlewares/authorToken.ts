import jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';

const secret = process.env.JWT_SECRET as string;

const authorizationToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
    req.body.role = decoded;
    next();
  } catch (err) {
    if (err) return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default authorizationToken;
