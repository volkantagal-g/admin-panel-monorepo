import { Tooltip, Typography } from 'antd';

import { numberFormat } from '@shared/utils/localization';

const { Text } = Typography;

export const getColumns = ({ t, classes }) => [
  {
    title: t('getirDriveDashboardPage:CURRENT_CLIENTS'),
    dataIndex: 'key',
    key: 'key',
    align: 'left',
    width: 100,
    className: classes.smallerPadding,
    render: data => {
      if (data === 'AGREEMENT_APPROVED_CLIENTS_SHORT') {
        return (
          <Tooltip title={t('getirDriveDashboardPage:AGREEMENT_APPROVED_CLIENTS')}>
            <Text>{t('getirDriveDashboardPage:AGREEMENT_APPROVED_CLIENTS_SHORT')}</Text>
          </Tooltip>
        );
      }
      return data;
    },
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
