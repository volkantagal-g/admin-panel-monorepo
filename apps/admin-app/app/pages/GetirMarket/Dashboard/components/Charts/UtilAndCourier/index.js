import { memo, useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';

import { Button } from 'antd';

import { getUtilAndCourierConfig } from './config';
import useStyles from './styles';
import { operationTimeSeriesSelector } from '../../../redux/selectors';
import { CHART_DOMAIN_KEYS, CHART_DOMAIN_LABELS } from '../utils';
import { numberFormatWithoutDecimal } from '@shared/utils/localization';

import AnalyticsService from '@shared/services/analytics';
import { MARKET_DASHBOARD_EVENTS } from '../../../mixPanelEvents';

function UtilAndCourierChart() {
  const chartRef = useRef();
  const { t } = useTranslation('getirMarketDashboardPage');
  const [isUtil, setIsUtil] = useState(true);
  const isPending = useSelector(operationTimeSeriesSelector.getIsPending);
  const data = useSelector(operationTimeSeriesSelector.getUtilsAndCouriers);
  const classes = useStyles();

  useEffect(() => {
    chartRef.current.chart.showLoading();
    if (!isPending) {
      chartRef.current.chart.hideLoading();
    }
  }, [isPending]);

  const handleIsUtil = value => () => {
    setIsUtil(value);
    AnalyticsService.track(
      MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.EVENT_NAME,
      { button: value ? MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.CHART_UTILIZATION : MARKET_DASHBOARD_EVENTS.BUTTON_CLICKED.CHART_COURIER },
    );
  };

  const selectedChartData = isUtil ? data?.utils : data?.couriers;
  const chartOptions = getUtilAndCourierConfig(selectedChartData, isUtil, t);

  return (
    <div className={classes.chart}>
      <div key="1" className={classes.header}>
        <span>
          {CHART_DOMAIN_LABELS(t)[0]}: <b>{numberFormatWithoutDecimal.format(selectedChartData?.[CHART_DOMAIN_KEYS[0]]?.avg || 0)}</b>
        </span>
        <span>
          {CHART_DOMAIN_LABELS(t)[1]}: <b>{numberFormatWithoutDecimal.format(selectedChartData?.[CHART_DOMAIN_KEYS[1]]?.avg || 0)}</b>
        </span>
        <span>
          {CHART_DOMAIN_LABELS(t)[2]}: <b>{numberFormatWithoutDecimal.format(selectedChartData?.[CHART_DOMAIN_KEYS[2]]?.avg || 0)}</b>
        </span>
        <span>
          {CHART_DOMAIN_LABELS(t)[3]}: <b>{numberFormatWithoutDecimal.format(selectedChartData?.[CHART_DOMAIN_KEYS[3]]?.avg || 0)}</b>
        </span>
        <div className={classes.toggleButtons}>
          <Button
            onClick={handleIsUtil(true)}
            size="small"
            type={isUtil ? 'primary' : 'default'}
          >
            {t('UTILIZATION_SHORT')}
          </Button>
          <Button
            onClick={handleIsUtil(false)}
            size="small"
            type={!isUtil ? 'primary' : 'default'}
          >
            {t('COURIER_SHORT')}
          </Button>
        </div>
      </div>
      <HighchartsReact key="2" highcharts={Highcharts} options={chartOptions} ref={chartRef} />
    </div>
  );
}

export default memo(UtilAndCourierChart);
