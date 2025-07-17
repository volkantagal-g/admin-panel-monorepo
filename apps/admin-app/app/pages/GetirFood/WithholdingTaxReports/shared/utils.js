import moment from 'moment';

import { TAB_ITEMS, DEFAULT_PARAMS, WITHHOLDING_TAX_REPORT_FILTER_TYPE } from './constants';

export const getTabItems = t => [
  {
    label: t('TABS.SIMPLE_PROCEDURE'),
    children: null,
    key: TAB_ITEMS.SIMPLE_PROCEDURE,
  },
  {
    label: t('TABS.INDIVIDUAL'),
    children: null,
    key: TAB_ITEMS.INDIVIDUAL,
  },
  {
    label: t('TABS.CORPORATE'),
    children: null,
    key: TAB_ITEMS.CORPORATE,
  },
];

export const decodeQueryParams = queryString => {
  const params = Object.fromEntries(new URLSearchParams(queryString));

  return {
    tab: params?.tab || DEFAULT_PARAMS.tab,
    page: Number(params?.page) || DEFAULT_PARAMS.page,
    size: Number(params?.size) || DEFAULT_PARAMS.size,
    period: params?.period || moment().format('YYYY-MM'),
    ...(params?.partnerId && params?.partnerName && { partnerId: params?.partnerId, partnerName: params?.partnerName }),
  };
};

const CURRENT_MONTH_END = moment().endOf('month');

export const getIsDateDisabled = date => {
  return date && date.isAfter(CURRENT_MONTH_END);
};

export const getFilterTypeOptions = (t, translationPrefix) => [
  { value: WITHHOLDING_TAX_REPORT_FILTER_TYPE.ALL, label: t(`${translationPrefix}:SUMMARY.FILTER_TYPES.ALL_RECORDS`) },
  { value: WITHHOLDING_TAX_REPORT_FILTER_TYPE.INCLUDED, label: t(`${translationPrefix}:SUMMARY.FILTER_TYPES.WITHHOLDING_TAX_INCLUDED`) },
  { value: WITHHOLDING_TAX_REPORT_FILTER_TYPE.NOT_INCLUDED, label: t(`${translationPrefix}:SUMMARY.FILTER_TYPES.WITHHOLDING_TAX_NOT_INCLUDED`) },
  { value: WITHHOLDING_TAX_REPORT_FILTER_TYPE.PAYMENT_AT_DOOR, label: t(`${translationPrefix}:SUMMARY.FILTER_TYPES.PAYMENT_AT_DOOR`) },
];
