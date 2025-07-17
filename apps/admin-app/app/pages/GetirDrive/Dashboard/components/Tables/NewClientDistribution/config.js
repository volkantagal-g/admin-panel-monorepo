import { numberFormat } from '@shared/utils/localization';

export const getColumns = ({ t, classes }) => [
  {
    title: t('getirDriveDashboardPage:NEW_CLIENTS'),
    dataIndex: 'key',
    key: 'key',
    align: 'left',
    width: 100,
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
