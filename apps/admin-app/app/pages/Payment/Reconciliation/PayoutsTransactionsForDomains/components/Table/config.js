import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';

export const columns = t => [
  {
    title: t('payoutTransactionsForDomains:ACTIVITY_ID.TITLE'),
    dataIndex: 'activityId',
    key: 'activityId',
    align: 'center',
    width: 300,
    render: activityId => {
      return <CopyToClipboard message={activityId} />;
    },

  },
  {
    title: 'IBAN',
    dataIndex: 'iban',
    key: 'iban',
    align: 'center',
    width: 300,
    render: iban => {
      return <CopyToClipboard message={iban} />;
    },
  },
  {
    title: t('payoutTransactionsForDomains:COMPANY_NAME'),
    dataIndex: 'companyName',
    key: 'companyName',
    align: 'center',
    width: 200,
  },
  {
    title: t('global:AMOUNT'),
    key: 'amount',
    align: 'center',
    width: 100,
    render: data => {
      return data.amount && `${data?.currency} ${(data.amount).toFixed(2)}`;
    },
  },

  {
    title: t('payoutTransactionsForDomains:EXPLANATION'),
    dataIndex: 'explanation',
    key: 'explanation',
    align: 'center',
    width: 300,
  },
  {
    title: t('global:STATUS'),
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    width: 150,
  },
  {
    title: t('payoutTransactionsForDomains:BANK_RESPONSE_MESSAGE'),
    dataIndex: 'bankResponseMessage',
    key: 'bankResponseMessage',
    align: 'center',
    width: 150,
  },
  {
    title: t('payoutTransactionsForDomains:BANK_RESPONSE_CODE'),
    dataIndex: 'bankResponseCode',
    key: 'bankResponseCode',
    align: 'center',
    width: 150,
  },
  {
    title: t('global:CREATED_AT'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    align: 'center',
    width: 150,
  },
  {
    title: t('global:COUNTRY'),
    dataIndex: 'country',
    key: 'country',
    align: 'center',
    width: 100,
  },
  {
    title: t('global:DOMAIN'),
    dataIndex: 'vertical',
    key: 'vertical',
    align: 'center',
    width: 150,
  },
];
