import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row } from 'antd';

import CreditCardInfo from './CreditCard';
import InvoiceCard from './InvoiceCard';
import { orderDetailSelector } from '../../redux/selectors';
import permKey from '@shared/shared/permKey.json';
import { usePermission } from '@shared/hooks';

const InvoiceInfo = () => {
  const orderDetail = useSelector(orderDetailSelector.getData);
  const { Can } = usePermission();
  return (
    <Row gutter={4}>
      <Col xs={24} sm={24} md={24} lg={24} xl={12}>
        <InvoiceCard orderDetail={orderDetail} />
      </Col>
      <Can permKey={permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_PAYMENT_INFO}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12}>
          <CreditCardInfo payment={orderDetail?.payment} />
        </Col>
      </Can>
    </Row>
  );
};

export default memo(InvoiceInfo);
