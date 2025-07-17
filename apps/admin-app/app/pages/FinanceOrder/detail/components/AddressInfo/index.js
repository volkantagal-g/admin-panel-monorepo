import { Col, Row } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { financeOrderDetailSelector } from '@app/pages/FinanceOrder/detail/redux/selectors';
import useStyles from './styles';

const AddressInfo = () => {
  const classes = useStyles();
  const { t } = useTranslation('financeOrderDetailPage');
  const isVendorAgt = useSelector(financeOrderDetailSelector.getIsVendorAgt);
  const orderDetail = useSelector(financeOrderDetailSelector.getData);

  const deliveryAddressName = _.get(orderDetail, 'deliveryInformation.address.name', '') || '-';
  const deliveryAddress = isVendorAgt ? orderDetail?.address || '-' : _.get(orderDetail, 'deliveryInformation.address.address', '') || '-';
  const deliveryAddressAptNo = _.get(orderDetail, 'deliveryInformation.address.aptNo', '') || '-';
  const deliveryAddressFloor = _.get(orderDetail, 'deliveryInformation.address.floor', '') || '-';
  const deliveryAddressDoorNo = _.get(orderDetail, 'deliveryInformation.address.doorNo', '') || '-';
  const deliveryAddressDirections = _.get(orderDetail, 'deliveryInformation.address.description', '') || '-';

  return (
    <Col className={classes.colInfo}>
      {
        !isVendorAgt && (
        <Row>
          <Col span={6}>
            <span>{t('ADDRESS_INFO.NAME')}</span>
          </Col>
          <Col span={18}>
            <span>: {deliveryAddressName}</span>
          </Col>
        </Row>
        )
      }
      <Row>
        <Col span={6}>
          <span>{t('ADDRESS_INFO.ADDRESS')}</span>
        </Col>
        <Col span={18}>
          <span>: {deliveryAddress}</span>
        </Col>
      </Row>
      {
        !isVendorAgt && (
          <>
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
          </>
        )
      }
    </Col>
  );
};

export { AddressInfo };
