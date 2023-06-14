// código pego da aula ao vivo para a geração do token
import { sign, verify, SignOptions } from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

const JWT_CONFIG: SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1000m',
};
export const verifyToken = (token: string) => verify(token, secret);

export const createToken = (payload: string) =>
  sign({ data: payload }, secret, JWT_CONFIG);
