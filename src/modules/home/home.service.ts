import { axios } from '../../configs/axios';

export type HomeData = {
  id: string;
  name: string;
  calories: string;
  fat: string;
  carbs: string;
  protein: string;
};
export const getHomeData = async (): Promise<HomeData[]> => {
  const { data } = await axios.get<HomeData[]>('/home.json');
  return data;
};
