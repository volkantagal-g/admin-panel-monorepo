import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  shiftPlanReport: { isPending: false },
  slotPerformanceReport: { isPending: false },
  slotChangeLogReport: { isPending: false },
  slotSelectionReport: { isPending: false },
  leaveManagementReport: { isPending: false },
};

const shiftPlanReportRequest = state => ({
  ...state,
  shiftPlanReport: {
    ...state.shiftPlanReport,
    isPending: true,
  },
});

const shiftPlanReportSuccess = state => ({
  ...state,
  shiftPlanReport: {
    ...state.shiftPlanReport,
    isPending: false,
  },
});

const shiftPlanReportFailure = state => ({
  ...state,
  shiftPlanReport: {
    ...state.shiftPlanReport,
    isPending: false,
  },
});

const slotPerformanceReportRequest = state => ({
  ...state,
  slotPerformanceReport: {
    ...state.slotPerformanceReport,
    isPending: true,
  },
});

const slotPerformanceReportSuccess = state => ({
  ...state,
  slotPerformanceReport: {
    ...state.slotPerformanceReport,
    isPending: false,
  },
});

const slotPerformanceReportFailure = state => ({
  ...state,
  slotPerformanceReport: {
    ...state.slotPerformanceReport,
    isPending: false,
  },
});

const slotChangeLogReportRequest = state => ({
  ...state,
  slotChangeLogReport: {
    ...state.slotChangeLogReport,
    isPending: true,
  },
});

const slotChangeLogReportSuccess = state => ({
  ...state,
  slotChangeLogReport: {
    ...state.slotChangeLogReport,
    isPending: false,
  },
});

const slotChangeLogReportFailure = state => ({
  ...state,
  slotChangeLogReport: {
    ...state.slotChangeLogReport,
    isPending: false,
  },
});

const slotSelectionReportRequest = state => ({
  ...state,
  slotSelectionReport: {
    ...state.slotSelectionReport,
    isPending: true,
  },
});

const slotSelectionReportSuccess = state => ({
  ...state,
  slotSelectionReport: {
    ...state.slotSelectionReport,
    isPending: false,
  },
});

const slotSelectionReportFailure = state => ({
  ...state,
  slotSelectionReport: {
    ...state.slotSelectionReport,
    isPending: false,
  },
});

const leaveManagementReportRequest = state => ({
  ...state,
  leaveManagementReport: {
    ...state.leaveManagementReport,
    isPending: true,
  },
});

const leaveManagementReportSuccess = state => ({
  ...state,
  leaveManagementReport: {
    ...state.leaveManagementReport,
    isPending: false,
  },
});

const leaveManagementReportFailure = state => ({
  ...state,
  leaveManagementReport: {
    ...state.leaveManagementReport,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_SHIFT_PLAN_REPORT_REQUEST]: shiftPlanReportRequest,
  [Types.GET_SHIFT_PLAN_REPORT_SUCCESS]: shiftPlanReportSuccess,
  [Types.GET_SHIFT_PLAN_REPORT_FAILURE]: shiftPlanReportFailure,
  [Types.GET_SLOT_PERFORMANCE_REPORT_REQUEST]: slotPerformanceReportRequest,
  [Types.GET_SLOT_PERFORMANCE_REPORT_SUCCESS]: slotPerformanceReportSuccess,
  [Types.GET_SLOT_PERFORMANCE_REPORT_FAILURE]: slotPerformanceReportFailure,
  [Types.GET_SLOT_CHANGE_LOG_REPORT_REQUEST]: slotChangeLogReportRequest,
  [Types.GET_SLOT_CHANGE_LOG_REPORT_SUCCESS]: slotChangeLogReportSuccess,
  [Types.GET_SLOT_CHANGE_LOG_REPORT_FAILURE]: slotChangeLogReportFailure,
  [Types.GET_SLOT_SELECTION_REPORT_REQUEST]: slotSelectionReportRequest,
  [Types.GET_SLOT_SELECTION_REPORT_SUCCESS]: slotSelectionReportSuccess,
  [Types.GET_SLOT_SELECTION_REPORT_FAILURE]: slotSelectionReportFailure,
  [Types.GET_LEAVE_MANAGEMENT_REPORT_REQUEST]: leaveManagementReportRequest,
  [Types.GET_LEAVE_MANAGEMENT_REPORT_SUCCESS]: leaveManagementReportSuccess,
  [Types.GET_LEAVE_MANAGEMENT_REPORT_FAILURE]: leaveManagementReportFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
