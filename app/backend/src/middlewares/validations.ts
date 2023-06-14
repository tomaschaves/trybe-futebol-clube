import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/token';

const loginValidation = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'All fields must be filled',
    });
  }

  const regexEmail = /\S+@\S+\.\S+/;
  const validateEmailRegex = regexEmail.test(email);

  if (password.length < 6 || !validateEmailRegex) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  return next();
};

const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    if (authorization !== undefined) {
      const isValidToken = verifyToken(authorization);
      res.locals.user = isValidToken;

      return next();
    }
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default { loginValidation, tokenValidation };
