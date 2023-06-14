import { Router } from 'express';
import loginController from '../controllers/login.controller';
import loginValidation from '../middlewares/validations';

const router = Router();

router.post('/', loginValidation, loginController.loginUser);

export default router;
