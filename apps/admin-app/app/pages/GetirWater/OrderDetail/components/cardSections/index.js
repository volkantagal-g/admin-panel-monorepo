import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import { orderDetailSelector } from '../../redux/selectors';
import AntCard from '@shared/components/UI/AntCard';
import Spinner from '@shared/components/Spinner';
import { ENVIRONMENT } from '@shared/config';

import useStyles from './styles';

const CardSections = () => {
  const classes = useStyles();
  const orderDetail = useSelector(orderDetailSelector.getData) || {};
  const isPending = useSelector(orderDetailSelector.getIsPending);

  const { t } = useTranslation('waterOrderPage');

  const clientName = _.get(orderDetail, 'customerName', '');
  const clientGsm = _.get(orderDetail, 'customerPhone', '');
  const clientId = _.get(orderDetail, 'customerId', '');
  const clientTotalWaterOrderCount = _.get(orderDetail, 'customerWaterOrderCount', '');
  const clientTotalGetir10OrderCount = '';

  const vendorName = _.get(orderDetail, 'vendorName', '');
  const vendorPhone = _.get(orderDetail, 'vendorPhone', '');
  const vendorCity = _.get(orderDetail, 'vendorCity', '');
  const vendorOrderCount = _.get(orderDetail, 'vendorOrderCount', '');
  const vendorMinDeliveryTime = _.get(orderDetail, 'vendorMinDeliveryTime', '');
  const vendorMaxDeliveryTime = _.get(orderDetail, 'vendorMaxDeliveryTime', '');
  const vendorId = _.get(orderDetail, 'vendorId', '');
  if (isPending) {
    return <Spinner />;
  }
  return (
    <Row>
      <Col xs={24} sm={24} md={24} lg={24} xl={8}>
        <AntCard
          title={t('CARD_INFO.CLIENT.TITLE')}
          className={classes.customerInfo}
          extra={(
            <a className={classes.detailButton} href={`/client/detail/${clientId}`}>
              {t('global:DETAIL')}
            </a>
          )}
        >
          <Col className={classes.colInfo}>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.CLIENT.NAME')}</span>
              <span className={classes.col2}>{clientName}</span>
            </Col>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.CLIENT.GSM')}</span>
              <span className={classes.col2}>{clientGsm}</span>
            </Col>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.CLIENT.TOTAL_ORDER')}</span>
              <span className={classes.col2}>{clientTotalWaterOrderCount}</span>
            </Col>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.CLIENT.G10_ORDER')}</span>
              <span className={classes.col2}>{clientTotalGetir10OrderCount}</span>
            </Col>
          </Col>
        </AntCard>
      </Col>
      <Col className={classes.courierInfo} xs={24} sm={24} md={24} lg={24} xl={8}>
        <AntCard title={t('CARD_INFO.COURIER.TITLE')}>
          <Col className={classes.colInfo}>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.COURIER.NAME')}</span>
              <span className={classes.col2}>{t('CARD_INFO.COURIER.VENDOR_COURIER')}</span>
            </Col>
          </Col>
        </AntCard>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={8}>
        <AntCard
          title={t('CARD_INFO.VENDOR.TITLE')}
          className={classes.ArtisanInfo}
          extra={(
            <a className={classes.detailButton} href={`${ENVIRONMENT.REACT_APP_WATER_PANEL_URL}/${vendorId}`}>
              {t('global:DETAIL')}
            </a>
          )}
        >
          <Col className={classes.colInfo}>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.VENDOR.NAME')}</span>
              <span className={classes.col2}>{vendorName}</span>
            </Col>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.VENDOR.GSM')}</span>
              <span className={classes.col2}>{vendorPhone}</span>
            </Col>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.VENDOR.CITY')}</span>
              <span className={classes.col2}>{vendorCity}</span>
            </Col>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.VENDOR.COUNT')}</span>
              <span className={classes.col2}>{vendorOrderCount}</span>
            </Col>
            <Col className={classes.colMain}>
              <span className={classes.col1}>{t('CARD_INFO.VENDOR.MINMAX')}</span>
              <span className={classes.col2}>{`${vendorMinDeliveryTime} - ${vendorMaxDeliveryTime}`}</span>
            </Col>
          </Col>
        </AntCard>
      </Col>
    </Row>
  );
};

export default CardSections;
