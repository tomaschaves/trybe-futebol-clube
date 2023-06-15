import { Router } from 'express';
import matchController from '../controllers/match.controller';
import validations from '../middlewares/validations';

const router = Router();

router.get('/', matchController.getAllMatches);
router.patch('/:id/finish', validations.tokenValidation, matchController.finishMatch);

export default router;
