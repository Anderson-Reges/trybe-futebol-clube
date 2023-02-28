import { Router } from 'express';
import TeamService from '../services/TeamsService';
import TeamController from '../controllers/TeamsController';

const teamsRoutes = Router();
const teamService = new TeamService();
const teamsController = new TeamController(teamService);

teamsRoutes.get('/', teamsController.findAll);
teamsRoutes.get('/:id', teamsController.findById);

export default teamsRoutes;
