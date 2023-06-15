import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import matchService from '../services/Match.service';

const getAllMatches = async (req: Request, res: Response): Promise<Response> => {
  const { inProgress } = req.query;

  if (inProgress === 'true') {
    const { type, message } = await matchService.getAllMatchesInProgress(true);
    return res.status(mapStatusHTTP(type)).json(message.matches);
  }

  if (inProgress === 'false') {
    const { type, message } = await matchService.getAllMatchesInProgress(false);
    return res.status(mapStatusHTTP(type)).json(message.matches);
  }

  const { type, message } = await matchService.getAllMatches();
  return res.status(mapStatusHTTP(type)).json(message.matches); // pegando a chave matches do objeto gigante
};

const finishMatch = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { type, message } = await matchService.finishMatch(Number(id));
  return res.status(mapStatusHTTP(type)).json(message);
};

const editMatch = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { type, message } = await matchService.editMatch(Number(id), req.body);
  return res.status(mapStatusHTTP(type)).json(message);
};

const registerMatch = async (req: Request, res: Response): Promise<Response> => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
  const { type, message } = await matchService
    .registerMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
  return res.status(mapStatusHTTP(type)).json(message);
};

export default { getAllMatches, finishMatch, editMatch, registerMatch };
