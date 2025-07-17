import { Button, Tag } from 'antd';
import moment from 'moment';

import { ORDER_STATUS_COLOR_MAP } from '@shared/shared/constants';
import { getStatusColors, currency, formatNumber } from '@shared/utils/common';

import { formatDate } from '@shared/utils/dateHelper';
import { artisanOrderStatuses } from '@shared/shared/constantValues';
import RedirectText from '@shared/components/UI/RedirectText';
import permKeys from '@shared/shared/permKey.json';

const columnsConfig = ({ t, langKey }) => [
  {
    title: t('LOCALS_TABLE.STORE'),
    dataIndex: 'shop',
    key: 'shop',
    render: shop => shop?.name,
  },
  {
    title: t('COURIER'),
    dataIndex: 'courier',
    key: 'courier',
    render: courier => (
      <RedirectText
        text={courier?.name}
        to={`/courier/detail/${courier?.id}`}
        permKey={permKeys.PAGE_COURIER_DETAIL}
        target="_blank"
      />
    ),
  },
  {
    title: t('LOCALS_TABLE.CHECKOUT_DATE'),
    dataIndex: 'checkoutDate',
    key: 'checkoutDate',
    sorter: { compare: (a, b) => moment(a.checkoutDate).unix() - moment(b.checkoutDate).unix() },
    render: checkoutDate => (checkoutDate ? formatDate(checkoutDate) : '-'),
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
        {artisanOrderStatuses[status]?.[langKey]}
      </Tag>
    ),
  },
  {
    title: t('ACTIONS'),
    key: 'action',
    width: 100,
    fixed: 'right',
    render: order => (
      <a target="_blank" href={`/artisanOrder/detail/${order.id}`} rel="noreferrer">
        <Button type="button" size="small">{t('DETAIL')}</Button>
      </a>
    ),
  },
];

export default columnsConfig;
