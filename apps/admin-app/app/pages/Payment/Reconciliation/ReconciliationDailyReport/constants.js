import moment from 'moment';

import { DEFAULT_DATE_FORMAT } from '@shared/shared/constants';
import { ALL_DOMAIN_OPTIONS } from '../constants';

export const INIT_FILTERS = {
  page: 1,
  pageSize: 50,
  reportCheckDate: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
  reportCheckStartDate: moment().subtract(1, 'days').format(DEFAULT_DATE_FORMAT),
  reportCheckEndDate: moment().subtract(1, 'days').format(DEFAULT_DATE_FORMAT),
  reportRequestDate: null,
  reportRequestStartDate: null,
  reportRequestEndDate: null,
  domainTypes: [],
  sourceOfStatements: [],
};

export const STATEMENT_DATA_STATUS_COLOR_MAP = {
  RowsSeperated: 'green',
  S3Uploaded: 'yellow',
  ReadyToS3Upload: 'coral',
};

export const EXTENDED_DOMAIN_OPTIONS = t => [...ALL_DOMAIN_OPTIONS(t), {
  label: t('bankReconciliationReportPage:DOMAINS.GetirDrive'),
  value: 71,
},
{
  label: t('bankReconciliationReportPage:DOMAINS.GetirUnSpecified'),
  value: 80,
}];
