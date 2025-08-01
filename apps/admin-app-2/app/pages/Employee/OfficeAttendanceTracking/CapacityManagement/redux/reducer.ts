import moment from 'moment';
import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  capacityTemplateData: {
    isPending: false,
    data: {},
  },
  filters: {
    startDay: moment().startOf('day'),
    endDay: moment().startOf('day'),
  },
  importedData: { data: [] },
  uploadCapacityData: { isPending: false },
  publicHolidays: {
    data: [],
    isPending: false,
  },
  exclusionFilters: {
    excludePastData: false,
    excludePublicHolidays: false,
    excludeWeekends: false,
  },
  invalidEmails: { data: [] },
};

const getPublicHolidaysRequest = state => ({
  ...state,
  publicHolidays: {
    ...state.publicHolidays,
    isPending: true,
  },
});

const getPublicHolidaysSuccess = (state, payload) => (
  {
    ...state,
    publicHolidays: {
      data: payload.data || [],
      isPending: false,
    },
  }
);

const getPublicHolidaysFailure = state => ({
  ...state,
  publicHolidays: {
    ...state.publicHolidays,
    isPending: false,
  },
});

const getCapacityTemplateDataRequest = state => ({
  ...state,
  capacityTemplateData: {
    ...state.capacityTemplateData,
    isPending: true,
  },
});

const getCapacityTemplateDataSuccess = (state, { data }) => ({
  ...state,
  capacityTemplateData: {
    ...state.capacityTemplateData,
    isPending: false,
    data,
  },
});

const getCapacityTemplateDataFailure = state => ({
  ...state,
  capacityTemplateData: {
    ...state.capacityTemplateData,
    isPending: false,
  },
});

const setTemplateFilters = (state, { filters }) => ({
  ...state,
  filters: {
    ...state.filters,
    ...filters,
  },
});

const setExclusionFilters = (state, { filters }) => ({
  ...state,
  exclusionFilters: {
    ...state.exclusionFilters,
    ...filters,
  },
});

const setImportedData = (state, { data }) => ({
  ...state,
  importedData: {
    ...state.importedData,
    data,
  },
});

const resetImportedData = state => ({
  ...state,
  importedData: { data: [] },
});

const uploadCapacityDataRequest = state => ({
  ...state,
  uploadCapacityData: {
    ...state.uploadCapacityData,
    isPending: true,
  },
});

const uploadCapacityDataSuccess = (state, { invalidEmails }) => ({
  ...state,
  uploadCapacityData: {
    ...state.uploadCapacityData,
    isPending: false,
  },
  importedData: { data: [] },
  invalidEmails: { data: invalidEmails },
});

const uploadCapacityDataFailure = state => ({
  ...state,
  uploadCapacityData: {
    ...state.uploadCapacityData,
    isPending: false,
  },
});

const resetInvalidEmails = state => ({
  ...state,
  invalidEmails: {
    ...state.invalidEmails,
    data: [],
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_PUBLIC_HOLIDAYS_REQUEST]: getPublicHolidaysRequest,
  [Types.GET_PUBLIC_HOLIDAYS_SUCCESS]: getPublicHolidaysSuccess,
  [Types.GET_PUBLIC_HOLIDAYS_FAILURE]: getPublicHolidaysFailure,
  [Types.GET_CAPACITY_TEMPLATE_DATA_REQUEST]: getCapacityTemplateDataRequest,
  [Types.GET_CAPACITY_TEMPLATE_DATA_SUCCESS]: getCapacityTemplateDataSuccess,
  [Types.GET_CAPACITY_TEMPLATE_DATA_FAILURE]: getCapacityTemplateDataFailure,
  [Types.UPLOAD_CAPACITY_DATA_REQUEST]: uploadCapacityDataRequest,
  [Types.UPLOAD_CAPACITY_DATA_SUCCESS]: uploadCapacityDataSuccess,
  [Types.UPLOAD_CAPACITY_DATA_FAILURE]: uploadCapacityDataFailure,
  [Types.SET_TEMPLATE_FILTERS]: setTemplateFilters,
  [Types.SET_IMPORTED_DATA]: setImportedData,
  [Types.RESET_IMPORTED_DATA]: resetImportedData,
  [Types.RESET_INVALID_EMAILS]: resetInvalidEmails,
  [Types.DESTROY_PAGE]: destroyPage,
  [Types.SET_EXCLUSION_FILTERS]: setExclusionFilters,
};

export default createReducer(INITIAL_STATE, HANDLERS);
