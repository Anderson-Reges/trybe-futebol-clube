import { Router } from 'express';
import authorizationToken from '../middlewares/authorToken';
import MatchController from '../controllers/MatchesController';
import MatchService from '../services/MatchesService';

const matchesRoutes = Router();
const matchesService = new MatchService();
const matchesController = new MatchController(matchesService);

matchesRoutes
  .get('/', matchesController.findAll)
  .patch('/:id/finish', authorizationToken, matchesController.finisInProgressMatch);

export default matchesRoutes;
