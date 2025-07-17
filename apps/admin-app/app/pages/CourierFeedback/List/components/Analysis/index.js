import { useRef, memo, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { Empty } from 'antd';

import AntCard from '@shared/components/UI/AntCard';
import { getChartOptions } from './config';
import { courierFeedbackChartDataSelector } from '../../redux/selectors';
import useStyles from './styles';

const FeedbackAnalysis = ({ data }) => {
  const { t } = useTranslation('courierFeedbackPage');
  const classes = useStyles();
  const chartRef = useRef();
  const isChartDataPending = useSelector(courierFeedbackChartDataSelector.getIsPending);

  const chartOptions = useMemo(() => {
    if (data) return getChartOptions(data, t);
    return {};
  }, [data, t]);

  useEffect(() => {
    chartRef?.current?.chart.showLoading();
    if (!isChartDataPending) {
      chartRef?.current?.chart.hideLoading();
    }
  }, [isChartDataPending]);

  return (
    <AntCard
      className={classes.cardHeader}
      title={<span className={classes.cardTitle}>{t('FEEDBACK_ANALYSIS')}</span>}
      bordered={false}
    >
      {!isChartDataPending && data.length === 0 ? (
        <div className={classes.noDataContainer}><Empty /></div>
      ) : (
        <HighchartsReact
          key="feedbackAnalysisChart"
          highcharts={Highcharts}
          options={chartOptions}
          ref={chartRef}
        />

      )}
    </AntCard>
  );
};

export default memo(FeedbackAnalysis);
