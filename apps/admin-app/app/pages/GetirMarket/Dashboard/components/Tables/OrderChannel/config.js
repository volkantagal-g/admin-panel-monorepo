import { Typography } from 'antd';

import { numberFormat } from '@shared/utils/localization';

const { Text } = Typography;

export const columns = (t, classes) => {
  return [
    {
      title: <Text className={classes.textBold}>{t('getirMarketDashboardPage:ORDER_CHANNEL')}</Text>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <Text className={classes.textBold}>#</Text>,
      dataIndex: 'orderCount',
      key: 'orderCount',
      align: 'right',
      width: 58,
      render: data => numberFormat({ maxDecimal: 0 }).format(data || 0),
    },
    {
      title: <Text className={classes.textBold}>%</Text>,
      dataIndex: 'orderRatio',
      key: 'orderRatio',
      align: 'right',
      width: 24,
      render: data => numberFormat({ maxDecimal: 0 }).format(data || 0),
    },
  ];
};
