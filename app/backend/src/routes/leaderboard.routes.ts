import { Router } from 'express';
import leaderboardHomeController from '../controllers/leaderboardHome.controller';
import leaderboardAwayController from '../controllers/leaderboardAway.controller';

const router = Router();

router.get('/home', leaderboardHomeController.getHomeMatchesPoints);
router.get('/away', leaderboardAwayController.getHomeMatchesPoints);

export default router;
