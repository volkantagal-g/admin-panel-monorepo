export const tableColumns = ({ t }) => [
  {
    title: t('assetPage:NAME'),
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: name => name,
  },
  {
    title: t('assetPage:DEVICE_TYPE'),
    dataIndex: 'deviceType',
    key: 'deviceType',
    width: 150,
    render: deviceType => t(`assetPage:ASSET_TYPES.${deviceType?.toString()}`),
  },
];
