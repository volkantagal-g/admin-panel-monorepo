/* eslint-disable no-inline-styles/no-inline-styles */
import { memo, useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getFinancialThroughputConfig } from './config';
import useStyles from './styles';
import { operationTimeSeriesSelector } from '../../../redux/selectors';
import { CHART_DOMAIN_KEYS, CHART_DOMAIN_LABELS } from '../utils';
import { numberFormatWithoutDecimal } from '@shared/utils/localization';

function FinancialThroughputChart() {
  const { t } = useTranslation('getirMarketDashboardPage');
  const chartRef = useRef();
  const isPending = useSelector(operationTimeSeriesSelector.getIsPending);
  const data = useSelector(operationTimeSeriesSelector.getFinancialThroughput);
  const classes = useStyles();
  useEffect(() => {
    chartRef.current.chart.showLoading();
    if (!isPending) {
      chartRef.current.chart.hideLoading();
    }
  }, [isPending]);
  const chartOptions = getFinancialThroughputConfig(data, t);

  const LABELS = CHART_DOMAIN_LABELS(t);

  return (
    <div className={classes.chart}>
      <div key="1" className={classes.header}>
        <span>
          {LABELS[0]}: <b>{numberFormatWithoutDecimal.format(data?.[CHART_DOMAIN_KEYS[0]]?.avg || 0)}</b>
        </span>
        <span>
          {LABELS[1]}: <b>{numberFormatWithoutDecimal.format(data?.[CHART_DOMAIN_KEYS[1]]?.avg || 0)}</b>
        </span>
        <span>
          {LABELS[2]}: <b>{numberFormatWithoutDecimal.format(data?.[CHART_DOMAIN_KEYS[2]]?.avg || 0)}</b>
        </span>
        <span>
          {LABELS[3]}: <b>{numberFormatWithoutDecimal.format(data?.[CHART_DOMAIN_KEYS[3]]?.avg || 0)}</b>
        </span>
      </div>
      <HighchartsReact key="2" highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    </div>
  );
}

export default memo(FinancialThroughputChart);
