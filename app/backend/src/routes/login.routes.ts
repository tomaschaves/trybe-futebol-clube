import { Router } from 'express';
import loginController from '../controllers/login.controller';
import validations from '../middlewares/validations';
import SequelizeUser from '../database/models/SequelizeUsers';

const router = Router();

router.post('/', validations.loginValidation, loginController.loginUser);
router.get('/role', validations.tokenValidation, async (_req, res) => {
  const user = await SequelizeUser.findOne({ where: { email: res.locals.user.data } });
  res.status(200).json({ role: user?.role });
});

export default router;
