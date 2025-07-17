import { Tag } from 'antd';

import TransactionsModal from './components/TransactionsModal';
import { TYPE_BY_TYPECODE, STATUS_COLORS, STATUS_LOOKUP, TYPE_SUBSCRIPTION } from './constants';
import { currency } from '@shared/utils/common';
import { formatDate } from '@shared/utils/dateHelper';

const columnsConfig = (t, langKey, classes) => {
  const translationPrefix = 'SUBSCRIPTIONS_TABLE.COLUMNS';

  return [{
    title: t(`${translationPrefix}.TYPE`),
    key: 'typeCode',
    dataIndex: 'typeCode',
    render: (_, subscription) => {
      return (
        <div className={classes.tableRowColumn}>
          <div><span className={classes.tableRowColumnTitle}>{TYPE_BY_TYPECODE[subscription.type.code][langKey]}</span></div>
          <div><span>{TYPE_SUBSCRIPTION[subscription.subscriptionDetail.period][langKey]} {t(`${translationPrefix}.SUBSCRIPTION`)}</span></div>
        </div>
      );
    },
  },
  {
    title: t(`${translationPrefix}.STATUS`),
    key: 'status',
    dataIndex: 'status',
    render: (_, subscription) => {
      return (
        <Tag color={STATUS_COLORS[subscription.subscriptionDetail.status]}>
          {STATUS_LOOKUP[subscription.subscriptionDetail.status][langKey]}
        </Tag>
      );
    },
  },
  // {
  //   title: t(`${translationPrefix}.PAYMENT_METHOD`),
  //   key: 'payment',
  //   dataIndex: 'payment',
  //   render: (_, subscription) => {
  //     return <PaymentMethod />;
  //   },
  // },
  {
    title: t(`${translationPrefix}.PRICE`),
    key: 'price',
    dataIndex: 'price',
    render: (_, subscription) => {
      return (
        <div className={classes.priceColumn}>

          <span>
            {subscription.subscriptionDetail.nextRenewalPrice ? `${subscription.subscriptionDetail.nextRenewalPrice} ${currency()}` : '-'}

          </span>
          <TransactionsModal cycleId={subscription.subscriptionDetail.cycleId} />
        </div>
      );
    },
  },
  {
    title: t(`${translationPrefix}.START_DATE`),
    key: 'startedAt',
    dataIndex: 'startedAt',
    render: (_, subscription) => {
      return (
        <span>{formatDate(subscription.subscriptionDetail.startedAt, 'DD MMM YYYY')}</span>
      );
    },
  },
  {
    title: t(`${translationPrefix}.NEXT_RENEW_DATE`),
    key: 'nextRenewalDate',
    dataIndex: 'nextRenewalDate',
    render: (_, subscription) => {
      return (
        <span>{subscription.subscriptionDetail.nextRenewalDate ? formatDate(subscription.subscriptionDetail.nextRenewalDate, 'DD MMM YYYY') : '-'}</span>
      );
    },
  },
  {
    title: t(`${translationPrefix}.END_DATE`),
    key: 'nextRenewalDate',
    dataIndex: 'nextRenewalDate',
    render: (_, subscription) => {
      return (
        <span>{subscription.subscriptionDetail.endDate ? formatDate(subscription.subscriptionDetail.endDate, 'DD MMM YYYY') : '-'}</span>
      );
    },
  },
  ];
};

export default columnsConfig;
