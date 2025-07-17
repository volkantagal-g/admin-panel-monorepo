import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';

import { orderDetailSelector } from '../../redux/selectors';
import useStyles from '@app/pages/ArtisanOrder/Detail/components/orderAdress/styles';

const OrderAdress = () => {
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const classes = useStyles();
  const { t } = useTranslation('artisanOrderPage');

  const deliveryAddressName = _.get(orderDetail, 'deliveryAddress.name', '');
  const deliveryAddress = _.get(orderDetail, 'deliveryAddress.address', '');
  const deliveryAddressAptNo = _.get(orderDetail, 'deliveryAddress.aptNo', '');
  const deliveryAddressFloor = _.get(orderDetail, 'deliveryAddress.floor', '');
  const deliveryAddressDoorNo = _.get(orderDetail, 'deliveryAddress.doorNo', '');
  const deliveryAddressDirections = _.get(orderDetail, 'deliveryAddress.description', '');
  const deliveryAddressClientNote = _.get(orderDetail, 'clientNote', '');

  return (
    <Col className={classes.colInfo}>
      <Row>
        <Col span={6}>
          <span className={classes.title}>{t('ADDRESS_INFO.NAME')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddressName}</span>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <span className={classes.title}>{t('ADDRESS_INFO.ADDRESS')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddress}</span>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <span className={classes.title}>{t('ADDRESS_INFO.APARTMENT')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddressAptNo}</span>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <span className={classes.title}>{t('ADDRESS_INFO.DOOR')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddressFloor}</span>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <span className={classes.title}>{t('ADDRESS_INFO.DOOR_NO')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddressDoorNo}</span>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <span className={classes.title}>{t('ADDRESS_INFO.ADDRESS_DIRECTION')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddressDirections}</span>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <span className={classes.title}>{t('ADDRESS_INFO.CLIENT_NOTE')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddressClientNote}</span>
        </Col>
      </Row>
    </Col>
  );
};

export default OrderAdress;
