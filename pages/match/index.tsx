// pages/MatchList.tsx
import React from 'react';
import useSWR from 'swr';
import { Card, List, Typography, Space, Tag, Spin, Alert } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, ClockCircleOutlined, TeamOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/vi';
import { axiosBadmintonAssistant } from 'utils/axios';
import { useRouter } from 'next/router';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('vi');

const MatchList = () => {
  const router = useRouter();
  const {
    data: matches,
    error,
    isLoading,
  } = useSWR('/api/matches', () => axiosBadmintonAssistant()('/api/match/list').then((res: any) => res?.matches));

  if (isLoading) return <Spin tip='Đang tải danh sách trận đấu...' />;
  if (error) return <Alert type='error' message='Lỗi tải dữ liệu trận đấu' />;

  return (
    <div style={{ padding: '30px' }}>
      <Typography.Title level={2}>Danh sách trận đấu</Typography.Title>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={matches}
        renderItem={(match: Record<string, any>) => (
          <List.Item key={match.id}>
            <Card
              hoverable
              onClick={() => {
                router.push(`${router.pathname}/${match.id}`);
              }}
              title={`Người trả tiền: ${match.tbl_user.name}(${match.tbl_user.email})`}
              extra={<Tag color='blue'>{dayjs(match.start_time).format('dddd, DD/MM/YYYY')}</Tag>}
            >
              <Space direction='vertical' size='middle'>
                <div>
                  <EnvironmentOutlined /> Địa điểm: <strong>{match.location}</strong>
                </div>
                <div>
                  <ClockCircleOutlined /> Thời gian:{' '}
                  <strong>
                    {dayjs(match.start_date).format('HH:mm')} - {dayjs(match.end_date).format('HH:mm')}
                  </strong>
                </div>
                <div>
                  <TeamOutlined /> Tổng số người tham gia:
                  <strong>N/A</strong>
                </div>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default MatchList;
