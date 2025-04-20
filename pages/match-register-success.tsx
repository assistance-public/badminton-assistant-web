// pages/MatchRegisterSuccess.tsx
import React from 'react';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const MatchRegisterSuccess: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <Result
        icon={<SmileOutlined />}
        title="Đăng ký tham gia trận đấu thành công!"
        subTitle="Chúng tôi sẽ thông báo nếu có thay đổi liên quan đến trận đấu này."
        extra={
          <Button type="primary" onClick={() => router.push('/')}>
            Về trang chủ
          </Button>
        }
      />
    </div>
  );
};

export default MatchRegisterSuccess;
