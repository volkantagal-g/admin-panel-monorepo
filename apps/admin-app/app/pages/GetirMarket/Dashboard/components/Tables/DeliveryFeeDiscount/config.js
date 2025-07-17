import { Typography } from 'antd';

import { numberFormat } from '@shared/utils/localization';

const { Text } = Typography;

export const columns = (t, classes) => {
  return [
    {
      title: <Text className={classes.textBold}>{t('getirMarketDashboardPage:DELIVERY_FEE_DISCOUNT_REASON')}</Text>,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: <Text className={classes.textBold}>{t('global:COUNT')}</Text>,
      dataIndex: 'count',
      key: 'count',
      align: 'right',
      sorter: (a, b) => a.count - b.count,
      width: 58,
      render: data => {
        if (typeof data === 'number') return numberFormat({ maxDecimal: 0 }).format(data || 0);
        return data;
      },
    },
    {
      title: <Text className={classes.textBold}>%</Text>,
      dataIndex: 'ratio',
      key: 'ratio',
      align: 'right',
      width: 24,
      render: data => {
        if (typeof data === 'number') return numberFormat({ maxDecimal: 0 }).format(data || 0);
        return data;
      },
    },
  ];
};
