import { Router } from 'express';
import MatchController from '../controllers/MatchesController';
import MatchService from '../services/MatchesService';

const matchesRoutes = Router();
const matchesService = new MatchService();
const matchesController = new MatchController(matchesService);

matchesRoutes.get('/', matchesController.findAll);

export default matchesRoutes;
