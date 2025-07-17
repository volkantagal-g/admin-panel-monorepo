import moment from 'moment';
import { isNumber } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { getLocalDateTimeFormat, currencyFormat } from '@shared/utils/localization';

const TRANSACTION_TYPES = {
  Payment: {
    tr: "Sipariş",
    en: "Order",
  },
  Refund: {
    tr: "İade/İptal",
    en: "Refund/Cancellation",
  },
};

export const tableColumns = t => [
  {
    title: <b>{t('foodMealCardReconciliation:TABLE.TRANSACTION_DATE')}</b>,
    dataIndex: 'date',
    key: 'date',
    width: 75,
    align: 'center',
    render: utcDate => moment.unix(utcDate).format(getLocalDateTimeFormat()),
  },
  {
    title: <b>{t('foodMealCardReconciliation:TABLE.ORDER_ID')}</b>,
    dataIndex: 'orderId',
    key: 'orderId',
    align: 'center',
    width: 150,
  },
  {
    title: <b>{t('foodMealCardReconciliation:TABLE.TYPE')}</b>,
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    width: 100,
    render: type => TRANSACTION_TYPES[type][getLangKey()],
  },
  {
    title: <b>{t('foodMealCardReconciliation:TABLE.AMOUNT')}</b>,
    dataIndex: 'getirAmount',
    key: 'getirAmount',
    align: 'center',
    width: 80,
    render: amount => isNumber(amount) ? currencyFormat().format(amount) : amount,
  },
  {
    title: <b>{t('foodMealCardReconciliation:TABLE.MEAL_CARD_AMOUNT')}</b>,
    dataIndex: 'mealCardAmount',
    key: 'mealCardAmount',
    align: 'center',
    width: 120,
    render: amount => isNumber(amount) ? currencyFormat().format(amount) : amount,
  },
  {
    title: <b>{t('foodMealCardReconciliation:TABLE.MATCHED')}</b>,
    dataIndex: 'reconciled',
    key: 'reconciled',
    align: 'center',
    width: 100,
    render: data => data ? 
      t('foodMealCardReconciliation:TABLE.YES') :
      t('foodMealCardReconciliation:TABLE.NO'),
  },
];
