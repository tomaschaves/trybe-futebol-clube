import { Request, Router, Response } from 'express';
import TeamController from '../controllers/teams.controller';
// // import Validations from '../middlewares/Validations';

const teamController = new TeamController();

const router = Router();

router.get('/', async (_req: Request, res: Response) => teamController.getAllTeams(_req, res));

// router.get('/:id', (req: Request, res: Response) => bookController.getBookById(req, res));

// router.post(
//   '/',
//   Validations.validateBook,
//   (req: Request, res: Response) => bookController.createBook(req, res),
// );

// router.put(
//   '/:id',
//   Validations.validateBook,
//   (req: Request, res: Response) =>
//     bookController.updateBook(req, res),
// );

// router.delete(
//   '/:id',
//   (req: Request, res: Response) => bookController.deleteBook(req, res),
// );

export default router;
