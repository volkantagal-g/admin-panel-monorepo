import { createReducer } from 'reduxsauce';

import { TAX_TYPE, TAX_TYPE_TEXT } from '@shared/shared/constants';
import { Types } from './actions';

export const INITIAL_STATE = {
  earnings: {
    data: [],
    warehouses: [],
    isPending: false,
    filter: { financialMonths: [] },
  },
  voyagerEarnings: {
    data: [],
    warehouses: [],
    isPending: false,
    filter: { financialMonths: [] },
  },
  taxType: {
    key: TAX_TYPE.EXCLUDED,
    text: TAX_TYPE_TEXT.EXCLUDED,
  },
};

export const earningsRequest = (state = INITIAL_STATE, { financialMonths }) => ({
  ...state,
  earnings: {
    ...state.earnings,
    isPending: true,
    filter: {
      ...state.earnings.filter,
      financialMonths,
    },
  },
});

export const earningsSuccess = (state = INITIAL_STATE, { data: earningsData, warehouses }) => {
  const tempData = {};
  earningsData.forEach(warehouseMonthEarningData => {
    const [key] = Object.keys(warehouseMonthEarningData);
    tempData[key] = warehouseMonthEarningData[key];
  });

  return {
    ...state,
    earnings: {
      ...state.earnings,
      isPending: false,
      data: tempData,
      warehouses,
    },
  };
};

export const earningsFailure = (state = INITIAL_STATE) => ({
  ...state,
  earnings: {
    ...state.earnings,
    isPending: false,
    warehouses: [],
    data: [],
  },
});

export const voyagerEarningsRequest = (state = INITIAL_STATE, { financialMonths }) => ({
  ...state,
  voyagerEarnings: {
    ...state.voyagerEarnings,
    isPending: true,
    filter: {
      ...state.voyagerEarnings.filter,
      financialMonths,
    },
  },
});

export const voyagerEarningsSuccess = (state = INITIAL_STATE, { data: earningsData = [], warehouses = [] }) => {
  const tempData = {};
  earningsData.forEach(warehouseMonthEarningData => {
    const [key] = Object.keys(warehouseMonthEarningData);
    tempData[key] = warehouseMonthEarningData[key];
  });
  return {
    ...state,
    voyagerEarnings: {
      ...state.voyagerEarnings,
      isPending: false,
      data: tempData,
      warehouses,
    },
  };
};

export const voyagerEarningsFailure = (state = INITIAL_STATE) => ({
  ...state,
  voyagerEarnings: {
    ...state.voyagerEarnings,
    isPending: false,
    warehouses: [],
    data: [],
  },
});

export const changeTaxType = (state = INITIAL_STATE, { taxType }) => {
  let taxTypeText = '';
  switch (taxType) {
    case TAX_TYPE.INCLUDED:
      taxTypeText = TAX_TYPE_TEXT.INCLUDED;
      break;
    case TAX_TYPE.EXCLUDED:
      taxTypeText = TAX_TYPE_TEXT.EXCLUDED;
      break;
    default:
      break;
  }

  return ({
    ...state,
    taxType: {
      ...state.taxType,
      key: taxType,
      text: taxTypeText,
    },
  });
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_EARNINGS_REQUEST]: earningsRequest,
  [Types.GET_EARNINGS_SUCCESS]: earningsSuccess,
  [Types.GET_EARNINGS_FAILURE]: earningsFailure,
  [Types.GET_VOYAGER_EARNINGS_REQUEST]: voyagerEarningsRequest,
  [Types.GET_VOYAGER_EARNINGS_SUCCESS]: voyagerEarningsSuccess,
  [Types.GET_VOYAGER_EARNINGS_FAILURE]: voyagerEarningsFailure,
  [Types.CHANGE_TAX_TYPE]: changeTaxType,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
