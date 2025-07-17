export const getChartOptions = (data, t) => ({
  chart: { type: 'bar' },
  plotOptions: { series: { dataLabels: { enabled: true } } },
  title: { text: t('DEVICE_STATUS') },
  xAxis: { categories: data.map(({ deviceStatus }) => t(`ASSET_DEVICE_STATUSES.${deviceStatus}`)) },
  yAxis: { title: { text: '' } },
  series: [{ name: t('IT_ASSET_DASHBOARD.NUMBER_OF_DEVICES'), data: data.map(({ count }) => count) }],
  credits: false,
});
