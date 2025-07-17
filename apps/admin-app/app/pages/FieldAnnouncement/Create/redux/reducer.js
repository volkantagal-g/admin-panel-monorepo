import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  products: {
    data: [],
    isPending: false,
    error: null,
  },
  form: {
    data: {},
    isPending: false,
    error: null,
  },
  createFranchiseAnnouncement: {
    isPending: false,
    error: null,
  },
};

export const createWarehouseAnnouncementRequest = (state, { requestBody }) => {
  return {
    ...state,
    form: {
      ...state.form,
      data: requestBody,
      isPending: true,
    },
  };
};

export const createWarehouseAnnouncementSuccess = (state, { data }) => {
  return {
    ...state,
    form: {
      ...state.form,
      data,
      isPending: false,
    },
  };
};

export const createWarehouseAnnouncementFailure = (state, { error }) => {
  return {
    ...state,
    form: {
      ...state.form,
      isPending: false,
      error,
    },
  };
};

export const createFranchiseAnnouncementRequest = state => {
  return {
    ...state,
    createFranchiseAnnouncement: {
      ...state.createFranchiseAnnouncement,
      isPending: true,
    },
  };
};

export const createFranchiseAnnouncementSuccess = state => {
  return {
    ...state,
    createFranchiseAnnouncement: {
      ...state.createFranchiseAnnouncement,
      isPending: false,
    },
  };
};

export const createFranchiseAnnouncementFailure = (state, { error }) => {
  return {
    ...state,
    createFranchiseAnnouncement: {
      ...state.createFranchiseAnnouncement,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.CREATE_WAREHOUSE_ANNOUNCEMENT_REQUEST]: createWarehouseAnnouncementRequest,
  [Types.CREATE_WAREHOUSE_ANNOUNCEMENT_SUCCESS]: createWarehouseAnnouncementSuccess,
  [Types.CREATE_WAREHOUSE_ANNOUNCEMENT_FAILURE]: createWarehouseAnnouncementFailure,
  [Types.CREATE_FRANCHISE_ANNOUNCEMENT_REQUEST]: createFranchiseAnnouncementRequest,
  [Types.CREATE_FRANCHISE_ANNOUNCEMENT_SUCCESS]: createFranchiseAnnouncementSuccess,
  [Types.CREATE_FRANCHISE_ANNOUNCEMENT_FAILURE]: createFranchiseAnnouncementFailure,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
