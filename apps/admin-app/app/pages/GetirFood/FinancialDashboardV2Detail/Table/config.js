import moment from 'moment';

import { currencyFormat } from '@shared/utils/localization';
import { getLangKey } from '@shared/i18n';
import { getPaymentStatusColumn } from '../../FinancialDashboardV2/components/Payments/PaybackStatusColumn';

export const tableColumns = (t, isCurrentTabSingle, hasUnpaymentReason) => {
  const translationPrefix = isCurrentTabSingle ? 'SINGLE' : 'CHAIN';
  const nameColumn = isCurrentTabSingle ? 'restaurantName' : 'chainName';

  return [
    {
      title: <b>{t(`${translationPrefix}.TABLE.DEFERRED_PAYMENT_DATE`)}</b>,
      dataIndex: 'plannedPaymentDate',
      key: 'plannedPaymentDate',
      render: plannedPaymentDate => moment(plannedPaymentDate).format('DD/MM/YYYY'),
    },
    {
      title: <b>{t(`${translationPrefix}.TABLE.NAME`)}</b>,
      dataIndex: nameColumn,
      key: nameColumn,
    },
    {
      title: <b>{t(`${translationPrefix}.TABLE.PAYBACK_TYPE`)}</b>,
      dataIndex: 'paybackTypes',
      key: 'paybackTypes',
      render: paybackTypes => paybackTypes?.[0]?.name?.[getLangKey()],
    },
    ...(hasUnpaymentReason ? [{
      title: <b>{t(`${translationPrefix}.TABLE.UNPAYMENT_REASON`)}</b>,
      dataIndex: 'unpaymentReason',
      key: 'unpaymentReason',
      render: unpaymentReason => unpaymentReason?.[getLangKey()],
    }] : []),
    {
      title: <b>{t(`${translationPrefix}.TABLE.PAYMENT_STATUS`)}</b>,
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      render: getPaymentStatusColumn,
    },
    {
      title: <b>{t(`${translationPrefix}.TABLE.PAYMENT_AMOUNT`)}</b>,
      dataIndex: 'paymentAmount',
      key: 'paymentAmount',
      render: paymentAmount => currencyFormat().format(paymentAmount),
    },
  ];
};
