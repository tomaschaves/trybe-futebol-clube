// import { NewEntity } from '../interfaces';
// import BookModel from '../models/';
// import { IBook } from '../interfaces/books/IBook';
import { Teams } from '../Interfaces/Teams';
import { /* ServiceMessage, */ ServiceResponse } from '../Interfaces/ServiceResponse';
import { ITeamModel } from '../Interfaces/TeamModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<Teams[]>> {
    const allTeams = await this.teamModel.findAll();

    return { status: 'SUCCESSFUL', data: allTeams };
  }

  // public async getBookById(id: number): Promise<ServiceResponse<IBook>> {
  //   const book = await this.bookModel.findById(id);
  //   if (!book) return { status: 'NOT_FOUND', data: { message: `Book ${id} not found` } };
  //   return { status: 'SUCCESSFUL', data: book };
  // }

  // public async createBook(book: NewEntity<IBook>): Promise<ServiceResponse<IBook>> {
  //   const newBook = await this.bookModel.create(book);
  //   return { status: 'SUCCESSFUL', data: newBook };
  // }

  // public async updateBook(id: number, book: IBook): Promise<ServiceResponse<ServiceMessage>> {
  //   const bookFound = await this.bookModel.findById(id);
  //   if (!bookFound) return { status: 'NOT_FOUND', data: { message: `Book ${id} not found` } };

  //   const updatedBook = await this.bookModel.update(id, book);
  //   if (!updatedBook) {
  //     return { status: 'CONFLICT',
  //       data: { message: `There are no updates to perform in Book ${id}` } };
  //   }
  //   return { status: 'SUCCESSFUL', data: { message: 'Book updated' } };
  // }

  // public async deleteBook(id: number): Promise<ServiceResponse<ServiceMessage>> {
  //   const bookFound = await this.bookModel.findById(id);
  //   if (!bookFound) return { status: 'NOT_FOUND', data: { message: `Book ${id} not found` } };

  //   await this.bookModel.delete(id);
  //   return { status: 'SUCCESSFUL', data: { message: 'Book deleted' } };
  // }
}
