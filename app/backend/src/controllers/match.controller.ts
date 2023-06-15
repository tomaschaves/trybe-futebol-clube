import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import matchService from '../services/Match.service';

const getAllMatches = async (req: Request, res: Response): Promise<Response> => {
  const { type, message } = await matchService.getAllMatches();
  return res.status(mapStatusHTTP(type)).json(message.matches); // pegando a chave matches do objeto gigante
};

export default { getAllMatches };
