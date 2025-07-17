import { numberFormat } from '@shared/utils/localization';

export const getColumns = ({ t, classes }) => [
  {
    title: t('getirDriveDashboardPage:RENTAL_TYPE'),
    dataIndex: 'key',
    key: 'key',
    align: 'left',
    width: 150,
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
  {
    title: '%',
    dataIndex: 'pct',
    key: 'pct',
    align: 'right',
    width: 36,
    className: classes.smallerPadding,
    render: data => numberFormat({ maxDecimal: 0 }).format(data || 0),
  },
];
