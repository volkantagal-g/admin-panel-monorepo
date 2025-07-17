import { Typography } from 'antd';
import { get } from 'lodash';

const { Text } = Typography;

export const tableColumns = ({ t }) => [
  {
    title: <Text strong>{t('RESTAURANT_SITUATION_SUMMARY')}</Text>,
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: <Text strong>{t('VALUE')}</Text>,
    width: 120,
    dataIndex: 'value',
    key: 'value',
    align: 'right',
  },
];

export const restaurantData = ({ t, restaurantSummary }) => [
  {
    key: '1',
    title: t('ACTIVE_RESTAURANTS'),
    value: get(restaurantSummary, 'actives', 0),
  },
  {
    key: '2',
    title: t('AVAILABLE_RG'),
    value: get(restaurantSummary, 'openAndRGs', 0),
  },
  {
    key: '3',
    title: t('AVAILABLE_RESTAURANTS'),
    value: `${get(restaurantSummary, 'opens', 0)} (${get(restaurantSummary, 'openToActiveRatio') ?? 0})%`,
  },
  {
    key: '4',
    title: t('COURIER_OPEN_RG'),
    value: `${get(restaurantSummary, 'courierAndRGs', 0)} (${get(restaurantSummary, 'courierRGToOpenRGRatio') ?? 0})%`,
  },
  {
    key: '5',
    title: t('BUSY_RG_SHORT'),
    value: `${get(restaurantSummary, 'busyOnes', 0)} (${get(restaurantSummary, 'busyToCourierAndRGRatio') ?? 0})%`,
  },
];
