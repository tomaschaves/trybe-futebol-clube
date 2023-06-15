import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../auth/token';
import TeamModel from '../database/models/SequelizeTeam';

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
    const isValidToken = verifyToken(authorization);
    res.locals.user = isValidToken;
    return next();
  } catch (error) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

const teamsValidation = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  const teamsInsertion = [homeTeamId, awayTeamId];

  const responseFromDB = await TeamModel.findAll();
  const allTeamsFromDB = responseFromDB.map((team) => team.dataValues.id);
  const containTeams = teamsInsertion.every((team) => allTeamsFromDB.includes(Number(team)));

  if (homeTeamId === awayTeamId) {
    return res.status(422)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }

  if (!containTeams) {
    return res.status(404)
      .json({ message: 'There is no team with such id!' });
  }

  return next();
};

export default { loginValidation, tokenValidation, teamsValidation };
