import { isNil } from 'lodash';
import { Tag } from 'antd';

import { ORDER_STATUS_COLOR_MAP } from '@shared/shared/constants';
import { getStatusColors, currency, formatNumber } from '@shared/utils/common';
import { formatDate } from '@shared/utils/dateHelper';
import RedirectText from '@shared/components/UI/RedirectText';
import permKeys from '@shared/shared/permKey.json';
import { marketOrderStatuses } from '../../constants';
import RedirectButtonV2 from '@shared/components/UI/RedirectButtonV2';
import { ROUTE } from '@app/routes';

const columnsConfig = (t, langKey) => [
  {
    title: t('WAREHOUSE'),
    dataIndex: 'warehouse',
    key: 'warehouse',
    render: warehouse => (
      <RedirectText
        to={`/warehouse/detail/${warehouse?.id}`}
        text={warehouse?.name}
        permKey={permKeys.PAGE_WAREHOUSE_DETAIL}
        target="_blank"
      />
    ),
  },
  {
    title: t('COURIER'),
    dataIndex: 'courier',
    key: 'courier',
    render: courier => (
      <RedirectText
        to={`/courier/detail/${courier?.id}`}
        text={courier?.name}
        permKey={permKeys.PAGE_COURIER_DETAIL}
        target="_blank"
      />
    ),
  },
  {
    title: t('MARKET_ORDER_TABLE.CHECKOUT_DATE'),
    dataIndex: 'checkoutDate',
    key: 'checkoutDate',
    render: checkoutDate => (checkoutDate ? formatDate(checkoutDate) : '-'),
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
    title: t('TOTAL_PRICE'),
    dataIndex: 'totalPrice',
    key: 'totalPrice',
    render: totalPrice => (
      `${formatNumber(totalPrice || 0)} ${currency()}`
    ),
  },
  {
    title: t('MARKET_ORDER_TABLE.ERRORS'),
    dataIndex: 'errors',
    key: 'errors',
  },
  {
    title: t('MARKET_ORDER_TABLE.PROMO'),
    dataIndex: 'promoCode',
    key: 'promoCode',
    render: promoCode => (promoCode || '-'),
  },
  {
    title: t('ACTIONS'),
    key: 'action',
    width: 100,
    fixed: 'right',
    render: order => {
      return (
        <RedirectButtonV2
          to={`${ROUTE.GETIR_MARKET_ORDER_DETAIL.path.replace(':orderId', order?.id)}${isNil(order?.domainType) ? '' : `?domainType=${order.domainType}`}`}
          text={t('global:DETAIL')}
          permKey={permKeys.PAGE_GETIR_MARKET_ORDER_DETAIL}
          target="_blank"
          size="small"
        />
      );
    },
  },
];

export default columnsConfig;
