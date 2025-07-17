import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { get } from 'lodash';

import { orderDetailSelector } from '../../redux/selectors';
import WarehouseInfo from './WarehouseInfo';
import CourierInfo from './CourierInfo';
import ClientInfo from './ClientInfo';

const OrderCardInfo = () => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const warehouse = get(orderDetail, 'warehouse.warehouse', {});
  const picker = get(orderDetail, 'picking.picker', {});
  const courier = get(orderDetail, 'courier.courier', {});
  const client = get(orderDetail, 'client.client', {});

  return (
    <Row gutter={[6, 6]} data-testid="card-section-container" align="stretch">
      <Col xs={24} sm={24} md={24} lg={24} xl={8}>
        <ClientInfo client={client} />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={8}>
        <CourierInfo courier={courier} />
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={8}>
        <WarehouseInfo warehouse={warehouse} picker={picker} />
      </Col>
    </Row>
  );
};

export default memo(OrderCardInfo);
