import _ from 'lodash';

import { getLangKey } from '@shared/i18n';
import { cardBanks, posBanks } from '@shared/shared/constantValues';

export const tableColumns = t => {
  return [
    {
      title: t('artisanOrderPage:CARD.NO'),
      dataIndex: 'paymentInfo',
      key: 'paymentInfo',
      width: 100,
      render: paymentInfo => {
        return _.get(paymentInfo, 'paymentParameters.cardNo', '-');
      },
    },
    {
      title: t('artisanOrderPage:CARD.BANK'),
      dataIndex: 'paymentInfo',
      key: 'paymentInfo',
      width: 100,
      render: paymentInfo => {
        const cardBank = _.get(paymentInfo, 'paymentParameters.cardBank', '');
        return _.get(cardBanks, [cardBank, getLangKey()], '-');
      },
    },
    {
      title: t('artisanOrderPage:CARD.POS_BANK'),
      dataIndex: 'paymentInfo',
      key: 'paymentInfo',
      width: 100,
      render: paymentInfo => {
        const posBank = _.get(paymentInfo, 'paymentParameters.posBank', '');
        return _.get(posBanks, [posBank, getLangKey()], '-');
      },
    },
    {
      title: t('artisanOrderPage:CARD.TRANSACTION_ID'),
      dataIndex: 'transactionId',
      key: 'transactionId',
      width: 100,
    },
  ];
};
