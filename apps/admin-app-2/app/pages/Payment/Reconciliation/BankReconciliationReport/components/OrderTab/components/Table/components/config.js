import moment from 'moment';

import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';

export const columns = t => {
  return [
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.EXTERNAL_PAYMENT_TOKEN'),
      dataIndex: 'externalPaymentToken',
      key: 'externalPaymentToken',
      width: 250,
      render: externalPaymentToken => {
        return <CopyToClipboard message={externalPaymentToken} />;
      },
    },
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.EVENT_ID'),
      dataIndex: 'transactionId',
      key: 'transactionId',
      width: 250,
      render: transactionId => {
        return <CopyToClipboard message={transactionId} />;
      },
    },
    {
      title: t('bankReconciliationReportPage:AMOUNT'),
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: t('bankReconciliationReportPage:COUNTRY_CODE'),
      dataIndex: 'countryCode',
      key: 'countryCode',
      width: 150,
    },
    {
      title: t('bankReconciliationReportPage:CURRENCY_CODE'),
      dataIndex: 'currencyCode',
      key: 'currencyCode',
      width: 150,
    },
    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.ORDER_TIP'),
      dataIndex: 'belongTo',
      key: 'belongTo',
      width: 150,
    },
    {
      title: t('bankReconciliationReportPage:ORIGINAL_TRANSACTION_TYPE'),
      dataIndex: 'originalTransactionType',
      key: 'originalTransactionType',
      width: 200,
    },

    {
      title: t('bankReconciliationReportPage:SOURCE_OF_STATEMENT'),
      dataIndex: 'sourceOfStatement',
      key: 'sourceOfStatement',
      width: 150,
    },

    {
      title: t('bankReconciliationReportPage:TRANSACTION_BEHAVIOUR_TYPE'),
      dataIndex: 'transactionBehaviourType',
      key: 'transactionBehaviourType',
      width: 200,
    },

    {
      title: t('bankReconciliationReportPage:TABLE.COLUMNS.CHECKOUT_DATE'),
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      sorter: (a, b) => new Date(a.transactionDate) - new Date(b.transactionDate),
      width: 150,
      render: transactionDate => {
        return moment(transactionDate).format('YYYY-MM-DD HH:mm:ss');
      },
    },

  ];
};
