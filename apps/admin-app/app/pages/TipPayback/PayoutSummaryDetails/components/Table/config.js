import { Table, Tag } from 'antd';
import moment from 'moment';

import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import { PAYOUT_STATUS_VALUES } from '../../constants';
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
    title: t('payoutSummaryPage:PAYOUT_SUMMARY'),
    dataIndex: 'payoutSummary',
    key: 'payoutSummary',
    width: 200,
    render: payoutSummary => {
      return <CopyToClipboard message={payoutSummary} />;
    },
  },
  {
    title: t('payoutSummaryPage:PERSON_ID'),
    dataIndex: 'person',
    key: 'person',
    width: 200,
    render: person => {
      return <CopyToClipboard message={person} />;
    },
  },
  {
    title: t('payoutSummaryPage:PERSON_NAME'),
    dataIndex: 'personName',
    key: 'personName',
    width: 200,
    sorter: true,
  },
  {
    title: t('payoutSummaryPage:TAX_NUMBER'),
    dataIndex: 'taxNum',
    key: 'taxNum',
    width: 200,
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
    title: t('payoutSummaryPage:PAYOUT_DATE'),
    dataIndex: 'payoutDate',
    key: 'payoutDate',
    width: 150,
    render: payoutDate => {
      return payoutDate && moment(payoutDate).format(DEFAULT_TIME_FORMAT);
    },
    sorter: true,
  },
  {
    title: t('payoutSummaryPage:TOTAL_AMOUNT'),
    dataIndex: 'totalAmount',
    key: 'totalAmount',
    width: 200,
    sorter: true,
  },
  {
    title: 'IBAN',
    dataIndex: 'iban',
    key: 'iban',
    width: 200,
  },
  {
    title: t('payoutSummaryPage:PAYOUT_STATUS'),
    dataIndex: 'payoutStatus',
    key: 'payoutStatus',
    width: 200,
    render: payoutStatus => {
      return (
        <Tag color={PAYOUT_STATUS_VALUES[payoutStatus].color}>
          {t(`payoutSummaryPage:${PAYOUT_STATUS_VALUES[payoutStatus]?.label}`)}
        </Tag>
      );
    },
  },
  {
    title: t('payoutSummaryPage:PAYOUT_DESCRIPTION'),
    dataIndex: 'payoutDescription',
    key: 'payoutDescription',
    width: 300,
  },
  {
    title: t('payoutSummaryPage:PAYOUT_SUMMARY_DETAILS_KEY'),
    dataIndex: 'payoutSummaryDetailsKey',
    key: 'payoutSummaryDetailsKey',
    width: 400,
    render: payoutSummaryDetailsKey => {
      return <CopyToClipboard message={payoutSummaryDetailsKey} />;
    },
  },
  {
    title: t('payoutSummaryPage:PAYOUT_ACTIVITY_KEY'),
    dataIndex: 'payoutActivityId',
    key: 'payoutActivityId',
    width: 400,
    render: payoutActivityId => {
      return <CopyToClipboard message={payoutActivityId} />;
    },
  },
];
