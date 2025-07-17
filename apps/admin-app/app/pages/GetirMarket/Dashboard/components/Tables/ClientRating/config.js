import { Typography } from 'antd';

import { numberFormat } from '@shared/utils/localization';

const { Text } = Typography;

export const getColumns = ({ t, classes }) => [
  {
    title: t('RATE'),
    dataIndex: 'rate',
    key: 'rate',
    className: classes.smallerPadding,
    align: 'right',
    width: 46,
    render: (rate, { key }) => {
      if (key) {
        return (
          <Text strong>
            {rate}
          </Text>
        );
      }

      return rate;
    },
  },
  {
    title: t('CLIENT_SHORT'),
    dataIndex: 'orderCount',
    key: 'orderCount',
    align: 'right',
    className: classes.smallerPadding,
    render: data => data && numberFormat({ maxDecimal: 0 }).format(data || 0),
  },
  {
    title: '%',
    dataIndex: 'percentage',
    key: 'percentage',
    align: 'right',
    width: 24,
    className: classes.smallerPadding,
    render: data => (
      <Text strong>
        {data}
      </Text>
    ),
  },
];
