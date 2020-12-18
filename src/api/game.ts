import { api } from '@/utils/request';

export const getTypeRacerText = () => {
  return api.get('/typeracer/text');
};
