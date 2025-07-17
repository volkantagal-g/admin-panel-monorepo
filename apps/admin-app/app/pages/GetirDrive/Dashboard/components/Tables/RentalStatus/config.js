import { numberFormat } from '@shared/utils/localization';

export const getColumns = ({ t, classes }) => [
  {
    title: t('getirDriveDashboardPage:RENTAL_STATUS'),
    dataIndex: 'key',
    key: 'key',
    align: 'left',
    width: 150,
    className: classes.smallerPadding,
  },
  {
    title: t('TOTAL'),
    dataIndex: 'value',
    key: 'value',
    align: 'right',
    className: classes.smallerPadding,
    render: data => numberFormat({ maxDecimal: 0 }).format(data || 0),
  },
];
