import { get } from 'lodash';

import { getLangKey, t } from '@shared/i18n';
import { cardBanks, posBanks } from '@shared/shared/constantValues';

export const tableColumns = [
  {
    title: t('artisanOrderPage:CARD.NO'),
    dataIndex: 'paymentInfo',
    key: 'paymentInfo',
    width: 100,
    render: paymentInfo => {
      return get(paymentInfo, 'paymentParameters.cardNo', '-');
    },
  },
  {
    title: t('artisanOrderPage:CARD.BANK'),
    dataIndex: 'paymentInfo',
    key: 'paymentInfo',
    width: 100,
    render: paymentInfo => {
      const cardBank = get(paymentInfo, 'paymentParameters.cardBank', '');
      return get(cardBanks, [cardBank, getLangKey()], '-');
    },
  },
  {
    title: t('artisanOrderPage:CARD.POS_BANK'),
    dataIndex: 'paymentInfo',
    key: 'paymentInfo',
    width: 100,
    render: paymentInfo => {
      const posBank = get(paymentInfo, 'paymentParameters.posBank', '');
      return get(posBanks, [posBank, getLangKey()], '-');
    },
  },
  {
    title: t('artisanOrderPage:CARD.TRANSACTION_ID'),
    dataIndex: 'transactionId',
    key: 'transactionId',
    width: 100,
  },
];
