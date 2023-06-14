import Teams from '../Interfaces/Teams';
import SequelizeTeam from '../database/models/SequelizeTeam';
// import { IBook } from '../interfaces/books/IBook';

export default class TeamModel {
  private model = SequelizeTeam;

  async findById(id: Teams['id']): Promise<Teams | null> {
    const dbData = await this.model.findByPk(id);
    if (dbData == null) return null;
    const { teamName }: Teams = dbData;

    return { id, teamName };
  }

  async findAll(): Promise<Teams[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  // async create(data: NewEntity<IBook>): Promise<IBook> {
  //   const dbData = await this.model.create(data);

  //   const { id, title, price, author, isbn }: IBook = dbData;
  //   return { id, title, price, author, isbn };
  // }

  // async update(id: IBook['id'], data: Partial<NewEntity<IBook>>): Promise<IBook | null> {
  //   const [affectedRows] = await this.model.update(data, { where: { id } });
  //   if (affectedRows === 0) return null;

  //   return this.findById(id);
  // }

  // async delete(id: IBook['id']): Promise<number> {
  //   return this.model.destroy({ where: { id } });
  // }
}
