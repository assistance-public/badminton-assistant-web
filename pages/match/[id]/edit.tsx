import { Button, Card, Col, Collapse, Form, InputNumber, notification, Row, Typography } from 'antd';
import { createPersonalExpense, getAllAttendance } from 'apis';
import LoadingPage from 'components/LoadingPage';
import { get, isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { axiosBadmintonAssistant } from 'utils/axios';
import Image from 'next/image';

const MatchDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [attendances, setAttendances] = useState([]);
  const {
    data: products,
    error: errorProducts,
    isLoading: isLoadingProducts,
  } = useSWR('/api/product', () => axiosBadmintonAssistant()('/api/product').then((res: any) => res?.products));

  const [forms] = useState({});

  const handleFinish = (attendanceId: number, values: Record<string, any>) => {
    const usedProducts = Object.entries(values)
      .filter(([_, qty]) => qty > 0)
      .map(([productId, qty]) => ({
        productId: Number(productId),
        quantity: qty,
      }));
    if (isEmpty(usedProducts)) {
      notification.warning({
        message: 'Bạn chưa chọn số lượng loại đồ nào',
      });
      return;
    }

    console.log('Saving for:', attendanceId, usedProducts);
    createPersonalExpense({
      attendanceId,
      products: usedProducts,
    })
      .then((res) => {
        notification.success({
          message: 'Cập nhập thành công',
        });
      })
      .catch((err) => {
        notification.error({
          message: get(err, 'response.data.message', 'Có lỗi xảy ra'),
        });
      });
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = () => {
      getAllAttendance({ matchId: id })
        .then((res) => {
          console.log(res);
          setAttendances(res as any);
        })
        .catch((err) => {
          console.log(err);
          notification.error({
            message: get(err, 'response.data.message') || 'Không lấy được dữ liệu',
          });
        });
    };
    fetchData();
  }, [id]);

  if (isLoadingProducts || isEmpty(attendances)) {
    return <LoadingPage />;
  }
  return (
    <div style={{ padding: '30px' }}>
      <Collapse accordion>
        {Array.isArray(attendances) &&
          attendances.map((attendance: Record<string, any>) => (
            <Collapse.Panel header={`${attendance.tbl_user?.name}`} key={attendance.id}>
              <Form
                layout='vertical'
                onFinish={(values) => handleFinish(attendance.id, values)}
                // ref={(el) => (forms[attendance?.id as any] = el)}
              >
                <Row gutter={[16, 16]}>
                  {products.map((product: Record<string, any>) => (
                    <Col span={24} key={product.id}>
                      <Card>
                        <Row gutter={16} align='middle'>
                          <Col xs={6} sm={4} md={3}>
                            <Image
                              src={product.image_url}
                              alt={product.name}
                              width={'100'}
                              height={100}
                              style={{ borderRadius: 8 }}
                              // placeholder
                            />
                          </Col>
                          <Col xs={18} sm={20} md={21}>
                            <Row justify='space-between' align='middle'>
                              <Col>
                                <Typography.Title level={5} style={{ margin: 0 }}>
                                  {product.name.trim()}
                                </Typography.Title>
                                <Typography.Text type='secondary'>{product.amount.toLocaleString()}đ</Typography.Text>
                              </Col>
                              <Col>
                                <Form.Item name={String(product.id)} noStyle>
                                  <InputNumber min={0} placeholder='Số lượng' />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <Form.Item style={{ marginTop: 20 }}>
                  <Button type='primary' htmlType='submit'>
                    Lưu sản phẩm đã dùng
                  </Button>
                </Form.Item>
              </Form>
            </Collapse.Panel>
          ))}
      </Collapse>
    </div>
  );
};
export default MatchDetail;
