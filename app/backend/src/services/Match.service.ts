import SequelizeTeam from '../database/models/SequelizeTeam';
import MatchModel from '../database/models/SequelizeMatches';

const getAllMatches = async () => {
  const matches = await MatchModel
    .findAll(
      { include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      attributes:
          { exclude: ['home_team_id', 'away_team_id'] },
      },
    );
  return { type: 'SUCCESSFUL', message: { matches } };
};

const getAllMatchesInProgress = async (status: boolean) => {
  const matches = await MatchModel
    .findAll(
      { include: [
        { model: SequelizeTeam, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: SequelizeTeam, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: { inProgress: status },
      attributes:
          { exclude: ['home_team_id', 'away_team_id'] },
      },
    );
  return { type: 'SUCCESSFUL', message: { matches } };
};

const finishMatch = async (id: number) => {
  await MatchModel.update(
    { inProgress: false },
    { where: { id } },
  );
  return { type: 'SUCCESSFUL', message: { message: 'Finished' } };
};

const editMatch = async (id: number, body: { homeTeamGoals: number, awayTeamGoals: number }) => {
  await MatchModel.update(
    {
      homeTeamGoals: body.homeTeamGoals,
      awayTeamGoals: body.awayTeamGoals,
    },
    { where: { id } },
  );
  return { type: 'SUCCESSFUL', message: { message: 'Updated!' } };
};

const registerMatch = async (
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
) => {
  const { dataValues } = await MatchModel
    .create({ inProgress: true, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals });
  return { type: 'CREATED', message: dataValues };
};

export default { getAllMatches, getAllMatchesInProgress, finishMatch, editMatch, registerMatch };
