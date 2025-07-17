import moment from 'moment';

import Summary from './components/Summary';
import Failed from './components/Failed';
import Success from './components/Success';
import { TAB_ITEMS } from './constants';
import { removeEmptyFieldsFromParams } from '@shared/utils/request';

export const getTabItems = t => [
  {
    label: t('SUMMARY.TITLE'),
    children: <Summary />,
    key: TAB_ITEMS.SUMMARY,
  },
  {
    label: t('FAILED.TITLE'),
    children: <Failed />,
    key: TAB_ITEMS.FAILED,
  },
  {
    label: t('SUCCESS.TITLE'),
    children: <Success />,
    key: TAB_ITEMS.SUCCESS,
  },
];

export const getFailedOrSuccessAPIPayload = filters => {
  const payload = {
    startDate: moment(filters?.dateRange[0]).startOf('day').format('YYYY-MM-DD'),
    endDate: moment(filters?.dateRange[1]).endOf('day').format('YYYY-MM-DD'),
    orderTypes: filters?.orderTypes,
    traceId: filters?.traceId,
    orderId: filters?.orderId,
    skip: (filters.currentPage - 1) * filters.rowsPerPage,
    limit: filters.rowsPerPage,
  };

  return removeEmptyFieldsFromParams(payload);
};
