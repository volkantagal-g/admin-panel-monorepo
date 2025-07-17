import { Typography } from 'antd';

import { numberFormat } from '@shared/utils/localization';

const { Text } = Typography;

export const getColumns = ({ t }) => [
  {
    title: t('BASKET'),
    dataIndex: 'key',
    key: 'key',
    align: 'right',
    width: 46,
  },
  {
    title: t('ORDER#'),
    dataIndex: 'value',
    key: 'value',
    align: 'right',
    render: data => numberFormat({ maxDecimal: 0 }).format(data || 0),
  },
  {
    title: '%',
    dataIndex: 'percentage',
    key: 'percentage',
    align: 'right',
    width: 24,
    render: data => <Text strong>{data}</Text>,
  },
];
