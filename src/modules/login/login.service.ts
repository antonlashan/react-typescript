import {
  setUser,
  UserData,
  UserRes,
} from '../../services/authentication.service';
import { axios } from '../../configs/axios';

export const login = async (
  email: string,
  passowrd: string
): Promise<UserRes> => {
  const { data } = await axios.get<UserData[]>('/login.json');
  const user = data.find((user) => user.email === email);
  if (user) {
    setUser(user);
    return user;
  }
  return null;
};
