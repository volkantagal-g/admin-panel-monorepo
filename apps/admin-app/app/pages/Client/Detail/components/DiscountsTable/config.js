import { Button, Tag } from 'antd';

import { currency, formatNumber } from '@shared/utils/common';
import { promoCodeStatuses } from '@shared/shared/constantValues';

const discountStatusColorMap = {
  1: 'success',
  2: 'warning',
  3: 'danger',
  6: 'success',
};

const columnsConfig = (t, langKey) => [
  {
    title: t('#'),
    dataIndex: 'status',
    key: 'status',
    render: status => (
      <Tag color={discountStatusColorMap[status]}>
        {promoCodeStatuses[status]?.[langKey]}
      </Tag>
    ),
  },
  {
    title: t('DISCOUNT_TITLE'),
    dataIndex: 'title',
    key: 'title',
    render: title => title?.[langKey],
  },
  {
    title: t('AMOUNT'),
    dataIndex: 'discountAmount',
    key: 'discountAmount',
    render: discountAmount => (
      `${formatNumber(discountAmount || 0)} ${currency()}`
    ),
  },
  {
    title: t('ACTIONS'),
    key: 'action',
    width: 100,
    fixed: 'right',
    render: discount => (
      <a target="_blank" href={`/personalPromo/detail/${discount._id}`} rel="noreferrer">
        <Button type="button" size="small">{t('DETAIL')}</Button>
      </a>
    ),
  },
];

export default columnsConfig;
