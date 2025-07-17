import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getMealCardReconciliationRequest: { 
    startDateEpoch: null,
    endDateEpoch: null,
    currentPage: null, 
    pageSize: null, 
    reconciliationMode: null,
    orderId: null,
  },
  getMealCardReconciliationSuccess: { data: {} },
  getMealCardReconciliationFailure: { error: null },
  exportExcelRequest: { 
    startDateEpoch: null,
    endDateEpoch: null,
    currentPage: null, 
    pageSize: null, 
    reconciliationMode: null,
    orderId: null,
  },
  exportExcelSuccess: { data: {} },
  exportExcelFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.FOOD.MEAL_CARD_RECONCILIATION}_` });
