import { ModelStatic } from 'sequelize';
import User from '../database/models/user.model';
import { IUserTable, IUsersService } from '../interfaces/user.interface';

export default class UserService implements IUsersService {
  protected _model: ModelStatic<User> = User;

  findUser = async (email: string, password: string): Promise<IUserTable | null> => {
    const user = await this._model.findOne({
      where: {
        email,
        password,
      },
    });

    return user;
  };
}
