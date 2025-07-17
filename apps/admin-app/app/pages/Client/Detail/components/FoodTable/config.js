import { Button, Tag } from 'antd';

import { ENVIRONMENT } from '@shared/config';
import { formatDate } from '@shared/utils/dateHelper';
import { FOOD_DELIVERY, ORDER_STATUS_COLOR_MAP } from '@shared/shared/constants';
import { getStatusColors, currency, formatNumber } from '@shared/utils/common';
import { marketOrderStatuses } from '@app/pages/Client/Detail/constants';
import RedirectText from '@shared/components/UI/RedirectText';
import permKeys from '@shared/shared/permKey.json';

const { REACT_APP_FOOD_RESTAURANT_PANEL_URL: FOOD_URL } = ENVIRONMENT;

const columnsConfig = (t, langKey) => [
  {
    title: t('FOOD_TABLE.RESTAURANT'),
    dataIndex: 'restaurant',
    key: 'restaurant',
    render: restaurant => {
      if (!restaurant?._id) return null;

      return (
        <a target="_blank" rel="noreferrer" href={`${FOOD_URL}/r/${restaurant?._id}/dashboard`}>
          {restaurant?.name}
        </a>
      );
    },
  },
  {
    title: t('FOOD_TABLE.COURIER'),
    key: 'courier',
    render: order => {
      const { courier, deliveryType } = order;

      if (deliveryType === FOOD_DELIVERY.RESTAURANT) {
        return (
          <span>{courier?.name}</span>
        );
      }

      return (
        <RedirectText
          text={courier?.name}
          to={`/courier/detail/${courier?.id}`}
          permKey={permKeys.PAGE_COURIER_DETAIL}
          target="_blank"
        />
      );
    },
  },
  {
    title: t('FOOD_TABLE.CHECKOUT_DATE'),
    dataIndex: 'checkoutDate',
    key: 'checkoutDate',
    render: checkoutDate => formatDate(checkoutDate) || '-',
  },
  {
    title: t('TOTAL_PRICE'),
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    render: totalPrice => (
      `${formatNumber(totalPrice || 0)} ${currency()}`
    ),
  },
  {
    title: t('STATUS'),
    dataIndex: 'status',
    key: 'status',
    render: status => (
      <Tag color={ORDER_STATUS_COLOR_MAP[getStatusColors(status)]}>
        {marketOrderStatuses[status]?.[langKey]}
      </Tag>
    ),
  },
  {
    title: t('ACTIONS'),
    key: 'action',
    width: 100,
    fixed: 'right',
    render: order => {
      let url = `/foodOrder/detail/${order.id}`;

      if (order.isBasket) {
        url = `/baskets/detail/${order.id}`;
      }

      return (
        <a target="_blank" rel="noreferrer" href={url}>
          <Button type="button" size="small">{t('DETAIL')}</Button>
        </a>
      );
    },
  },
];

export default columnsConfig;
