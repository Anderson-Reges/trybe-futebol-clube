import { Request, Response, NextFunction } from 'express';
import loginSchema from './schemas/loginSchema';

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const data = loginSchema.safeParse(req.body);

  if (!data.success) {
    const { message } = data.error.issues[0];
    if (message === 'Required') {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
};

export default validateLogin;
