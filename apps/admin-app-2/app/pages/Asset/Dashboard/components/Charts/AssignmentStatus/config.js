export const getChartOptions = (data, t) => ({
  chart: { type: 'pie' },
  title: { text: t('ASSIGNMENT_STATUS') },
  series: [{
    name: t('IT_ASSET_DASHBOARD.NUMBER_OF_DEVICES'),
    data: [
      {
        name: t('IT_ASSET_DASHBOARD.ASSIGNED'),
        y: data.assigned,
      },
      {
        name: t('IT_ASSET_DASHBOARD.UN_ASSIGNED'),
        y: data.unassigned,
      },
    ],
  }],
  credits: false,
});
