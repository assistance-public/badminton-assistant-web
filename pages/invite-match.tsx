import { notification } from 'antd';
import { getInfoMath } from 'apis';
import NotFoundPage from 'components/NotFoundPage';
import { useRouter } from 'next/router';
import { useEffect, useLayoutEffect } from 'react';

const InviteMatch = () => {
  const router = useRouter();
  const { token } = router.query;
  console.log(router.query);

  useEffect(() => {
    if (!token) return;
    getInfoMath(token as string)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        notification.error({
          message: 'Có lỗi xảy ra',
        });
        console.log(err);
      });
  }, [token]);
  if (!token) return <NotFoundPage />;

  return <>InviteMatch</>;
};
export default InviteMatch;
