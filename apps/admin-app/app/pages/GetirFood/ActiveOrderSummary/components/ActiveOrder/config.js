import { Typography } from 'antd';
import { get } from 'lodash';

const { Text } = Typography;

export const tableColumns = ({ t }) => {
  return [
    {
      title: (
        <Text strong>{t('ACTIVE_ORDERS_SUMMARY')}</Text>
      ),
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
};

export const activeOrdersData = ({ t, orderSummary }) => [
  {
    key: '0',
    title: t('FOOD_ACTIVE_ORDERS'),
    value: get(orderSummary, 'total', 0),
  },
  {
    key: '1',
    title: t('FOOD_GETIR_DELIVERY'),
    value: get(orderSummary, 'ggTotal', 0),
  },
  {
    key: '2',
    title: t('FOOD_RESTAURANT_DELIVERY'),
    value: get(orderSummary, 'rgTotal', 0),
  },
  {
    key: '3',
    title: t('SCHEDULED_ORDER'),
    value: get(orderSummary, 'scheduledTotal', 0),
  },
  {
    key: '4',
    title: t('VIGO'),
    value: get(orderSummary, 'foodDedicatedCourierTotal', 0),
  },
  {
    key: '5',
    title: t('PENDING'),
    value: get(orderSummary, 'pendingTotal', 0),
  },
  {
    key: '6',
    title: t('MOBILE_ORDER'),
    value: `${get(orderSummary, 'mobileTotal', 0)} (${get(orderSummary, 'mobileTotalRatio') ?? 0})%`,
  },
  {
    key: '7',
    title: t('WEB_ORDER'),
    value: `${get(orderSummary, 'webTotal', 0)} (${get(orderSummary, 'webTotalRatio') ?? 0})%`,
  },
  {
    key: '8',
    title: t('WITHOUT_PROMO'),
    value: `${get(orderSummary, 'withoutPromoTotal', 0)} (${get(orderSummary, 'withoutPromoTotalRatio') ?? 0})%`,
  },
  {
    key: '9',
    title: t('ON_DELIVERY'),
    value: `${get(orderSummary, 'onDeliveryTotal', 0)} (${get(orderSummary, 'onDeliveryTotalRatio') ?? 0})%`,
  },
  {
    key: '10',
    title: t('ONLINE'),
    value: `${get(orderSummary, 'onlineTotal', 0)}  (${get(orderSummary, 'onlineTotalRatio') ?? 0})%`,
  },
];
