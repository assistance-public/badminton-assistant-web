import { axiosBadmintonAssistant } from 'utils/axios';

export const getInfoMath = (token: string) => {
  return axiosBadmintonAssistant()('/api/match', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
