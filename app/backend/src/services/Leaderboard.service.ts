import SequelizeTeam from '../database/models/SequelizeTeam';

type matchDetails = {
  id: number,
  awayTeamId: number,
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

const getTotalPoints = (teamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData
    .filter((match) => match.awayTeamId === teamId || match.homeTeamId === teamId);

  let sum = 0;

  allGames.forEach((match) => {
    if ((match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals)
      || (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals)) {
      sum += 3;
    } else if (
      (match.awayTeamId === teamId || match.homeTeamId === teamId)
      && match.awayTeamGoals === match.homeTeamGoals) {
      sum += 1;
    }
  });

  return sum;
};

const getTotalGames = (teamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData
    .filter((match) => match.awayTeamId === teamId || match.homeTeamId === teamId);
  return allGames.length;
};

const getTotalVictories = (teamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData
    .filter((match) => match.awayTeamId === teamId || match.homeTeamId === teamId);

  let victories = 0;

  allGames.forEach((match) => {
    if ((match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals)
      || (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals)) {
      victories += 1;
    }
  });

  return victories;
};

const getTotalDraws = (teamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData
    .filter((match) => match.awayTeamId === teamId || match.homeTeamId === teamId);

  let draws = 0;

  allGames.forEach((match) => {
    if ((match.awayTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals)
    || (match.homeTeamId === teamId && match.awayTeamGoals === match.homeTeamGoals)) {
      draws += 1;
    }
  });

  return draws;
};

const getTotalLosses = (teamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData
    .filter((match) => match.awayTeamId === teamId || match.homeTeamId === teamId);

  let losses = 0;

  allGames.forEach((match) => {
    if ((match.awayTeamId === teamId && match.awayTeamGoals < match.homeTeamGoals)
    || (match.homeTeamId === teamId && match.homeTeamGoals < match.awayTeamGoals)) {
      losses += 1;
    }
  });

  return losses;
};

const getGoalsFavor = (teamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData
    .filter((match) => match.awayTeamId === teamId || match.homeTeamId === teamId);

  let goalsFavor = 0;

  allGames.forEach((match) => {
    if (match.awayTeamId === teamId) {
      goalsFavor += match.awayTeamGoals;
    } else if (match.homeTeamId === teamId) {
      goalsFavor += match.homeTeamGoals;
    }
  });

  return goalsFavor;
};

const getGoalsOwn = (teamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData
    .filter((match) => match.awayTeamId === teamId || match.homeTeamId === teamId);

  let goalsOwn = 0;

  allGames.forEach((match) => {
    if (match.awayTeamId === teamId) {
      goalsOwn += match.homeTeamGoals;
    } else if (match.homeTeamId === teamId) {
      goalsOwn += match.awayTeamGoals;
    }
  });

  return goalsOwn;
};

const getGoalsBalance = (goalsFavor: number, goalsOwn: number) => goalsFavor - goalsOwn;

const getEficiency = (teamId: number, allMatchesData: matchDetails[]) => {
  const allGames = allMatchesData
    .filter((match) => match.awayTeamId === teamId || match.homeTeamId === teamId);
  const totalGames = allGames.length;
  console.log("🚀 ~ file: Leaderboard.service.ts:144 ~ getEficiency ~ totalGames:", allGames)
  
  let sumPoints = 0;
  
  allGames.forEach((match) => {
    if ((match.awayTeamId === teamId && match.awayTeamGoals > match.homeTeamGoals)
      || (match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals)) {
      sumPoints += 3;
    } else if (
      (match.awayTeamId === teamId || match.homeTeamId === teamId)
      && match.awayTeamGoals === match.homeTeamGoals) {
      sumPoints += 1;
    }
  });
  
  console.log("🚀 ~ file: Leaderboard.service.ts:147 ~ getEficiency ~ sumPoints:", teamId, sumPoints)
  
  const efficiency = ((sumPoints / (totalGames * 3)) * 100);
  return Number(efficiency.toFixed(2));
};

const sortResponse = (object: responseType[]) => {
  object.sort((a, b) => {
    // Sort by points
    const pointsCount = b.totalPoints - a.totalPoints;
    if (pointsCount) return pointsCount;
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
