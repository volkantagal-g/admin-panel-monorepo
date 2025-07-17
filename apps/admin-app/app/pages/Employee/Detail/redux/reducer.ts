import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export type State = {
  isFirstLoadDone: boolean,
  employee: {
    isPending: boolean,
    data: any,
    organizationalInfoChangeLogs: any,
  },
  educations: {
    isPending: boolean,
    data: any,
  },
  updateCompanyInfo: {
    isPending: boolean,
  },
  updateContactInfo: {
    isPending: boolean,
  },
  updateEmployeeInfo: {
    isPending: boolean,
  },
  updateOrganizationInfo: {
    isPending: boolean,
  },
  updatePersonalInfo: {
    isPending: boolean,
  },
  terminateEmployee: {
    isPending: boolean,
  },
  rehireEmployee: {
    isPending: boolean,
  },
  addEducationRequest: {
    isPending: boolean,
  },
  removeEducationRequest: {
    isPending: boolean,
  },
  updateEducationRequest: {
    isPending: boolean,
  },
  surveys: {
    isPending: boolean,
    data: any,
  },
  addSurveyRequest: {
    isPending: boolean,
  },
  updateSurveyRequest: {
    isPending: boolean,
  },
  employeeSurveyHistory: {
    isPending: boolean,
    data: any,
  },
};

export const INITIAL_STATE: State = {
  isFirstLoadDone: false,
  employee: {
    isPending: false,
    data: {},
    organizationalInfoChangeLogs: [],
  },
  educations: {
    isPending: false,
    data: [],
  },
  updateCompanyInfo: { isPending: false },
  updateContactInfo: { isPending: false },
  updateEmployeeInfo: { isPending: false },
  updateOrganizationInfo: { isPending: false },
  updatePersonalInfo: { isPending: false },
  terminateEmployee: { isPending: false },
  rehireEmployee: { isPending: false },
  addEducationRequest: { isPending: false },
  removeEducationRequest: { isPending: false },
  updateEducationRequest: { isPending: false },
  employeeSurveyHistory: {
    isPending: false,
    data: {},
  },
  surveys: {
    isPending: false,
    data: [],
  },
  addSurveyRequest: { isPending: false },
  updateSurveyRequest: { isPending: false },
};

const employeeRequest = (state: State) => ({
  ...state,
  employee: {
    ...state.employee,
    isPending: true,
  },
});
const employeeSuccess = (state: State, { employee, organizationalInfoChangeLogs }: any) => ({
  ...state,
  isFirstLoadDone: true,
  employee: {
    ...state.employee,
    isPending: false,
    data: employee,
    organizationalInfoChangeLogs,
  },
});
const employeeFailure = (state: State) => ({
  ...state,
  employee: {
    ...state.employee,
    isPending: false,
  },
});

const updateCompanyInfoRequest = (state: State) => ({
  ...state,
  updateCompanyInfo: {
    ...state.updateCompanyInfo,
    isPending: true,
  },
});
const updateCompanyInfoSuccess = (state: State) => ({
  ...state,
  updateCompanyInfo: {
    ...state.updateCompanyInfo,
    isPending: false,
  },
});
const updateCompanyInfoFailure = (state: State) => ({
  ...state,
  updateCompanyInfo: {
    ...state.updateCompanyInfo,
    isPending: false,
  },
});

const updateContactInfoRequest = (state: State) => ({
  ...state,
  updateContactInfo: {
    ...state.updateContactInfo,
    isPending: true,
  },
});
const updateContactInfoSuccess = (state: State) => ({
  ...state,
  updateContactInfo: {
    ...state.updateContactInfo,
    isPending: false,
  },
});
const updateContactInfoFailure = (state: State) => ({
  ...state,
  updateContactInfo: {
    ...state.updateContactInfo,
    isPending: false,
  },
});

const updateEmployeeInfoRequest = (state: State) => ({
  ...state,
  updateEmployeeInfo: {
    ...state.updateEmployeeInfo,
    isPending: true,
  },
});
const updateEmployeeInfoSuccess = (state: State) => ({
  ...state,
  updateEmployeeInfo: {
    ...state.updateEmployeeInfo,
    isPending: false,
  },
});
const updateEmployeeInfoFailure = (state: State) => ({
  ...state,
  updateEmployeeInfo: {
    ...state.updateEmployeeInfo,
    isPending: false,
  },
});

const updateOrganizationInfoRequest = (state: State) => ({
  ...state,
  updateOrganizationInfo: {
    ...state.updateOrganizationInfo,
    isPending: true,
  },
});
const updateOrganizationInfoSuccess = (state: State) => ({
  ...state,
  updateOrganizationInfo: {
    ...state.updateOrganizationInfo,
    isPending: false,
  },
});
const updateOrganizationInfoFailure = (state: State) => ({
  ...state,
  updateOrganizationInfo: {
    ...state.updateOrganizationInfo,
    isPending: false,
  },
});

const updatePersonalInfoRequest = (state: State) => ({
  ...state,
  updatePersonalInfo: {
    ...state.updatePersonalInfo,
    isPending: true,
  },
});
const updatePersonalInfoSuccess = (state: State) => ({
  ...state,
  updatePersonalInfo: {
    ...state.updatePersonalInfo,
    isPending: false,
  },
});
const updatePersonalInfoFailure = (state: State) => ({
  ...state,
  updatePersonalInfo: {
    ...state.updatePersonalInfo,
    isPending: false,
  },
});

const terminateEmployeeRequest = (state: State) => ({
  ...state,
  terminateEmployee: {
    ...state.terminateEmployee,
    isPending: true,
  },
});
const terminateEmployeeSuccess = (state: State) => ({
  ...state,
  terminateEmployee: {
    ...state.terminateEmployee,
    isPending: false,
  },
});
const terminateEmployeeFailure = (state: State) => ({
  ...state,
  terminateEmployee: {
    ...state.terminateEmployee,
    isPending: false,
  },
});

const getEmployeeSurveyHistoryRequest = (state: State) => ({
  ...state,
  employeeSurveyHistory: {
    ...state.employeeSurveyHistory,
    isPending: true,
  },
});

const getEmployeeSurveyHistorySuccess = (state: State, { data }: any) => ({
  ...state,
  employeeSurveyHistory: {
    ...state.employeeSurveyHistory,
    isPending: false,
    data,
  },
});

const getEmployeeSurveyHistoryFailure = (state: State) => ({
  ...state,
  employeeSurveyHistory: {
    ...state.employeeSurveyHistory,
    isPending: false,
  },
});

const rehireEmployeeRequest = (state: State) => ({
  ...state,
  rehireEmployee: {
    ...state.rehireEmployee,
    isPending: true,
  },
});
const rehireEmployeeSuccess = (state: State) => ({
  ...state,
  rehireEmployee: {
    ...state.rehireEmployee,
    isPending: false,
  },
});
const rehireEmployeeFailure = (state: State) => ({
  ...state,
  rehireEmployee: {
    ...state.rehireEmployee,
    isPending: false,
  },
});

const addEducationRequest = (state: State) => ({
  ...state,
  addEducationRequest: {
    ...state.addEducationRequest,
    isPending: true,
  },
});
const addEducationSuccess = (state: State) => ({
  ...state,
  addEducationRequest: {
    ...state.addEducationRequest,
    isPending: false,
  },
});
const addEducationFailure = (state: State) => ({
  ...state,
  addEducationRequest: {
    ...state.addEducationRequest,
    isPending: false,
  },
});

const removeEducationRequest = (state: State) => ({
  ...state,
  removeEducationRequest: {
    ...state.removeEducationRequest,
    isPending: true,
  },
});
const removeEducationSuccess = (state: State) => ({
  ...state,
  removeEducationRequest: {
    ...state.removeEducationRequest,
    isPending: false,
  },
});
const removeEducationFailure = (state: State) => ({
  ...state,
  removeEducationRequest: {
    ...state.removeEducationRequest,
    isPending: false,
  },
});

const updateEducationRequest = (state: State) => ({
  ...state,
  updateEducationRequest: {
    ...state.updateEducationRequest,
    isPending: true,
  },
});
const updateEducationSuccess = (state: State) => ({
  ...state,
  updateEducationRequest: {
    ...state.updateEducationRequest,
    isPending: false,
  },
});
const updateEducationFailure = (state: State) => ({
  ...state,
  updateEducationRequest: {
    ...state.updateEducationRequest,
    isPending: false,
  },
});

const getEmployeeEducationsRequest = (state: State) => ({
  ...state,
  educations: {
    ...state.educations,
    isPending: true,
  },
});
const getEmployeeEducationsSuccess = (state: State, { data }: any) => ({
  ...state,
  educations: {
    ...state.educations,
    isPending: false,
    data,
  },
});
const getEmployeeEducationsFailure = (state: State) => ({
  ...state,
  educations: {
    ...state.educations,
    isPending: false,
  },
});

const addSurveyRequest = (state: State) => ({
  ...state,
  addSurveyRequest: {
    ...state.addSurveyRequest,
    isPending: true,
  },
});
const addSurveySuccess = (state: State) => ({
  ...state,
  addSurveyRequest: {
    ...state.addSurveyRequest,
    isPending: false,
  },
});
const addSurveyFailure = (state: State) => ({
  ...state,
  addSurveyRequest: {
    ...state.addSurveyRequest,
    isPending: false,
  },
});

const updateSurveyRequest = (state: State) => ({
  ...state,
  updateSurveyRequest: {
    ...state.updateSurveyRequest,
    isPending: true,
  },
});
const updateSurveySuccess = (state: State) => ({
  ...state,
  updateSurveyRequest: {
    ...state.updateSurveyRequest,
    isPending: false,
  },
});
const updateSurveyFailure = (state: State) => ({
  ...state,
  updateSurveyRequest: {
    ...state.updateSurveyRequest,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_EMPLOYEE_REQUEST]: employeeRequest,
  [Types.GET_EMPLOYEE_SUCCESS]: employeeSuccess,
  [Types.GET_EMPLOYEE_FAILURE]: employeeFailure,
  [Types.UPDATE_COMPANY_INFO_REQUEST]: updateCompanyInfoRequest,
  [Types.UPDATE_COMPANY_INFO_SUCCESS]: updateCompanyInfoSuccess,
  [Types.UPDATE_COMPANY_INFO_FAILURE]: updateCompanyInfoFailure,
  [Types.UPDATE_CONTACT_INFO_REQUEST]: updateContactInfoRequest,
  [Types.UPDATE_CONTACT_INFO_SUCCESS]: updateContactInfoSuccess,
  [Types.UPDATE_CONTACT_INFO_FAILURE]: updateContactInfoFailure,
  [Types.UPDATE_EMPLOYEE_INFO_REQUEST]: updateEmployeeInfoRequest,
  [Types.UPDATE_EMPLOYEE_INFO_SUCCESS]: updateEmployeeInfoSuccess,
  [Types.UPDATE_EMPLOYEE_INFO_FAILURE]: updateEmployeeInfoFailure,
  [Types.UPDATE_ORGANIZATION_INFO_REQUEST]: updateOrganizationInfoRequest,
  [Types.UPDATE_ORGANIZATION_INFO_SUCCESS]: updateOrganizationInfoSuccess,
  [Types.UPDATE_ORGANIZATION_INFO_FAILURE]: updateOrganizationInfoFailure,
  [Types.UPDATE_PERSONAL_INFO_REQUEST]: updatePersonalInfoRequest,
  [Types.UPDATE_PERSONAL_INFO_SUCCESS]: updatePersonalInfoSuccess,
  [Types.UPDATE_PERSONAL_INFO_FAILURE]: updatePersonalInfoFailure,
  [Types.TERMINATE_EMPLOYEE_REQUEST]: terminateEmployeeRequest,
  [Types.TERMINATE_EMPLOYEE_SUCCESS]: terminateEmployeeSuccess,
  [Types.TERMINATE_EMPLOYEE_FAILURE]: terminateEmployeeFailure,
  [Types.REHIRE_EMPLOYEE_REQUEST]: rehireEmployeeRequest,
  [Types.REHIRE_EMPLOYEE_SUCCESS]: rehireEmployeeSuccess,
  [Types.REHIRE_EMPLOYEE_FAILURE]: rehireEmployeeFailure,
  [Types.ADD_EDUCATION_REQUEST]: addEducationRequest,
  [Types.ADD_EDUCATION_SUCCESS]: addEducationSuccess,
  [Types.ADD_EDUCATION_FAILURE]: addEducationFailure,
  [Types.REMOVE_EDUCATION_REQUEST]: removeEducationRequest,
  [Types.REMOVE_EDUCATION_SUCCESS]: removeEducationSuccess,
  [Types.REMOVE_EDUCATION_FAILURE]: removeEducationFailure,
  [Types.UPDATE_EDUCATION_REQUEST]: updateEducationRequest,
  [Types.UPDATE_EDUCATION_SUCCESS]: updateEducationSuccess,
  [Types.UPDATE_EDUCATION_FAILURE]: updateEducationFailure,
  [Types.GET_EMPLOYEE_EDUCATIONS_REQUEST]: getEmployeeEducationsRequest,
  [Types.GET_EMPLOYEE_EDUCATIONS_SUCCESS]: getEmployeeEducationsSuccess,
  [Types.GET_EMPLOYEE_EDUCATIONS_FAILURE]: getEmployeeEducationsFailure,
  [Types.GET_EMPLOYEE_SURVEY_HISTORY_REQUEST]: getEmployeeSurveyHistoryRequest,
  [Types.GET_EMPLOYEE_SURVEY_HISTORY_SUCCESS]: getEmployeeSurveyHistorySuccess,
  [Types.GET_EMPLOYEE_SURVEY_HISTORY_FAILURE]: getEmployeeSurveyHistoryFailure,
  [Types.ADD_SURVEY_REQUEST]: addSurveyRequest,
  [Types.ADD_SURVEY_SUCCESS]: addSurveySuccess,
  [Types.ADD_SURVEY_FAILURE]: addSurveyFailure,
  [Types.UPDATE_SURVEY_REQUEST]: updateSurveyRequest,
  [Types.UPDATE_SURVEY_SUCCESS]: updateSurveySuccess,
  [Types.UPDATE_SURVEY_FAILURE]: updateSurveyFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
