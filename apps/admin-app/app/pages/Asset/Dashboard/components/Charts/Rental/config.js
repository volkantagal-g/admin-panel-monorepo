export const getChartOptions = (data, t) => ({
  chart: { type: 'pie' },
  title: { text: t('IT_ASSET_DASHBOARD.PURCHASED_OR_RENTED') },
  series: [{
    name: t('IT_ASSET_DASHBOARD.NUMBER_OF_DEVICES'),
    data: [
      {
        name: t('IT_ASSET_DASHBOARD.PURCHASED'),
        y: data.purchased,
      },
      {
        name: t('IT_ASSET_DASHBOARD.RENTED'),
        y: data.rented,
      },
    ],
  }],
  credits: false,
});
