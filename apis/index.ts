import { axiosBadmintonAssistant } from 'utils/axios';

export const getInfoMath = (token: string) => {
  return axiosBadmintonAssistant()('/api/match', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getInfoUser = (token: string) => {
  return axiosBadmintonAssistant()('/api/user', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const attendMatch = (token: string, body: Record<string, any>) => {
  return axiosBadmintonAssistant()('/api/attendance', {
    method: 'post',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: body,
  });
};
