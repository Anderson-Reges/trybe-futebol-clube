import { Router } from 'express';
import authorizationToken from '../middlewares/authorToken';
import UsersController from '../controllers/UsersController';
import UserService from '../services/UsersService';
import validateLogin from '../middlewares/validateLogin';

const usersRoutes = Router();
const userService = new UserService();
const userController = new UsersController(userService);

usersRoutes
  .get('/role', authorizationToken, userController.LoginRole)
  .post('/', validateLogin, userController.Login);

export default usersRoutes;
