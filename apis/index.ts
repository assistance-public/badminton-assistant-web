import { axiosPayOS } from 'utils/axios';

export const getInfoApp = (payload: string) => {
  return axiosPayOS()('/api/payos/apps', {
    method: 'get',
    headers: {
      'x-sso-payload': payload,
    },
  });
};
