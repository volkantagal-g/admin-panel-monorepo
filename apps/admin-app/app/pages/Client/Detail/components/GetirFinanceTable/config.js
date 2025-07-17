import { Button, Tag } from 'antd';

import { formatDate } from '@shared/utils/dateHelper';
import {
  ORDER_STATUS_COLOR_MAP,
  FINANCE_VENDOR_MAP,
} from '@shared/shared/constants';

import { getStatusColors } from '@shared/utils/common';
import { financeOrderStatuses } from '@shared/shared/constantValues';

const columnsConfig = (t, langKey) => [
  {
    title: t('FINANCE_TABLE.CHECKOUT_DATE'),
    dataIndex: 'checkoutDate',
    key: 'checkoutDate',
    width: '30%',
    render: checkoutDate => (checkoutDate ? formatDate(checkoutDate) : '-'),
  },
  {
    title: t('FINANCE_TABLE.VENDOR'),
    dataIndex: 'vendorId',
    key: 'vendorId',
    width: '20%',
    render: vendorId => FINANCE_VENDOR_MAP[vendorId] || '-',
  },
  {
    title: t('FINANCE_TABLE.STATUS'),
    dataIndex: 'vendorStatus',
    key: 'vendorStatus',
    width: '30%',
    render: status => (
      <Tag color={ORDER_STATUS_COLOR_MAP[getStatusColors(status)]}>
        {financeOrderStatuses[status]?.[langKey]}
      </Tag>
    ),
  },
  {
    title: t('ACTIONS'),
    key: 'action',
    fixed: 'right',
    width: '20%',
    render: order => {
      return (
        <a target="_blank" rel="noreferrer" href={`/financeOrder/detail/${order?.orderId}`}>
          <Button type="button" size="small">{t('DETAIL')}</Button>
        </a>
      );
    },
  },
];

export default columnsConfig;
