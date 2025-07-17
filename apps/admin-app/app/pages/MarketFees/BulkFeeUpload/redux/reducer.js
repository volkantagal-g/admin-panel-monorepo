import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { franchiseUserRoleListSelector } from '@app/pages/MarketFranchise/User/RoleGroup/Detail/redux/selectors';

export const INITIAL_STATE = {
  bulkFeeUpload: { fees: {}, error: null, isPending: false },
  basketAmountsBulkUpload: {
    basketAmounts: null,
    isPending: false,
    error: null,
  },
};

export const marketFeesBulkUploadRequest = (state = INITIAL_STATE) => {
  return {
    ...state.bulkFeeUpload,
    isPending: true,
  };
};

export const marketFeesBulkUploadSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state.bulkFeeUpload,
    isPending: false,
    fees: data,
  };
};

export const marketFeesBulkUploadFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state.bulkFeeUpload,
    isPending: franchiseUserRoleListSelector,
    fees: {},
    error,
  };
};

export const basketAmountBulkUploadRequest = (state = INITIAL_STATE) => {
  return {
    ...state.basketAmountsBulkUpload,
    isPending: true,
  };
};

export const basketAmountBulkUploadSuccess = (
  state = INITIAL_STATE,
  { data },
) => {
  return {
    ...state.basketAmountsBulkUpload,
    basketAmounts: data,
    isPending: false,
  };
};

export const basketAmountBulkUploadFailure = (
  state = INITIAL_STATE,
  { error },
) => {
  return {
    ...state.basketAmountsBulkUpload,
    error,
    isPending: false,
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.MARKET_FEES_BULK_UPLOAD_REQUEST]: marketFeesBulkUploadRequest,
  [Types.MARKET_FEES_BULK_UPLOAD_SUCCESS]: marketFeesBulkUploadSuccess,
  [Types.MARKET_FEES_BULK_UPLOAD_FAILURE]: marketFeesBulkUploadFailure,
  [Types.BASKET_AMOUNT_BULK_UPLOAD_REQUEST]: basketAmountBulkUploadRequest,
  [Types.BASKET_AMOUNT_BULK_UPLOAD_SUCCESS]: basketAmountBulkUploadSuccess,
  [Types.BASKET_AMOUNT_BULK_UPLOAD_FAILURE]: basketAmountBulkUploadFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
