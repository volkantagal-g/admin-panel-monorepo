import { t } from '@shared/i18n';
import { getFormattedLineChartData } from '../../utils';

export const chartOptions = data => {
  const formattedData = getFormattedLineChartData(data);

  const options = {
    chart: { zoomType: 'x' },
    title: { text: t('highLevelDys:LINE_CHART_TITLE') },
    xAxis: { type: 'datetime' },
    yAxis: [{ title: { text: t('highLevelDys:LINE_CHART_Y_AXIS_TITLE') } }],
    series: [
      {
        name: t('highLevelDys:POINT'),
        data: formattedData,
      },
    ],
    credits: { enabled: false },
    plotOptions: {
      line: {
        dataLabels: { enabled: true },
        enableMouseTracking: true,
      },
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:,.2f}',
        },
      },
    },
  };

  return options;
};
