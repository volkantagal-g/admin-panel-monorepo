import { Tag } from 'antd';

import { formatDate } from '@shared/utils/dateHelper';
import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { STATEMENT_DATA_STATUS_COLOR_MAP } from '../../constants';
import { DOMAIN_TAG_COLOR } from '@app/pages/Payment/Reconciliation/constants';

export const columns = t => [
  {
    title: t('reconciliationDailyReport:FILTER.POS_BANK.TITLE'),
    dataIndex: 'source',
    key: 'source',
    width: 200,
    align: 'center',
    sorter: (a, b) => a.source.localeCompare(b.source),
  },
  {
    title: t('reconciliationDailyReport:FILTER.DOMAIN.TITLE'),
    dataIndex: 'domain',
    key: 'domain',
    width: 200,
    align: 'center',
    render: domain => {
      return <Tag color={DOMAIN_TAG_COLOR}> {t(`bankReconciliationReportPage:DOMAINS.${domain}`)} </Tag>;
    },
    sorter: (a, b) => a.domain.localeCompare(b.domain),

  },
  {
    title: t('reconciliationDailyReport:FILTER.REPORT_CHECK_DATE.TITLE'),
    dataIndex: 'checkDate',
    key: 'checkDate',
    width: 200,
    align: 'center',
    render: checkDate => {
      return formatDate(checkDate, DEFAULT_DATE_FORMAT);
    },
    sorter: (a, b) => new Date(a.checkDate) - new Date(b.checkDate),

  },
  {
    title: t('reconciliationDailyReport:STATEMENT_DATA_STATUS'),
    dataIndex: 'statementDataStatus',
    key: 'statementDataStatus',
    width: 200,
    align: 'center',
    render: statementDataStatus => {
      return <Tag color={STATEMENT_DATA_STATUS_COLOR_MAP[statementDataStatus]}> {statementDataStatus} </Tag>;
    },
    sorter: (a, b) => a.statementDataStatus.localeCompare(b.statementDataStatus),
  },
];
