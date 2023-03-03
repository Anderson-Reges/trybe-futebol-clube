import { Router } from 'express';
import LeaderboardService from '../services/LeaderboardService';
import Leaderboard from '../controllers/leaderboard.controller';
import Team from '../database/models/team.model';
import Match from '../database/models/match.model';

const leaderboardRoutes = Router();
const leaderboardService = new LeaderboardService(Team, Match);
const leaderboardController = new Leaderboard(leaderboardService);

leaderboardRoutes
  .get('/', leaderboardController.All)
  .get('/home', leaderboardController.AllHome)
  .get('/away', leaderboardController.AllAway);

export default leaderboardRoutes;
