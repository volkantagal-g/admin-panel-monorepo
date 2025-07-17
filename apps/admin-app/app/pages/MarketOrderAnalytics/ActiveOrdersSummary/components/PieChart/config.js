/**
 *
 * @param {Boolean} showTotal
 * @param {Object} customChartOptions
 * @callback onPointClick, (pointFieldName, pointFieldValue) => void
 * @returns
 */
export const getOptions = ({ customChartOptions, onPointClick }) => ({
  chart: {
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false,
    type: 'pie',
    width: 180,
    height: 260,
    marginTop: customChartOptions.chartMarginTop || 30,
    borderColor: customChartOptions.borderColor || '#7849f7',
    borderWidth: customChartOptions.borderWidth || 1,
    borderRadius: customChartOptions.borderRadius || 3,
  },
  title: { text: customChartOptions.title, style: { fontSize: '16px' } },
  tooltip: { pointFormat: '<b>{point.percentage:.1f}%</b>' },
  accessibility: { point: { valueSuffix: '%' } },
  colors: ['#7849f7', '#7ad2de', '#ee7f7f', '#e4d354', '#2b908f', '#0051ff', '#e437d5'],
  plotOptions: {
    pie: {
      allowPointSelect: true,
      cursor: 'pointer',
      dataLabels: { enabled: true, format: '{point.percentage:.1f}%' },
      showInLegend: true,
      size: 88,
      point: {
        events: {
          click(event) {
            // prevent default toggle behaviour
            event.preventDefault();
            if (onPointClick) {
              onPointClick(customChartOptions.fieldName, this.filterValue);
            }
          },
          legendItemClick(event) {
            event.preventDefault();
            if (onPointClick) {
              onPointClick(customChartOptions.fieldName, this.filterValue);
            }
          },
        },
      },
    },
  },
  credits: { enabled: false },
  legend: {
    itemStyle: { fontSize: customChartOptions.legendFont || '12px' },
    maxHeight: customChartOptions.legendMaxHeight || 70,
    itemMarginTop: 1,
    alignColumns: false,
    y: 10,
  },
  series: [
    {
      colorByPoint: true,
      innerSize: 0,
      dataLabels: {
        connectorWidth: 0,
        connectorPadding: -20,
        distance: 15,
      },
      ...customChartOptions.seriesOption,
    },
  ],
});
