import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { COURIER_PLAN_TYPE_KEYS } from '../constants';

const INITIAL_STATE = {
  response: {
    isPending: false,
    error: null,
  },
  planType: COURIER_PLAN_TYPE_KEYS.STANDARD,
  courierSlotCapacityExcel: { isPending: false },
};

const publishCourierPlanRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      isPending: true,
    },
  };
};

const publishCourierPlanSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      isPending: false,
    },
  };
};

const publishCourierPlanFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    response: {
      ...INITIAL_STATE.response,
      isPending: false,
      error,
    },
  };
};

const updateCourierPlanType = (state = INITIAL_STATE, { planType }) => {
  return {
    ...state,
    planType,
  };
};

const exportCourierSlotCapacityExcelRequest = state => ({
  ...state,
  courierSlotCapacityExcel: { isPending: true },
});

const exportCourierSlotCapacityExcelSuccess = state => ({
  ...state,
  courierSlotCapacityExcel: { isPending: false },
});

const exportCourierSlotCapacityExcelFailure = state => ({
  ...state,
  courierSlotCapacityExcel: { isPending: false },
});

const destroy = () => {
  return { ...INITIAL_STATE };
};

const HANDLERS = {
  [Types.PUBLISH_COURIER_PLAN_REQUEST]: publishCourierPlanRequest,
  [Types.PUBLISH_COURIER_PLAN_SUCCESS]: publishCourierPlanSuccess,
  [Types.PUBLISH_COURIER_PLAN_FAILURE]: publishCourierPlanFailure,
  [Types.UPDATE_COURIER_PLAN_TYPE]: updateCourierPlanType,
  [Types.EXPORT_COURIER_SLOT_CAPACITY_EXCEL_REQUEST]: exportCourierSlotCapacityExcelRequest,
  [Types.EXPORT_COURIER_SLOT_CAPACITY_EXCEL_SUCCESS]: exportCourierSlotCapacityExcelSuccess,
  [Types.EXPORT_COURIER_SLOT_CAPACITY_EXCEL_FAILURE]: exportCourierSlotCapacityExcelFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
