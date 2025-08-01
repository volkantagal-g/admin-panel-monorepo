import { useSelector } from 'react-redux';
import { Typography, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { GETIR_VOYAGER_DOMAIN_TYPE } from '@shared/shared/constants';
import { getFormattedOrderData } from '../../redux/selectors';
import useStyles from './styles';

const Stats = ({ domainType }) => {
  const { t } = useTranslation('activeOrdersForManagementPage');
  const classes = useStyles();

  const activeOrderCount = useSelector(getFormattedOrderData.getCount);
  const totalKuzeydenCarboyCount = useSelector(getFormattedOrderData.getTotalKuzeydenCarboyCount);
  const isActiveOrderCountPending = useSelector(getFormattedOrderData.getIsPending);
  const shownActiveOrderCount = isActiveOrderCountPending ? '?' : activeOrderCount;

  const activeOrderCountTooltipTitle = (
    <>
      {t('ACTIVE_ORDER_COUNT')}
      <br />
      {t('TOOLTIP_STATS_FILTER_EXPLANATION')}
    </>
  );
  const activeOrderTotalKuzeydenCarboyCountTooltipTitle = (
    <>
      {t('TOTAL_KUZEYDEN_CARBOY_COUNT')}
    </>
  );

  return (
    <Typography.Title level={4} className={classes.stats}>
      <Tooltip title={activeOrderCountTooltipTitle}>
        {`${t('ACTIVE_ORDER_COUNT_SHORT')}: ${shownActiveOrderCount}`}
      </Tooltip>
      {
        domainType === GETIR_VOYAGER_DOMAIN_TYPE &&
        (
          <Tooltip title={activeOrderTotalKuzeydenCarboyCountTooltipTitle}>
            ({totalKuzeydenCarboyCount})
          </Tooltip>
        )
      }
    </Typography.Title>
  );
};

export default Stats;
