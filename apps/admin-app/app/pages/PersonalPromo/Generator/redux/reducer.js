import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  createPersonalPromosBulk: {
    isPending: false,
    data: [],
  },
  getDepartments: {
    isPending: false,
    data: [],
  },
};

const createPersonalPromosBulkRequest = (state = INITIAL_STATE) => ({
  ...state,
  createPersonalPromosBulk: {
    ...state.createPersonalPromosBulk,
    isPending: true,
    data: [],
  },
});

const createPersonalPromosBulkSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  createPersonalPromosBulk: {
    ...state.createPersonalPromosBulk,
    isPending: false,
    data,
  },
});

const createPersonalPromosBulkFailure = (state = INITIAL_STATE) => ({
  ...state,
  createPersonalPromosBulk: {
    ...state.createPersonalPromosBulk,
    isPending: false,
  },
});

const getDepartmentsRequest = (state = INITIAL_STATE) => ({
  ...state,
  getDepartments: {
    ...state.getDepartments,
    isPending: true,
    data: [],
  },
});

const getDepartmentsSuccess = (state = INITIAL_STATE, { data }) => ({
  ...state,
  getDepartments: {
    ...state.getDepartments,
    isPending: false,
    data,
  },
});

const getDepartmentsFailure = (state = INITIAL_STATE) => ({
  ...state,
  getDepartments: {
    ...state.getDepartments,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.CREATE_PERSONAL_PROMOS_BULK_REQUEST]: createPersonalPromosBulkRequest,
  [Types.CREATE_PERSONAL_PROMOS_BULK_SUCCESS]: createPersonalPromosBulkSuccess,
  [Types.CREATE_PERSONAL_PROMOS_BULK_FAILURE]: createPersonalPromosBulkFailure,
  [Types.GET_DEPARTMENTS_REQUEST]: getDepartmentsRequest,
  [Types.GET_DEPARTMENTS_SUCCESS]: getDepartmentsSuccess,
  [Types.GET_DEPARTMENTS_FAILURE]: getDepartmentsFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
