import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import loginService from '../services/Login.service';

const loginUser = async (req: Request, res: Response): Promise<Response> => {
  const { email, password } = req.body;
  const { type, message } = await loginService.loginUser(email, password);

  return res.status(mapStatusHTTP(type)).json(message);
};

export default { loginUser };
