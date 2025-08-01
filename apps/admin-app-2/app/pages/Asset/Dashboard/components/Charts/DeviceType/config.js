export const getChartOptions = (data, t) => ({
  chart: { type: 'column' },
  plotOptions: { series: { dataLabels: { enabled: true } } },
  title: { text: t('DEVICE_TYPE') },
  xAxis: { categories: data.map(({ deviceType }) => t(`ASSET_TYPES.${deviceType}`)) },
  yAxis: { title: { text: '' } },
  series: [{ name: t('IT_ASSET_DASHBOARD.NUMBER_OF_DEVICES'), data: data.map(({ count }) => count) }],
  credits: false,
});
