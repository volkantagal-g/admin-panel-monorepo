import { Collapse, Row, Col, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const TotalOrderCount = props => {
  const { getOrder, prevData } = props;
  const { t } = useTranslation(['courierSegment', 'global']);
  const [orderCount, setOrderCount] = useState(prevData?.orderCount || null);

  const handleCountChange = event => {
    setOrderCount(() => {
      const count = Number(event.target.value);
      return count;
    });
  };

  useEffect(() => {
    getOrder({ totalOrderCount: { orderCount } });
  }, [getOrder, orderCount]);

  return (
    <Collapse>
      <Collapse.Panel header={t('TOTAL_ORDER_COUNT')}>
        <Row gutter={[8, 8]}>
          <Col xs={24} sm={24} md={12}>
            <Input
              placeholder={t('TOTAL_ORDER_COUNT')}
              type="number"
              value={orderCount}
              onChange={handleCountChange}
            />
          </Col>
        </Row>
      </Collapse.Panel>
    </Collapse>
  );
};

export default TotalOrderCount;
