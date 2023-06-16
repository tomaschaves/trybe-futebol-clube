import SequelizeTeam from '../database/models/SequelizeTeam';

type matchDetails = {
  id: number,
  homeTeamId: number,
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

const getTotalPoints = (homeTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.homeTeamId === homeTeamId);

  let sum = 0;

  allGames.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      sum += 3;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
      sum += 1;
    }
  });

  return sum;
};

const getTotalGames = (homeTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.homeTeamId === homeTeamId);
  return allGames.length;
};

const getTotalVictories = (homeTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.homeTeamId === homeTeamId);

  let victories = 0;

  allGames.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      victories += 1;
    }
  });

  return victories;
};

const getTotalDraws = (homeTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.homeTeamId === homeTeamId);

  let draws = 0;

  allGames.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      draws += 1;
    }
  });

  return draws;
};

const getTotalLosses = (homeTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.homeTeamId === homeTeamId);

  let losses = 0;

  allGames.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      losses += 1;
    }
  });

  return losses;
};

const getGoalsFavor = (homeTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.homeTeamId === homeTeamId);

  let goalsFavor = 0;

  allGames.forEach((match) => {
    goalsFavor += match.homeTeamGoals;
  });

  return goalsFavor;
};

const getGoalsOwn = (homeTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.homeTeamId === homeTeamId);

  let goalsOwn = 0;

  allGames.forEach((match) => {
    goalsOwn += match.awayTeamGoals;
  });

  return goalsOwn;
};

const getGoalsBalance = (goalsFavor: number, goalsOwn: number) => goalsFavor - goalsOwn;

const getEficiency = (homeTeamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData.filter((match) => match.homeTeamId === homeTeamId);
  const totalGames = allGames.length;

  let sumPoints = 0;

  allGames.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      sumPoints += 3;
    } else if (match.homeTeamGoals === match.awayTeamGoals) {
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
