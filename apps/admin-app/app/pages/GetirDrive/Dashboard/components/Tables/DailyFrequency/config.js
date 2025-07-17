import { Typography, Tooltip } from 'antd';

import { numberFormat } from '@shared/utils/localization';

const { Text } = Typography;

export const getColumns = ({ t, classes }) => [
  {
    title: (
      <Tooltip title={t('getirDriveDashboardPage:DAILY_FREQUENCY')}>
        <Text>{t('getirDriveDashboardPage:DAILY_FREQUENCY_SHORT')}</Text>
      </Tooltip>
    ),
    dataIndex: 'key',
    key: 'key',
    align: 'left',
    width: 110,
    className: classes.smallerPadding,
  },
  {
    title: '#',
    dataIndex: 'value',
    key: 'value',
    align: 'right',
    className: classes.smallerPadding,
    render: data => numberFormat({ maxDecimal: 0 }).format(data || 0),
  },
];
