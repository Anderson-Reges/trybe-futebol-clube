import { ModelStatic } from 'sequelize';
import User from '../database/models/user.model';
import { ILoginUser, IUsersService } from '../interfaces/user.interface';

export default class UserService implements IUsersService {
  protected model: ModelStatic<User> = User;

  findUser = (email: string, password: string): Promise<ILoginUser | null> => {
    const user = this.model.findOne({
      where: {
        email,
        password,
      },
    });

    return user;
  };
}
