import { Router } from 'express';
import Leaderboard from '../controllers/leaderboard.controller';

const leaderboardRoutes = Router();
const leaderboardController = new Leaderboard();

leaderboardRoutes
  .get('/home', leaderboardController.leaderboardHome);

export default leaderboardRoutes;
