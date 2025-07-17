import { Tooltip, Typography } from 'antd';

import { numberFormat } from '@shared/utils/localization';

const { Text } = Typography;
export const getColumns = (classes, t) => [
  {
    title: t('getirMarketDashboardPage:ACTION'),
    key: 'title',
    align: 'left',
    className: classes.smallerPadding,
    render: data => {
      if (data.tooltip) {
        return (
          <Tooltip title={t(data.tooltip)}>
            <Text> {t(data.title)}</Text>
          </Tooltip>
        );
      }
      return t(data.title);
    },
  },
  {
    title: '#',
    dataIndex: 'data',
    key: 'data',
    width: 50,
    className: [classes.smallerPadding, classes.bold].join(' '),
    align: 'right',
    render: data => numberFormat({ maxDecimal: 0 }).format(data),
  },
];
