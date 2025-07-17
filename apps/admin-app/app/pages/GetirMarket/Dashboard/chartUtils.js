export const getCommonChartOptions = () => {
  return {
    chart: {
      type: 'spline',
      zoomType: 'x',
      height: 160,
      spacing: [4, 2, 2, 4],
    },
    title: { text: '' },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        minute: '%H:%M',
        hour: '%H:%M',
        day: '%e %b',
        month: '%e %b',
        year: '%b',
      },
    },
    yAxis: {
      allowDecimals: true,
      title: {
        text: '',
        margin: 4,
      },
      min: 0,
      gridLineColor: '#eaeaea',
    },
    legend: {
      margin: 1,
      itemStyle: {
        color: '#333333',
        cursor: 'pointer',
        fontSize: '11px',
      },
    },
    tooltip: {
      dateTimeLabelFormats: {
        millisecond: '%A, %b %e, %H:%M:%S.%L',
        second: '%A, %b %e, %H:%M:%S',
        minute: '%H:%M,  %e%b',
        hour: '%A, %e %b, %H:%M',
        day: '%e %b, %a',
        week: '%e %b %Y',
        month: '%B %Y',
        year: '%Y',
      },
      style: { fontSize: '12px' },
      crosshairs: [true],
      shared: true,
      useHTML: true,
    },
    credits: { enabled: false },
    plotOptions: {
      spline: {
        lineWidth: 2,
        states: { hover: { lineWidth: 4 } },
        marker: { enabled: false },
      },
    },
    series: [],
  };
};
