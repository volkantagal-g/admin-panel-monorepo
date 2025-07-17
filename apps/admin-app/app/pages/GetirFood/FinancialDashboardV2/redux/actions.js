import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { getInitialPaymentSummaryFilters } from '../utils';

const prefix = `${REDUX_KEY.FOOD.FINANCIAL_DASHBOARD_V2}_`;

export const { Types, Creators } = createActions(
  {
    getFinancialDashboardPayoutDetailRequest: { payoutDate: null },
    getFinancialDashboardPayoutDetailSuccess: { data: {} },
    getFinancialDashboardPayoutDetailFailure: { error: null },
    getFinancialDashboardBankBalancesRequest: { },
    getFinancialDashboardBankBalancesSuccess: { data: {} },
    getFinancialDashboardBankBalancesFailure: { error: null },
    getPaymentDetailsSummaryRequest: {
      startDate: null,
      skip: null,
      limit: null,
    },
    getPaymentDetailsSummarySuccess: { data: {} },
    getPaymentDetailsSummaryFailure: { error: null },
    paymentDetailsSummaryFilters: { },
    setPaymentDetailsSummaryFilters: { ...getInitialPaymentSummaryFilters() },
    exportFailedPaybacksToExcelRequest: { reportDate: null },
    exportFailedPaybacksToExcelSuccess: { data: {} },
    exportFailedPaybacksToExcelFailure: { error: null },
    initPage: null,
    destroyPage: null,
  },
  { prefix },
);
