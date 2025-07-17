import { t } from '@shared/i18n';
import { getFormattedBarChartData } from '../../utils';

export const chartOptions = data => {
  const { letters, barChartData } = getFormattedBarChartData(data);

  const options = {
    chart: { type: 'column' },
    tooltip: {
      outside: true,
      useHTML: true,
      formatter() {
        return `<div><span style="color:${this.point.color}">\u25CF</span>&nbsp<b>${this.point.series.name}: ${this.point.y.toFixed(2)}%</b></div>`;
      },
    },
    xAxis: {
      categories: letters,
      crosshair: true,
    },
    yAxis: { title: { text: t('highLevelDys:BAR_YAXIS_TITLE') } },
    title: { text: t('highLevelDys:BAR_CHART_TITLE') },
    series: barChartData,
    credits: { enabled: false },
    plotOptions: {
      line: {
        dataLabels: { enabled: true },
        enableMouseTracking: true,
      },
      series: {
        groupPadding: 0.1,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          allowOverlap: true,
          format: '{point.y:,.2f}%',
        },
      },
    },
  };

  return options;
};
