import { Typography } from 'antd';

import { numberFormat } from '@shared/utils/localization';

const { Text } = Typography;

export const getColumns = ({ t, classes, parentClasses, dateRangeDayCount }) => [
  {
    title: '#',
    dataIndex: 'key',
    key: 'key',
    align: 'left',
    width: 75,
    className: classes.smallerPadding,
  },
  {
    title: t('getirDriveDashboardPage:RENT'),
    dataIndex: 'rentalCount',
    key: 'rentalCount',
    align: 'right',
    className: classes.smallerPadding,
    render: data => numberFormat({ maxDecimal: 0 }).format(data || 0),
  },
  ...(
    dateRangeDayCount > 1 ?
      [
        {
          title: t('getirDriveDashboardPage:RENT_AVG'),
          dataIndex: 'rentalCountAvg',
          key: 'rentalCountAvg',
          align: 'right',
          width: 95,
          className: classes.smallerPadding,
          render: data => numberFormat({ maxDecimal: 0 }).format(data || 0),
        },
      ] :
      []
  ),
  {
    title: t('getirDriveDashboardPage:GROWTH_PCT'),
    dataIndex: 'rentalCountGrw',
    key: 'rentalCountGrw',
    align: 'right',
    width: 55,
    className: classes.smallerPadding,
    render: data => (
      <Text className={data < 0 ? parentClasses.textDanger : parentClasses.textSuccess}>
        {numberFormat({ minDecimal: 1, maxDecimal: 1 }).format(data || 0)}
      </Text>
    ),
  },
  {
    title: t('getirDriveDashboardPage:NET_R'),
    dataIndex: 'netRevenueTaxExcluded',
    key: 'netRevenueTaxExcluded',
    align: 'right',
    className: classes.smallerPadding,
    render: data => numberFormat({ maxDecimal: 0 }).format(data || 0),
  },
  ...(
    dateRangeDayCount > 1 ?
      [
        {
          title: t('getirDriveDashboardPage:NET_R_AVG'),
          dataIndex: 'netRevenueTaxExcludedAvg',
          key: 'netRevenueTaxExcludedAvg',
          align: 'right',
          width: 95,
          className: classes.smallerPadding,
          render: data => numberFormat({ maxDecimal: 0 }).format(data || 0),
        },
      ] :
      []
  ),
  {
    title: t('getirDriveDashboardPage:GROWTH_PCT'),
    dataIndex: 'netRevenueTaxExcludedGrw',
    key: 'netRevenueTaxExcludedGrw',
    align: 'right',
    width: 55,
    className: classes.smallerPadding,
    render: data => (
      <Text className={data < 0 ? parentClasses.textDanger : parentClasses.textSuccess}>
        {numberFormat({ minDecimal: 1, maxDecimal: 1 }).format(data || 0)}
      </Text>
    ),
  },
];
