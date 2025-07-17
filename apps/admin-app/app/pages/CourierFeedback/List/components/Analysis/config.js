export const getChartOptions = (data, t) => {
  return {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: { text: '' },
    credits: { enabled: false },
    tooltip: { pointFormat: `<b>{point.percentage:.1f}% - {point.y} ${t('FEEDBACKS')}</b>` },
    accessibility: { point: { valueSuffix: '%' } },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: { enabled: false },
        showInLegend: true,
      },
    },
    series: [{
      colorByPoint: true,
      data: data.map(feedback => ({ name: feedback.label, y: feedback.count })),
    }],
  };
};
