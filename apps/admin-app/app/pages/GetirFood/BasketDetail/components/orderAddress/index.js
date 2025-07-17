import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'antd';
import { get } from 'lodash';

import { orderDetailSelector } from '@app/pages/GetirFood/BasketDetail/redux/selectors';
import useStyles from './styles';

const OrderAddress = () => {
  const { t } = useTranslation('foodOrderPage');
  const classes = useStyles();
  const orderDetail = useSelector(orderDetailSelector.getData);

  const deliveryAddressName = get(orderDetail, 'deliveryAddress.name', '');
  const deliveryAddress = get(orderDetail, 'deliveryAddress.address', '');
  const deliveryAddressAptNo = get(orderDetail, 'deliveryAddress.aptNo', '');
  const deliveryAddressFloor = get(orderDetail, 'deliveryAddress.floor', '');
  const deliveryAddressDoorNo = get(orderDetail, 'deliveryAddress.doorNo', '');
  const deliveryAddressDirections = get(orderDetail, 'deliveryAddress.description', '');
  const deliveryAddressClientNote = get(orderDetail, 'clientNote', '');
  const isEcoFriendly = get(orderDetail, 'isEcoFriendly', false);
  const isDoNotKnock = get(orderDetail, 'doNotKnock', false);

  return (
    <Col className={classes.colInfo}>
      <Row>
        <Col span={6} className={classes.infoTitle}>
          <span>{t('ADDRESS_INFO.NAME')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddressName}</span>
        </Col>
      </Row>
      <Row>
        <Col span={6} className={classes.infoTitle}>
          <span>{t('ADDRESS_INFO.ADDRESS')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddress}</span>
        </Col>
      </Row>
      <Row>
        <Col span={6} className={classes.infoTitle}>
          <span>{t('ADDRESS_INFO.APARTMENT')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddressAptNo}</span>
        </Col>
      </Row>
      <Row>
        <Col span={6} className={classes.infoTitle}>
          <span>{t('ADDRESS_INFO.DOOR')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddressFloor}</span>
        </Col>
      </Row>
      <Row>
        <Col span={6} className={classes.infoTitle}>
          <span>{t('ADDRESS_INFO.DOOR_NO')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddressDoorNo}</span>
        </Col>
      </Row>
      <Row>
        <Col span={6} className={classes.infoTitle}>
          <span>{t('ADDRESS_INFO.ADDRESS_DIRECTION')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddressDirections}</span>
        </Col>
      </Row>
      <Row>
        <Col span={6} className={classes.infoTitle}>
          <span>{t('ADDRESS_INFO.CLIENT_NOTE')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddressClientNote}</span>
        </Col>
      </Row>
      {isEcoFriendly && (
        <Row className={classes.textDanger}>
          <Col span={24}>
            <span>{t('DONT_SEND_CUTLERY')}</span>
          </Col>
        </Row>
      )}
      {isDoNotKnock && (
        <Row className={classes.textDanger}>
          <Col span={24}>
            <span>{t('DO_NOT_RING_BELL')}</span>
          </Col>
        </Row>
      )}
    </Col>
  );
};

export default OrderAddress;
