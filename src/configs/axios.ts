import axios from 'axios';
import { currentUser } from '../services/authentication.service';

const instance = axios.create({
  baseURL: 'mocks',
});

instance.interceptors.request.use((config) => {
  const currUser = currentUser();
  if (currUser) {
    config.headers.Authorization = currUser.id;
  }

  return config;
});

export { instance as axios };
