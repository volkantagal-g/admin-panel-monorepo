import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';

import { marketOrderStatuses } from '@shared/shared/constantValues';
import { GETIR_FINANCE_DOMAIN_TYPE } from '@shared/shared/constants';

const { Text } = Typography;

const getRedirectionUrl = ({ domainType, id }) => {
  if (domainType === GETIR_FINANCE_DOMAIN_TYPE) {
    return `/financeOrder/detail/${id}`;
  }
  return `/marketOrder/detail/${id}?domainType=${domainType}`;
};

export const tableColumns = (t, langKey) => [
  {
    title: t('CLIENT'),
    width: 140,
    render: order => {
      return (
        <Link to={`/client/detail/${order.client?.client?._id}`}>
          <Text>{order.client?.client?.name}</Text>
        </Link>
      );
    },
  },
  {
    title: t('WAREHOUSE'),
    width: 140,
    render: order => {
      return (
        <Link to={`/warehouse/detail/${order.warehouse?.warehouse?._id}`}>
          <Text>{order.warehouse?.warehouse?.name}</Text>
        </Link>
      );
    },
  },
  {
    title: t('DATE'),
    width: 140,
    render: order => `${new Date(order.checkout?.date).toLocaleString()}`,
  },
  {
    title: t('STATUS'),
    width: 140,
    render: order => `${marketOrderStatuses[order.status][langKey]}`,
  },
  {
    title: t('COMMENT'),
    width: 140,
    render: order => `${order.rate?.rating || ''} ${order.rate?.comment ? ` - ${order.rate?.comment}` : ''}`,
  },
  {
    title: '#',
    width: 60,
    render: order => (
      <Link to={getRedirectionUrl({ domainType: order.domainType, id: order.id })}>
        <Button
          key="orderDetailButton"
          size="small"
        >
          {t('global:DETAIL')}
        </Button>
      </Link>
    ),
  },
];
