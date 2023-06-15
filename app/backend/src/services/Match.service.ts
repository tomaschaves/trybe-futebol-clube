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

export default { getAllMatches };
