import { createSelector } from 'reselect';
import { get } from 'lodash';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FOOD.MEAL_CARD_RECONCILIATION;

export const getMealCardReconciliation = {
  getSummaryData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'mealCardReconciliation', 'data');
    },
    ({ data }) => {
      const summary = data?.summary?.data;
      const result = {
        getirFood: {
          totalOrderCount: get(summary, ['internal', 'count'], 0),
          totalPaymentAmount: get(summary, ['internal', 'totalPaymentAmount'], 0),
          totalRefundAmount: get(summary, ['internal', 'totalRefundAmount'], 0),
          totalNetAmount: get(summary, ['internal', 'totalAmount'], 0),
        },
        mealCard: {
          totalOrderCount: get(summary, ['external', 'count'], 0),
          totalPaymentAmount: get(summary, ['external', 'totalPaymentAmount'], 0),
          totalRefundAmount: get(summary, ['external', 'totalRefundAmount'], 0),
          totalNetAmount: get(summary, ['external', 'totalAmount'], 0),
        },
      };
      return result;
    }
  ),
  getTableData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'mealCardReconciliation', 'data');
    },
    ({ data }) => {
      const detail = data?.detail?.data;
      const result = {
        total: get(detail, 'totalItems', 0),
        data: get(detail, 'reconciliationItemDetailDto', []).map(item => ({
          date: item?.internal?.transactionEpoch  || item?.external?.transactionEpoch,
          orderId: item?.orderId,
          type: item?.internal?.transactionType || item?.external?.transactionType,
          getirAmount: item?.internal?.amount || '-',
          mealCardAmount: item?.external?.amount || '-',
          reconciled: item?.reconciled,
        })),
      };
      return result;
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'mealCardReconciliation', 'isPending');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const exportExcel = {
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'exportExcel', 'isPending');
    return isPending;
  },
};
