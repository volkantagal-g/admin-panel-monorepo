import { Col } from 'antd';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import AntCard from '@shared/components/UI/AntCard';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import { getLangKey } from '@shared/i18n';
import { financeOrderDetailSelector } from '@app/pages/FinanceOrder/detail/redux/selectors';
import useStyles from '../styles';

const WarehouseCard = () => {
  const classes = useStyles();
  const { t } = useTranslation('financeOrderDetailPage');
  const orderDetail = useSelector(financeOrderDetailSelector.getData);

  const warehouseId = _.get(orderDetail, 'warehouse._id', '') || '-';
  const warehouseName = _.get(orderDetail, 'warehouse.name', '') || '-';
  const warehouseCityName = _.get(orderDetail, 'warehouse.city.name', '') || '-';
  const warehouseAddress = _.get(orderDetail, 'warehouse.address', '') || '-';
  const estimatedDeliveryDuration = _.get(orderDetail, 'deliveryInformation.algorithmInfo.calculatedDeliveryDuration', '') || null;

  return (
    <AntCard
      title={t('CARD_INFO.WAREHOUSE.TITLE')}
      className={classes.FinanceInfo}
      extra={(
        <RedirectButtonV2
          text={t('global:DETAIL')}
          to={`/warehouse/detail/${warehouseId}`}
          target="_blank"
          size="small"
        />
      )}
    >
      <Col className={classes.colInfo}>
        <Col className={classes.colMain}>
          <span className={classes.col1}>{t('CARD_INFO.WAREHOUSE.NAME')}</span>
          <span className={classes.col2}>{warehouseName}</span>
        </Col>
        <Col className={classes.colMain}>
          <span className={classes.col1}>{t('CARD_INFO.WAREHOUSE.CITY')}</span>
          <span className={classes.col2}>{warehouseCityName[getLangKey()]}</span>
        </Col>
        <Col className={`${classes.colMain} ${classes.alignStart}`}>
          <span className={classes.col1}>{t('CARD_INFO.WAREHOUSE.ADDRESS')}</span>
          <span className={classes.col2}>{warehouseAddress}</span>
        </Col>
        {estimatedDeliveryDuration && (
        <Col className={classes.colMain}>
          <span className={classes.col1}>
            {t('CARD_INFO.WAREHOUSE.IG_DURATION')}
          </span>
          <span className={classes.col2}>
            {estimatedDeliveryDuration?.toFixed(0)}
          </span>
        </Col>
        )}
      </Col>
    </AntCard>
  );
};

export default WarehouseCard;
