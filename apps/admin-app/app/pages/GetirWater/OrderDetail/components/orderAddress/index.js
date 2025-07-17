import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { orderDetailSelector } from '../../redux/selectors';
import useStyles from './styles';

const OrderAdress = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const classes = useStyles();
  const { t } = useTranslation('waterOrderPage');

  const deliveryAddressName = _.get(orderDetail, 'customerName', '');
  const deliveryAddress = _.get(orderDetail, 'customerAddress', '');
  const deliveryAddressAptNo = _.get(orderDetail, 'customerApartmentNo', '');
  const deliveryAddressFloor = _.get(orderDetail, 'customerFloor', '');
  const deliveryAddressDoorNo = _.get(orderDetail, 'customerDoorNo', '');
  const deliveryAddressDirections = _.get(orderDetail, 'customerAddressDescription', '');
  const deliveryAddressClientNote = _.get(orderDetail, 'customerNote', '');

  return (
    <div className={classes.customerInfo}>
      <Col className={classes.colInfo}>
        <Row>
          <Col span={6}>
            <span>{t('ADDRESS_INFO.NAME')}</span>
          </Col>
          <Col span={18}>
            <span>: {deliveryAddressName}</span>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <span>{t('ADDRESS_INFO.ADDRESS')}</span>
          </Col>
          <Col span={18}>
            <span>: {deliveryAddress}</span>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <span>{t('ADDRESS_INFO.APARTMENT')}</span>
          </Col>
          <Col span={18}>
            <span>: {deliveryAddressAptNo}</span>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <span>{t('ADDRESS_INFO.DOOR')}</span>
          </Col>
          <Col span={18}>
            <span>: {deliveryAddressFloor}</span>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <span>{t('ADDRESS_INFO.DOOR_NO')}</span>
          </Col>
          <Col span={18}>
            <span>: {deliveryAddressDoorNo}</span>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <span>{t('ADDRESS_INFO.ADDRESS_DIRECTION')}</span>
          </Col>
          <Col span={18}>
            <span>: {deliveryAddressDirections}</span>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <span>{t('ADDRESS_INFO.CLIENT_NOTE')}</span>
          </Col>
          <Col span={18}>
            <span>: {deliveryAddressClientNote}</span>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default OrderAdress;
