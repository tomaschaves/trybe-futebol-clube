import { Teams } from './Teams';

export interface ITeamModel {

  findAll(): Promise<Teams[]>
}
