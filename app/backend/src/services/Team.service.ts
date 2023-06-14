import TeamModel from '../database/models/SequelizeTeam';

const getAllTeams = async () => {
  const teams = await TeamModel.findAll();

  if (teams.length === 0) return { type: 'NOT FOUND', message: 'Teams not found' };

  return { type: 'SUCCESSFUL', message: teams };
};

const getTeamById = async (id: number) => {
  const team = await TeamModel.findByPk(id);

  if (!team) return { type: 'NOT FOUND', message: 'Team not found' };

  return { type: 'SUCCESSFUL', message: team };
};

export default { getAllTeams, getTeamById };
