import { Button, Space, Tag } from 'antd';

import { Link } from 'react-router-dom';

import { formatDate } from '@shared/utils/dateHelper';
import { getirDomainTypes, marketOrderStatuses } from '@shared/shared/constantValues';
import permKey from '@shared/shared/permKey.json';
import { ROUTE } from '@app/routes';
import { getLangKey } from '@shared/i18n';
import { getStatusColor } from './utils';

export const getTableColumns = (marketOrderId, t, canAccess) => [
  {
    title: t('BATCHED_ORDERS.CHECKOUT_DATE'),
    dataIndex: 'checkoutDate',
    render: checkoutDate => formatDate(checkoutDate),

  },
  {
    title: t('global:DOMAIN_TYPE'),
    dataIndex: 'domainType',
    render: domainType => getirDomainTypes[domainType]?.[getLangKey()],

  },
  {
    title: t('global:STATUS'),
    dataIndex: 'status',
    render: status => <Tag color={getStatusColor(status)}>{ marketOrderStatuses[status]?.[getLangKey()]}</Tag>,

  },
  {
    title: t('BATCHED_ORDERS.BATCH_INDEX'),
    render: ({ id: orderId, domainType, batchIndex }) => {
      if (!canAccess(permKey.PAGE_GETIR_MARKET_ORDER_DETAIL)) {
        return null;
      }
      const orderDetailPath = ROUTE.GETIR_MARKET_ORDER_DETAIL.path.replace(':orderId', orderId);
      const queryParamAddedLink = `${orderDetailPath}?domainType=${domainType}`;
      const isBold = orderId === marketOrderId;
      return (
        <Space>
          <p style={{ fontWeight: isBold ? 'bold' : 'normal' }}>{batchIndex}</p>
          <Button>
            <Link to={queryParamAddedLink}>
              {t('global:DETAIL')}
            </Link>
          </Button>
        </Space>
      );
    },
  },

];
