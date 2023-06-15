import { Model, QueryInterface, DataTypes } from 'sequelize';
import Matches from '../../Interfaces/Matches';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Matches>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeamId: {
        field: 'home_team_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      homeTeamGoals: {
        field: 'home_team_goals',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      awayTeamId: {
        field: 'away_team_id',
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      inProgress: {
        field: 'in_progress',
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};