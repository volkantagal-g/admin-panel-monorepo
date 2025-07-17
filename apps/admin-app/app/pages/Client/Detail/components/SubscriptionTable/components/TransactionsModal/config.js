import { PAYMENT_METHOD, TYPE_TRANSACTION } from '../../constants';
import { currency } from '@shared/utils/common';
import { formatDate } from '@shared/utils/dateHelper';

const columnsConfig = (t, langKey) => {
  const translationPrefix = 'SUBSCRIPTIONS_TABLE.TRANSACTIONS.COLUMNS';

  return [{
    title: t(`${translationPrefix}.AMOUNT`),
    dataIndex: 'amount',
    key: 'amount',
    render: amount => {
      return ` ${amount}  ${currency()}`;
    },
  },
  {
    title: t(`${translationPrefix}.TYPE`),
    dataIndex: 'type',
    key: 'type',
    render: type => {
      return (
        <span>{TYPE_TRANSACTION[type][langKey]}</span>
      );
    },
  },
  {
    title: t(`${translationPrefix}.SUCCEEDED`),
    dataIndex: 'succeeded',
    key: 'succeeded',
    render: succeeded => {
      return succeeded.toString();
    },
  }, {
    title: t(`${translationPrefix}.CREDIT_CARD_NO`),
    dataIndex: 'creditCardNo',
    key: 'creditCardNo',
    render: creditCardNo => {
      return creditCardNo || '-';
    },
  },
  {
    title: t(`${translationPrefix}.PAYMENT_METHOD`),
    dataIndex: 'paymentMethod',
    key: 'paymentMethod',
    render: paymentMethod => {
      return PAYMENT_METHOD[paymentMethod];
    },
  },
  {
    title: t(`${translationPrefix}.PAYMENT_DATE`),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: updatedAt => {
      return <span> { updatedAt ? formatDate(updatedAt, 'DD MMM YYYY') : '-'} </span>;
    },
  }];
};

export default columnsConfig;
