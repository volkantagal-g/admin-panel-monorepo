import { setPieChartData } from '../../utils';

export const chartOptions = data => ({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    backgroundColor: null,
    type: 'pie',
    reflow: false,
    fontSize: '24px',
  },
  title: { text: '' },
  tooltip: {
    headerFormat: '<span style="font-size: 16px">{point.key}:</span><br/>',
    pointFormat: '<b>{point.y}</b>',
    style: { fontSize: '20px' },
  },
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        format: '{point.y}',
        style: {
          fontSize: '32px',
          color: '#5D3EBC',
        },
      },
      showInLegend: true,
    },
  },
  legend: { itemStyle: { fontSize: '16px' } },
  credits: { enabled: false },
  series: [
    {
      name: '',
      colorByPoint: true,
      colors: ['#5D3EBC', '#FFD10D', '#66E07E', '#54D1E7'],
      data: setPieChartData(data),
    },
  ],
});
