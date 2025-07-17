import { Typography } from 'antd';

const { Text } = Typography;

export const columns = (t, classes) => {
  return [
    {
      title: <Text className={classes.textBold}>{t('getirMarketDashboardPage:CARD_GROUPS')}</Text>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <Text className={classes.textBold}>#</Text>,
      dataIndex: 'count',
      key: 'count',
      align: 'right',
      width: 58,
    },
    {
      title: <Text className={classes.textBold}>%</Text>,
      dataIndex: 'ratio',
      key: 'ratio',
      align: 'right',
      width: 24,
    },
  ];
};
