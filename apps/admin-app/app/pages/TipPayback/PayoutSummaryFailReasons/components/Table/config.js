import { Table } from 'antd';
import moment from 'moment';

import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';

export const columns = t => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 200,
    render: id => {
      return <CopyToClipboard message={id} />;
    },
  },
  {
    title: t('payoutSummaryPage:PERSON_NAME'),
    dataIndex: 'personName',
    key: 'personName',
    width: 150,
    sorter: true,
  },
  {
    title: t('payoutSummaryPage:PERSON_ID'),
    dataIndex: 'person',
    key: 'person',
    width: 200,
    render: person => <CopyToClipboard message={person} />,
  },

  Table.EXPAND_COLUMN,
  {
    title: t('payoutSummaryPage:TIPS'),
    dataIndex: 'tips',
    key: 'tips',
    width: 200,
    render: tips => {
      return (
        <CopyToClipboard key={tips[0]} message={tips[0]} />
      );
    },
  },
  {
    title: t('payoutSummaryPage:PAYOUT_SUMMARY'),
    dataIndex: 'payoutSummary',
    key: 'payoutSummary',
    width: 200,
    render: payoutSummary => {
      return <CopyToClipboard message={payoutSummary} />;
    },
  },
  {
    title: t('global:CREATED_AT'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 150,
    render: createdAt => {
      return createdAt && moment(createdAt).format(DEFAULT_TIME_FORMAT);
    },
    sorter: true,
  },
  {
    title: 'IBAN',
    dataIndex: 'iban',
    key: 'iban',
    width: 300,
  },
  {
    title: t('payoutSummaryPage:TAX_NUMBER'),
    dataIndex: 'taxNum',
    key: 'taxNum',
    width: 150,
  },
  {
    title: t('payoutSummaryPage:ERROR_DESCRIPTION'),
    dataIndex: 'errorDescription',
    key: 'errorDescription',
    width: 400,
  },
  {
    title: t('payoutSummaryPage:TOTAL_AMOUNT'),
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    width: 200,
    render: totalAmount => {
      return `${totalAmount}₺`;
    },
    sorter: true,
  },
];
