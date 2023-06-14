import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import teamService from '../services/Team.service';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

const getAllTeams = async (_req: Request, res: Response): Promise<Response> => {
  const { type, message } = await teamService.getAllTeams();
  return res.status(mapStatusHTTP(type)).json(message);
};

const getTeamById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const { type, message } = await teamService.getTeamById(Number(id));
  return res.status(mapStatusHTTP(type)).json(message);
};

export default { getAllTeams, getTeamById };
