import { Typography } from 'antd';

export const generateTableColumns = ({ classes }, t) => {
  const constantRules = [
    {
      title: <Typography.Text strong>{t('global:WAREHOUSE')}</Typography.Text>,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
      className: classes.cell,
    },
    {
      title: <Typography.Text strong>{t('getirMarketLiveMapPage:PLANNED')}</Typography.Text>,
      dataIndex: 'planned',
      key: 'planned',
      width: 46,
      className: [classes.cell, classes.alignRight],
    },
    {
      title: <Typography.Text strong>{t('getirMarketLiveMapPage:CURRENT')}</Typography.Text>,
      dataIndex: 'total',
      key: 'totalCourier',
      width: 44,
      className: [classes.cell, classes.alignRight],
    },
  ];

  return constantRules;
};
