import { Router } from 'express';
import teamController from '../controllers/teams.controller';
// // import Validations from '../middlewares/Validations';

const router = Router();

router.get('/', teamController.getAllTeams);

router.get('/:id', teamController.getTeamById);

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
