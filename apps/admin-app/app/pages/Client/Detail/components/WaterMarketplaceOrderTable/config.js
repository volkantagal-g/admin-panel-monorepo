import { Button } from 'antd';

import { formatNumber } from '@shared/utils/common';

import { formatDate } from '@shared/utils/dateHelper';
import { getirWaterMarketplaceOrderStatuses } from '@shared/shared/constantValues';

const columnsConfig = (t, langKey) => [
  {
    title: t('WATER_MARKETPLACE.TABLE.COLUMNS.FRANCHISE'),
    dataIndex: 'vendorName',
    key: 'vendorName',
  },
  {
    title: t('WATER_MARKETPLACE.TABLE.COLUMNS.CHECKOUT_DATE'),
    dataIndex: 'orderTime',
    key: 'orderTime',
    render: orderTime => orderTime ? formatDate(orderTime) : '-',
  },
  {
    title: t('WATER_MARKETPLACE.TABLE.COLUMNS.PRICE'),
    dataIndex: 'chargedAmount',
    key: 'chargedAmount',
    render: chargedAmount => (<>₺{formatNumber(chargedAmount, 2)}</>),
  },
  {
    title: t('WATER_MARKETPLACE.TABLE.COLUMNS.STATUS'),
    dataIndex: 'status',
    key: 'status',
    render: status => (
      <>
        {getirWaterMarketplaceOrderStatuses[status][langKey]}
      </>
    ),
  },
  {
    title: t('ACTIONS'),
    dataIndex: 'id',
    key: 'id',
    width: 100,
    fixed: 'right',
    render: id => (
      <Button
        href={`/getirWater/orderDetail/${id}`}
        target="_blank"
        size="small"
      >
        {t('DETAIL')}
      </Button>
    ),
  },
];

export default columnsConfig;
