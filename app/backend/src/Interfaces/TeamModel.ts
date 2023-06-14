import Teams from './Teams';

export interface ITeamModel {

  findAll(): Promise<Teams[]>
  findById(id: Teams['id']): Promise<Teams | null>
}
