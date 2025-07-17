/* eslint-disable no-inline-styles/no-inline-styles */
import { memo, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Tooltip } from 'antd';

import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { getOrderChartConfig } from './config';
import useStyles from './styles';
import { orderTimeSeriesSelector } from '../../../redux/selectors';
import {
  numberFormatWithoutDecimal,
  numberFormatWithOneDecimal,
  percentFormatWithoutDecimal,
  percentFormatWithTwoDecimal,
  numberFormatterWithSuffix,
} from '@shared/utils/localization';

function OrderChart() {
  const chartRef = useRef();
  const { t } = useTranslation('getirMarketDashboardPage');
  const isPending = useSelector(orderTimeSeriesSelector.getIsPending);
  const data = useSelector(orderTimeSeriesSelector.getSelectedDomainTypeData);
  const classes = useStyles();
  useEffect(() => {
    chartRef.current.chart.showLoading();
    if (!isPending) {
      chartRef.current.chart.hideLoading();
    }
  }, [isPending]);
  const chartOptions = getOrderChartConfig(data, t);

  const missedOrderTooltipText = (
    `${t('MISSED_ORDER')}: (${t('MISSED_ORDER/ORDER')}) - ${numberFormatWithoutDecimal.format(data.totals.missedOrder)}
    (${percentFormatWithTwoDecimal.format(data.totals.missedRatio || 0)})`
  );

  return (
    <div className={classes.orderChart}>
      <div key="1">
        <div className={classes.header}>
          <Tooltip title={`${t('DEMAND')}: ${numberFormatWithoutDecimal.format(data.totals.demandTotal)}`}>
            {t('DEMAND_SHORT')}:<b>{numberFormatterWithSuffix(data.totals.demandTotal, 0)}</b>
          </Tooltip>
          <Tooltip title={`${t('ORDER')}: ${numberFormatWithoutDecimal.format(data.totals.orderTotal)}`}>
            {t('ORDER_SHORT')}:<b>{numberFormatterWithSuffix(data.totals.orderTotal, 0)}</b>
          </Tooltip>
          <Tooltip
            title={missedOrderTooltipText}
          >
            {t('MISSED_ORDER_SHORT')}:
            <b>
              {numberFormatterWithSuffix(data.totals.missedOrder)}
              ({percentFormatWithoutDecimal.format(data.totals.missedRatio || 0)})
            </b>
          </Tooltip>
          <Tooltip title={t('COVERAGE_RATIO')}>
            {t('COVERAGE_RATIO_SHORT')}:<b>{percentFormatWithoutDecimal.format(data.totals.coverageRatio || 0)}</b>
          </Tooltip>
          <Tooltip title={`${t('BATCHED')}: ${numberFormatWithoutDecimal.format(data.totals.batchedTotal)}`}>
            {t('BATCHED_SHORT')}:<b>{numberFormatterWithSuffix(data.totals.batchedTotal, 0)}</b>
          </Tooltip>
          <Tooltip title={t('ORDER_PER_TRIP')}>
            {t('ORDER_PER_TRIP_SHORT')}: <b>{numberFormatWithOneDecimal.format(data.totals.orderPerTrip || 0)}</b>
          </Tooltip>
          <Tooltip title={t('QUEUE')}>
            {t('QUEUE_SHORT')}:<b>{percentFormatWithoutDecimal.format(data.totals.queuedOrderRatio || 0)}</b>
          </Tooltip>
        </div>
      </div>
      <HighchartsReact key="2" highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    </div>
  );
}

export default memo(OrderChart);
