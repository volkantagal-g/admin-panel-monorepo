import moment from 'moment';

import { API_DATE_FORMAT, INITIAL_PAGINATION } from './constants';
import { TAB_ITEMS } from '../FinancialDashboardV2Detail/constants';

export const getMinDate = () => moment('2024-08-01');

export const getInitialPaymentSummaryFilters = () => {
  return {
    startDate: moment(),
    ...INITIAL_PAGINATION,
  };
};

export const getPaymentDetailsSummaryAPIPayload = filters => ({
  startDate: moment(filters?.startDate).format(API_DATE_FORMAT),
  skip: (filters.currentPage - 1) * filters.rowsPerPage,
  limit: filters.rowsPerPage,
});

export const encodeQueryParams = params => Object.keys(params)
  .map(key => (Array.isArray(params[key])
    ? `${encodeURIComponent(key)}=${encodeURIComponent(params[key].join(','))}`
    : `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`))
  .join('&');

export const handleDecodedParams = params => {
  return {
    deferredPaymentDate: params?.deferredPaymentDate,
    rowsPerPage: Number(params?.rowsPerPage) ?? 10,
    currentPage: Number(params?.currentPage) ?? 1,
    activeTab: params?.activeTab ?? TAB_ITEMS.SINGLE,
    id: params?.id,
    isChain: params?.isChain,
  };
};

export const decodeQueryParams = queryString => {
  const urlParams = new URLSearchParams(queryString);
  const params = {};

  urlParams.forEach((value, key) => {
    params[key] = value.includes(',')
      ? value.split(',').map(decodeURIComponent)
      : decodeURIComponent(value);
  });

  return handleDecodedParams(params);
};
