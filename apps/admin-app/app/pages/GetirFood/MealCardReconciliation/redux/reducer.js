import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  mealCardReconciliation: {
    data: {},
    isPending: false,
    error: null,
  },
  exportExcel: {
    data: {},
    isPending: false,
    error: null,
  },
};

export const getMealCardReconciliationRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    mealCardReconciliation: {
      ...state.mealCardReconciliation,
      isPending: true,
    },
  };
};

export const getMealCardReconciliationSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    mealCardReconciliation: {
      ...state.mealCardReconciliation,
      data,
      isPending: false,
    },
  };
};

export const getMealCardReconciliationFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    mealCardReconciliation: {
      ...state.mealCardReconciliation,
      isPending: false,
      error,
    },
  };
};

export const exportExcelRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    exportExcel: {
      ...state.exportExcel,
      isPending: true,
    },
  };
};

export const exportExcelSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    exportExcel: {
      ...state.exportExcel,
      data,
      isPending: false,
    },
  };
};

export const exportExcelFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    exportExcel: {
      ...state.exportExcel,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_MEAL_CARD_RECONCILIATION_REQUEST]: getMealCardReconciliationRequest,
  [Types.GET_MEAL_CARD_RECONCILIATION_SUCCESS]: getMealCardReconciliationSuccess,
  [Types.GET_MEAL_CARD_RECONCILIATION_FAILURE]: getMealCardReconciliationFailure,

  [Types.EXPORT_EXCEL_REQUEST]: exportExcelRequest,
  [Types.EXPORT_EXCEL_SUCCESS]: exportExcelSuccess,
  [Types.EXPORT_EXCEL_FAILURE]: exportExcelFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
