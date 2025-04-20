// pages/MatchDecline.tsx
import React from 'react';
import { Result, Button } from 'antd';
import { FrownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const MatchDecline: React.FC = () => {
  const router = useRouter();

  return (
    <div className='flex items-center justify-center min-h-screen bg-white'>
      <Result
        icon={<FrownOutlined />}
        status='info'
        title='Bạn đã chọn không tham gia trận đấu này'
        subTitle='Hy vọng bạn sẽ tham gia ở lần tiếp theo!'
        extra={
          <Button type='primary' onClick={() => router.push('/')}>
            Về trang chủ
          </Button>
        }
      />
    </div>
  );
};

export default MatchDecline;
