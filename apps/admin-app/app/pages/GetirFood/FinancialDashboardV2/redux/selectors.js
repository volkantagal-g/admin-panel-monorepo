import { get, find } from 'lodash';

import { getLangKey } from '@shared/i18n';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FOOD.FINANCIAL_DASHBOARD_V2;

export const getFinancialDashboardPayoutDetail = {
  getData: state => {
    const data = state?.[reducerKey]?.financialDashboardPayoutDetail?.data;

    const payoutInfo = get(data, 'payoutInfo', []);
    const nightData = find(payoutInfo, item => get(item, ['payoutTime', 'en'], '').toLowerCase() === 'morning');
    const afternoonData = find(payoutInfo, item => get(item, ['payoutTime', 'en'], '').toLowerCase() === 'afternoon');

    return {
      night: {
        payoutAmount: get(nightData, 'payoutAmount', 0),
        paidAmount: get(nightData, 'paidAmount', 0),
        remainingAmount: get(nightData, 'remainingAmount', 0),
        paidRestaurantCount: get(nightData, 'paidRestaurantCount', 0),
        payoutStatus: get(nightData, ['payoutStatus', getLangKey()], '-'),
        payoutBank: get(nightData, 'bank', '-'),
      },
      afternoon: {
        payoutAmount: get(afternoonData, 'payoutAmount', 0),
        paidAmount: get(afternoonData, 'paidAmount', 0),
        remainingAmount: get(afternoonData, 'remainingAmount', 0),
        paidRestaurantCount: get(afternoonData, 'paidRestaurantCount', 0),
        payoutStatus: get(afternoonData, ['payoutStatus', getLangKey()], '-'),
        payoutBank: get(afternoonData, 'bank', '-'),
      },
      totalPayoutAmount: get(data, 'totalPayoutAmount', 0),
      totalPaidAmount: get(data, 'totalPaidAmount', 0),
      totalRemainingAmount: get(data, 'totalRemainingAmount', 0),
      totalRestaurantCount: get(data, 'totalRestaurantCount', 0),
    };
  },
  getCurrentData: state => {
    const data = state?.[reducerKey]?.financialDashboardPayoutDetail?.data;

    return {
      estimatedPaybackAmount: get(data, ['dailyPayoutFinancialSummary', 'estimatedPaybackAmount'], 0),
      estimatedAfternoonPaybackAmount: get(data, ['dailyPayoutFinancialSummary', 'estimatedAfternoonPaybackAmount'], 0),
      estimatedNightPaybackAmount: get(data, ['dailyPayoutFinancialSummary', 'estimatedMorningPaybackAmount'], 0),
      amountToBePaid: get(data, ['dailyPayoutFinancialSummary', 'amountToBePaid'], 0),
    };
  },
  getIsPending: state => state?.[reducerKey]?.financialDashboardPayoutDetail?.isPending,
};

export const getFinancialDashboardBankBalances = {
  getData: state => state?.[reducerKey]?.financialDashboardBankBalances?.data?.bankBalances,
  getIsPending: state => state?.[reducerKey]?.financialDashboardBankBalances?.isPending,
};

export const exportFailedPaybacksToExcel = { getIsPending: state => state?.[reducerKey]?.exportFailedPaybacksToExcel?.isPending };

export const paymentDetailsSummarySelector = {
  getData: state => {
    return {
      paymentDetails: state?.[reducerKey]?.paymentDetailsSummary?.data?.paymentDetails || [],
      totalCount: state?.[reducerKey]?.paymentDetailsSummary?.data?.totalCount || 0,
    };
  },
  getIsPending: state => state?.[reducerKey]?.paymentDetailsSummary.isPending,
  getPaymentDetailsSummaryFilters: state => state?.[reducerKey]?.paymentDetailsSummaryFilters,
};
