export const getChartOptions = (data, t) => ({
  chart: { type: 'pie' },
  title: { text: t('IT_ASSET_DASHBOARD.MDM_INSTALLATION_STATUS') },
  series: [{
    name: t('IT_ASSET_DASHBOARD.NUMBER_OF_DEVICES'),
    data: [
      {
        name: t('IT_ASSET_DASHBOARD.MDM'),
        y: data.mdm,
      },
      {
        name: t('IT_ASSET_DASHBOARD.NO_MDM'),
        y: data.noMDM,
      },
    ],
  }],
  credits: false,
});
