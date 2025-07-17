export const getChartOptions = (data, t) => ({
  chart: { type: 'column' },
  plotOptions: { series: { dataLabels: { enabled: true } } },
  title: { text: t('BRAND') },
  xAxis: { categories: data.map(({ brand }) => t(`DEVICE_BRANDS.${brand}`)) },
  yAxis: { title: { text: '' } },
  series: [{ name: t('IT_ASSET_DASHBOARD.NUMBER_OF_DEVICES'), data: data.map(({ count }) => count) }],
  credits: false,
});
