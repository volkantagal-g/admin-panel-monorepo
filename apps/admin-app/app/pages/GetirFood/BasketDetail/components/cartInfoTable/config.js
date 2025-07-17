import { get } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { cardBanks, posBanks } from '@shared/shared/constantValues';

export const generateColumns = ({ t }) => [
  {
    title: t('CARD.NO'),
    dataIndex: 'paymentInfo',
    key: 'cardNo',
    width: 100,
    render: paymentInfo => {
      return get(paymentInfo, 'paymentParameters.cardNo', '-');
    },
  },
  {
    title: t('CARD.BANK'),
    dataIndex: 'paymentInfo',
    key: 'cardBank',
    width: 100,
    render: paymentInfo => {
      const cardBank = get(paymentInfo, 'paymentParameters.cardBank', '');
      return get(cardBanks, [cardBank, getLangKey()], '-');
    },
  },
  {
    title: t('CARD.POS_BANK'),
    dataIndex: 'paymentInfo',
    key: 'posBank',
    width: 100,
    render: paymentInfo => {
      const posBank = get(paymentInfo, 'paymentParameters.posBank', '');
      return get(posBanks, [posBank, getLangKey()], '-');
    },
  },
  {
    title: t('CARD.TRANSACTION_ID'),
    dataIndex: 'transactionId',
    key: 'transactionId',
    width: 100,
  },
];
