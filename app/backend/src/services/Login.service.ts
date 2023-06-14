import { compare } from 'bcryptjs';
import UserModel from '../database/models/SequelizeUsers';
import { createToken } from '../auth/token';

const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ where: { email } });
  if (user === null) {
    return { type: 'UNAUTHORIZED', message: { message: 'Invalid email or password' } };
  }

  const comparePassword = await compare(password, user.password);
  if (!comparePassword) {
    return { type: 'UNAUTHORIZED', message: { message: 'Invalid email or password' } };
  }

  const token = createToken(user.email);

  return { type: 'SUCCESSFUL', message: { token } };
};

export default { loginUser };
