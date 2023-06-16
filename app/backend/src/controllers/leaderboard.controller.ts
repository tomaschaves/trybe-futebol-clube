import { Request, Response } from 'express';
import leaderboardService from '../services/Leaderboard.service';
import MatchService from '../services/Match.service';

const getHomeMatchesPoints = async (req: Request, res: Response): Promise<Response> => {
  const allTeams = await leaderboardService.getAllTeams();
  const allMatches = await MatchService.getAllMatchesInProgress(false);
  const allData = allMatches.message.matches.map((match) => match.dataValues);

  const objectToReturn = allTeams.map((team) => ({
    name: team.teamName,
    totalPoints: leaderboardService.getTotalPoints(team.id, allData),
    totalGames: leaderboardService.getTotalGames(team.id, allData),
    totalVictories: leaderboardService.getTotalVictories(team.id, allData),
    totalDraws: leaderboardService.getTotalDraws(team.id, allData),
    totalLosses: leaderboardService.getTotalLosses(team.id, allData),
    goalsFavor: leaderboardService.getGoalsFavor(team.id, allData),
    goalsOwn: leaderboardService.getGoalsOwn(team.id, allData),
    goalsBalance: leaderboardService
      .getGoalsFavor(team.id, allData) - leaderboardService.getGoalsOwn(team.id, allData),
    efficiency: leaderboardService.getEficiency(team.id, allData),
  }
  ));

  return res.status(200).json(leaderboardService.sortResponse(objectToReturn));
};

export default { getHomeMatchesPoints };
