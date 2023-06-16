import { Router } from 'express';
import leaderboardHomeController from '../controllers/leaderboardHome.controller';
import leaderboardAwayController from '../controllers/leaderboardAway.controller';
import leaderboardController from '../controllers/leaderboard.controller';

const router = Router();

router.get('/home', leaderboardHomeController.getHomeMatchesPoints);
router.get('/away', leaderboardAwayController.getHomeMatchesPoints);
router.get('/', leaderboardController.getHomeMatchesPoints);

export default router;
