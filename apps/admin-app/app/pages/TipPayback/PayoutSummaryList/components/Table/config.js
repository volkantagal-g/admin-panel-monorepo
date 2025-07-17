import { Space, Tag } from 'antd';

import moment from 'moment';

import { CopyToClipboard } from '@shared/components/UI/CopyToClipboard';
import CancelButton from './components/CancelButton';
import PayoutButton from './components/PayoutButton';
import StatusUpdateButton from './components/StatusUpdateButton';
import DetailsButton from './components/DetailsButton';
import { PAYOUT_SUMMARY_STATUS_VALUES } from '../../constants';
import FailReasonButton from './components/FailReasonsButton';
import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';
import ReportButton from './components/ReportButton';

export const columns = (t, filters) => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    fixed: 'left',
    width: 150,
    render: id => {
      return <CopyToClipboard message={id} />;
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
    title: t('payoutSummaryPage:START_DATE'),
    dataIndex: 'startDate',
    key: 'startDate',
    width: 150,
    render: startDate => {
      return startDate && moment(startDate).format(DEFAULT_TIME_FORMAT);
    },
    sorter: true,
  },
  {
    title: t('payoutSummaryPage:FINISH_DATE'),
    dataIndex: 'finishDate',
    key: 'finishDate',
    width: 150,
    render: finishDate => {
      return finishDate && moment(finishDate).format(DEFAULT_TIME_FORMAT);
    },
    sorter: true,
  },
  {
    title: t('payoutSummaryPage:STATUS'),
    dataIndex: 'payoutSummaryStatus',
    key: 'payoutSummaryStatus',
    width: 150,
    render: payoutSummaryStatus => {
      return (
        <Tag color={PAYOUT_SUMMARY_STATUS_VALUES[payoutSummaryStatus]?.color}>
          {t(`payoutSummaryPage:${PAYOUT_SUMMARY_STATUS_VALUES[payoutSummaryStatus]?.label}`)}
        </Tag>
      );
    },
  },
  {
    title: t('paymentTransactionPage:ACTION'),
    key: 'action',
    width: 400,

    render: payoutSummary => {
      const { id, payoutSummaryStatus } = payoutSummary;

      const statusLabel = PAYOUT_SUMMARY_STATUS_VALUES[payoutSummaryStatus]?.label;
      const isCancelActive = statusLabel === 'IN_PROGRESS';
      const isPayoutActive = statusLabel === 'IN_PROGRESS';
      const isStatusUpdateActive = statusLabel === 'COMPLETE';
      const isReportActive = statusLabel === 'COMPLETE';

      return (
        <Space size="middle">
          <CancelButton isActive={isCancelActive} id={id} filters={filters} />
          <PayoutButton isActive={isPayoutActive} id={id} filters={filters} />
          <StatusUpdateButton isActive={isStatusUpdateActive} id={id} filters={filters} />
          <ReportButton isActive={isReportActive} id={id} filters={filters} />
          <DetailsButton id={id} filters={filters} />
          <FailReasonButton id={id} filters={filters} />
        </Space>
      );
    },
  },

];
