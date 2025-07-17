import { Col } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import RedirectText from '@shared/components/UI/RedirectText';
import { getLangKey } from '@shared/i18n';
import { financeOrderDetailSelector } from '@app/pages/FinanceOrder/detail/redux/selectors';
import { courierStatuses as COURIER_STATUSES, courierTypes as COURIER_TYPES } from '@shared/shared/constantValues';
import permKey from '@shared/shared/permKey.json';
import TextWithCopy from '../TextWithCopy';
import useStyles from '../styles';

const CourierCard = () => {
  const classes = useStyles();
  const { t } = useTranslation('financeOrderDetailPage');
  const orderDetail = useSelector(financeOrderDetailSelector.getData);

  const courierId = _.get(orderDetail, 'courier.courier.id', '');
  const courierName = _.get(orderDetail, 'courier.courier.name', '') || '-';
  const courierCountryGsmCode = _.get(orderDetail, 'courier.courier.countryGsmCode', '') || '-';
  const courierGsm = _.get(orderDetail, 'courier.courier.gsm', '') || '-';
  const courierPersonalGsm = _.get(orderDetail, 'picker.picker.personalGsm', '') || null;
  const courierType = _.get(orderDetail, 'courier.courier.courierType', '') || '-';
  const courierStatus = _.get(orderDetail, 'courier.courier.status', '') || '-';
  const warehouseName = _.get(orderDetail, 'warehouse.name', '') || '-';
  const warehouseId = _.get(orderDetail, 'warehouse._id', '') || '-';

  const combineCountryCodeAndGsm = (code, gsm) => `${code ? `+${code}` : ''}${gsm}`;

  return (
    <AntCard
      title={t('CARD_INFO.COURIER.TITLE')}
      extra={(
        courierId && (
        <RedirectButtonV2
          text={t('global:DETAIL')}
          to={`/courier/detail/${courierId}`}
          target="_blank"
          size="small"
        />
        )
      )}
    >
      <Col className={classes.colInfo}>
        <Col className={classes.colMain}>
          <span className={classes.col1}>{t('CARD_INFO.COURIER.NAME')}</span>
          <span className={classes.col2}>{courierName}</span>
        </Col>
        <Col className={classes.colMain}>
          <span className={classes.col1}>{t('CARD_INFO.COURIER.GSM')}</span>
          <span className={classes.col2}>{courierGsm ? <TextWithCopy text={combineCountryCodeAndGsm(courierCountryGsmCode, courierGsm)} /> : '-'}</span>
        </Col>
        {courierPersonalGsm && (
        <Col className={classes.colMain}>
          <span className={classes.col1}>{t('CARD_INFO.COURIER.PERSONAL_GSM')}</span>
          <span className={classes.col2}>{courierPersonalGsm}</span>
        </Col>
        )}
        <Col className={classes.colMain}>
          <span className={classes.col1}>{t('CARD_INFO.COURIER.TYPE')}</span>
          <span className={classes.col2}>{COURIER_TYPES[courierType] && COURIER_TYPES[courierType][getLangKey()]}</span>
        </Col>
        <Col className={classes.colMain}>
          <span className={classes.col1}>{t('CARD_INFO.COURIER.STATUS')}</span>
          <span className={classes.col2}>{COURIER_STATUSES[courierStatus] && COURIER_STATUSES[courierStatus][getLangKey()]}</span>
        </Col>
        <Col className={classes.colMain}>
          <span className={classes.col1}>{t('CARD_INFO.COURIER.STORE')}</span>
          <span className={classes.col2}>
            <RedirectText
              text={warehouseName}
              to={`/warehouse/detail/${warehouseId}`}
              permKey={permKey.PAGE_WAREHOUSE_DETAIL}
              target="_blank"
            />
          </span>
        </Col>
      </Col>
    </AntCard>
  );
};

export default CourierCard;
