import { Col, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useMemo, useEffect, useRef } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

import { lastSuccessfulDateRangesSelector } from '../../commonRedux/selectors';
import { getChartOptions } from './utils';
import useStyles from './styles';

export default function Charts({
  reducerKey,
  chartViewStatusMap,
  data: chartsData,
}) {
  const classes = useStyles();
  const highChartsRefs = useRef({});
  const { t } = useTranslation('dailySummaryPage');

  const lastSuccessfulDateRanges = useSelector(state => lastSuccessfulDateRangesSelector(state, reducerKey));

  const memoizedChartOptions = useMemo(
    () => getChartOptions({
      chartsData,
      lastSuccessfulDateRanges,
      chartViewStatusMap,
      t,
    }),
    [chartsData, lastSuccessfulDateRanges, chartViewStatusMap, t],
  );

  useEffect(() => {
    memoizedChartOptions.forEach(options => {
      const chart = highChartsRefs.current[options.customKey]?.chart;
      if (options.isPending && !chart?.loadingShown) {
        chart.showLoading();
      }
      else if (!options.isPending && chart?.loadingShown) {
        chart.hideLoading();
      }
    });
  }, [memoizedChartOptions]);

  return (
    <Row gutter={[4, 8]} className={classes.wrapper}>
      {
        memoizedChartOptions.map(options => (
          <Col md={12} sm={12} xs={24} key={options.customKey}>
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
              ref={el => {
                highChartsRefs.current[options.customKey] = el;
              }}
            />
          </Col>
        ))
      }
    </Row>
  );
}
