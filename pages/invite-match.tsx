import { Button, Card, Descriptions, Form, notification, Select, Typography } from 'antd';
import { attendMatch, getInfoMath, getInfoUser } from 'apis';
import LoadingPage from 'components/LoadingPage';
import NotFoundPage from 'components/NotFoundPage';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ENUM_STATUS_ATTENDANCE, formatWithDay, TITLE_STATUS_ATTENDANCE } from 'utils';
dayjs.extend(duration);

const InviteMatch = () => {
  const [form] = Form.useForm();
  const [match, setMatch] = useState<Record<string, any>>({});
  const [user, setUser] = useState<Record<string, any>>({});
  const [countdown, setCountdown] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { token } = router.query;
  
  const handleSubmit = async () => {
    if (!token) return;
    form.validateFields().then((values) => {
      console.log(values);
      setLoading(true);
      attendMatch(token as string, values)
        .then((res) => {
          res;
          if (values.status === ENUM_STATUS_ATTENDANCE.ACCEPTED) {
            return router.push('match-register-success');
          }
          return router.push('match-decline');
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs();
      const startTime = dayjs(match.start_date);
      const diff = startTime.diff(now);

      if (diff <= 0) {
        setCountdown('Đã bắt đầu');
        clearInterval(interval);
        return;
      }

      const duration = dayjs.duration(diff);
      const formatted =
        `${String(duration.hours()).padStart(2, '0')}:` +
        `${String(duration.minutes()).padStart(2, '0')}:` +
        `${String(duration.seconds()).padStart(2, '0')}`;
      setCountdown(formatted);
    }, 1000);

    return () => clearInterval(interval);
  }, [match.start_date]);

  useEffect(() => {
    if (!token) return;
    const fetchData = Promise.all([
      getInfoMath(token as string)
        .then((res) => {
          setMatch(get(res, 'match', {}));
          console.log(res);
        })
        .catch((err) => {
          const errMessage = get(err, 'response.data.message');
          notification.error({
            message: errMessage || 'Có lỗi xảy ra',
          });
          console.log(err);
        }),
      getInfoUser(token as string)
        .then((res) => {
          setUser(get(res, 'user', {}));
          console.log(res);
        })
        .catch((err) => {
          const errMessage = get(err, 'response.data.message');
          notification.error({
            message: errMessage || 'Có lỗi xảy ra',
          });
          console.log(err);
        }),
    ]);

    fetchData;
  }, [token]);

  if (!token) return <NotFoundPage />;
  if (!user || !match) return <LoadingPage />;

  return (
    <>
      <Card title='Thông tin trận đấu' style={{ maxWidth: 650, margin: '40px auto' }}>
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <Typography.Title level={5}>⏳ Trận đấu bắt đầu sau: {countdown}</Typography.Title>
        </div>
        <Descriptions column={1} bordered size='middle'>
          <Descriptions.Item label='Chủ trận'>
            {match.tbl_user?.name} ({match.tbl_user?.email})
          </Descriptions.Item>
          <Descriptions.Item label='Ngày bắt đầu'>{formatWithDay(match.start_date)}</Descriptions.Item>
          <Descriptions.Item label='Ngày bắt đầu'>{formatWithDay(match.end_date)}</Descriptions.Item>
          <Descriptions.Item label='Địa điểm'>{match.location}</Descriptions.Item>
          <Descriptions.Item label='Trạng thái'>{match.status}</Descriptions.Item>
        </Descriptions>

        <Form form={form} layout='vertical' onFinish={handleSubmit} style={{ marginTop: 24 }}>
          <Form.Item
            name='status'
            label={`Bạn có muốn tham gia không, ${user?.name}?`}
            rules={[{ required: true, message: 'Vui lòng chọn một lựa chọn!' }]}
          >
            <Select
              placeholder='Chọn trạng thái'
              options={Object.values(ENUM_STATUS_ATTENDANCE).map((item) => ({
                value: item,
                label: TITLE_STATUS_ATTENDANCE[item],
              }))}
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' loading={loading} block>
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
export default InviteMatch;
