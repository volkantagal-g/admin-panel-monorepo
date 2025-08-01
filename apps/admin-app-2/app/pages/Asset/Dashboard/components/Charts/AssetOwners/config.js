export const getChartOptions = (data, t) => ({
  chart: { type: 'pie' },
  title: { text: t('IT_ASSET_DASHBOARD.ASSET_OWNER_CHART_HEADING') },
  series: [{
    name: t('IT_ASSET_DASHBOARD.NUMBER_OF_EMPLOYEES'),
    data: [
      {
        name: t('IT_ASSET_DASHBOARD.ASSET_OWNERS'),
        y: data.owners,
      },
      {
        name: t('IT_ASSET_DASHBOARD.NON_ASSET_OWNERS'),
        y: data.nonOwners,
      },
    ],
  }],
  credits: false,
});
