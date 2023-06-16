import SequelizeTeam from '../database/models/SequelizeTeam';

type matchDetails = {
  id: number,
  awayTeamId: number,
  awayTeamGoals: number,
  homeTeamGoals: number,
};

type responseType = {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
};

const getAllTeams = async () => {
  const responseFromDB = await SequelizeTeam.findAll();
  const allTeamsFromDB = responseFromDB.map((team) => team.dataValues);
  return allTeamsFromDB;
};

const getTotalPoints = (awayTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);

  let sum = 0;

  allGames.forEach((match) => {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      sum += 3;
    } else if (match.awayTeamGoals === match.homeTeamGoals) {
      sum += 1;
    }
  });

  return sum;
};

const getTotalGames = (awayTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);
  return allGames.length;
};

const getTotalVictories = (awayTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);

  let victories = 0;

  allGames.forEach((match) => {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      victories += 1;
    }
  });

  return victories;
};

const getTotalDraws = (awayTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);

  let draws = 0;

  allGames.forEach((match) => {
    if (match.awayTeamGoals === match.homeTeamGoals) {
      draws += 1;
    }
  });

  return draws;
};

const getTotalLosses = (awayTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);

  let losses = 0;

  allGames.forEach((match) => {
    if (match.awayTeamGoals < match.homeTeamGoals) {
      losses += 1;
    }
  });

  return losses;
};

const getGoalsFavor = (awayTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);

  let goalsFavor = 0;

  allGames.forEach((match) => {
    goalsFavor += match.awayTeamGoals;
  });

  return goalsFavor;
};

const getGoalsOwn = (awayTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);

  let goalsOwn = 0;

  allGames.forEach((match) => {
    goalsOwn += match.homeTeamGoals;
  });

  return goalsOwn;
};

const getGoalsBalance = (goalsFavor: number, goalsOwn: number) => goalsFavor - goalsOwn;

const getEficiency = (awayTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.awayTeamId === awayTeamId);
  const totalGames = allGames.length;

  let sumPoints = 0;

  allGames.forEach((match) => {
    if (match.awayTeamGoals > match.homeTeamGoals) {
      sumPoints += 3;
    } else if (match.awayTeamGoals === match.homeTeamGoals) {
      sumPoints += 1;
    }
  });
  const efficiency = ((sumPoints / (totalGames * 3)) * 100);
  return Number(efficiency.toFixed(2));
};

const sortResponse = (object: responseType[]) => {
  object.sort((a, b) => {
    // Sort by victories
    const victoryCount = b.totalVictories - a.totalVictories;
    if (victoryCount) return victoryCount;

    // If there is a tie, sort by goals
    const goalsCount = b.goalsBalance - a.goalsBalance;
    if (goalsCount) return goalsCount;

    const goalsFavorCount = b.goalsFavor - a.goalsFavor;
    return goalsFavorCount;
  });
  return object;
};

export default { getAllTeams,
  getTotalPoints,
  getTotalGames,
  getTotalVictories,
  getTotalDraws,
  getTotalLosses,
  getGoalsFavor,
  getGoalsOwn,
  getGoalsBalance,
  getEficiency,
  sortResponse };
