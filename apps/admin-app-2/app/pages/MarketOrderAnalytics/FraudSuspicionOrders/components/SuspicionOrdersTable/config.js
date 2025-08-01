import { Typography } from 'antd';

import moment from 'moment';

import { getLangKey } from '@shared/i18n';
import { domainTypes, marketOrderStatuses } from '@shared/shared/constantValues';
import { formatUTCDate } from '@shared/utils/dateHelper';
import { currency } from '@shared/utils/common';
import { ROUTE } from '@app/routes';
import RedirectText from '@shared/components/UI/RedirectText';
import RedirectButton from '@shared/components/UI/RedirectButtonV2';
import permKeys from '@shared/shared/permKey.json';

const { Text } = Typography;
export const getTableColumns = ({ t }) => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 200,
  },
  {
    title: t('PROMO_CODE'),
    dataIndex: 'promo',
    render: promo => {
      const promotion = promo?.applied?.[0];
      return (
        <Text
          style={{
            backgroundColor: promotion?.code && promotion?.bgColor,
            color: promotion?.textColor,
          }}
        >
          {promotion?.code}
        </Text>
      );
    },
  },
  {
    title: t('DOMAIN'),
    dataIndex: 'domainType',
    render: domainType => domainTypes[domainType]?.[getLangKey()],
  },
  {
    title: t('QUEUE_STATUS'),
    dataIndex: 'delivery',
    render: delivery => t(`MARKET_QUEUE_STATUS.${delivery?.queue?.status}`),
  },
  {
    title: t('CLIENT_NAME'),
    dataIndex: 'client',
    render: client => client?.client?.name,
  },
  {
    title: t('CLIENT_ID'),
    dataIndex: 'client',
    render: client => client?.client?._id,
  },
  {
    title: t('WAREHOUSE'),
    dataIndex: 'warehouse',
    render: warehouse => warehouse?.warehouse?.name,
  },
  {
    title: t('COURIER'),
    dataIndex: 'courier',
    render: courier => (
      <RedirectText
        to={`/courier/detail/${courier?.courier?.id}`}
        text={courier?.courier?.name}
        permKey={permKeys.PAGE_COURIER_DETAIL}
        target="_blank"
      />
    ),
  },
  {
    title: t('CHECKOUT_DATE'),
    dataIndex: 'checkoutDateL',
    sorter: (a, b) => moment(a.checkoutDateL).valueOf() - moment(b.checkoutDateL).valueOf(),
    defaultSortOrder: 'descend',
    render: date => formatUTCDate(date),
  },
  {
    title: t('CHARGED_AMOUNT'),
    dataIndex: 'basket',
    sorter: (a, b) => (a?.basket?.calculation?.totalChargedAmount || 0) - (b?.basket?.calculation?.totalChargedAmount || 0),
    // defaultSortOrder: 'descend',
    render: basket => `${(basket?.calculation?.totalChargedAmount || 0).toFixed(2)}${currency()}`,
  },
  {
    title: t('global:STATUS'),
    dataIndex: 'status',
    sorter: (a, b) => a.status - b.status,
    render: status => marketOrderStatuses[status]?.[getLangKey()],
  },
  {
    title: t('SUSPICIOUS_STATUS'),
    dataIndex: 'fraudStatus',
    render: fraudStatus => t(`FRAUD_SUSPICION_STATUS.${fraudStatus}`),
  },
  {
    title: t('global:ACTION'),
    render: ({ _id: orderId, domainType }) => {
      const orderDetailPath = ROUTE.GETIR_MARKET_ORDER_DETAIL.path.replace(':orderId', orderId);
      const queryParamAddedLink = `${orderDetailPath}?domainType=${domainType}`;
      return (
        <RedirectButton
          to={queryParamAddedLink}
          text={t('global:DETAIL')}
          permKey={permKeys.PAGE_GETIR_MARKET_ORDER_DETAIL}
          size="small"
          target="_blank"
        />
      );
    },
  },
];
