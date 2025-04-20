// pages/MatchList.tsx
import React from 'react';
import useSWR from 'swr';
import { Card, List, Typography, Space, Tag, Spin, Alert } from 'antd';
import { CalendarOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/vi';
import { axiosBadmintonAssistant } from 'utils/axios';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('vi');

const MatchList = () => {
  const {
    data: matches,
    error,
    isLoading,
  } = useSWR('/api/matches', () => axiosBadmintonAssistant()('/api/match/list').then((res: any) => res?.matches));

  if (isLoading) return <Spin tip='Đang tải danh sách trận đấu...' />;
  if (error) return <Alert type='error' message='Lỗi tải dữ liệu trận đấu' />;

  return (
    <div className='p-6'>
      <Typography.Title level={2}>Danh sách trận đấu</Typography.Title>

      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={matches}
        renderItem={(match: Record<string, any>) => (
          <List.Item key={match.id}>
            <Card
              title={match.title}
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
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default MatchList;
