import * as MOCKS from './index.mock.data';

const getDtsCategory = '/dts/getDTSRuleCategories';
const createDtsCategoryUrl = '/dts/createDtsRuleCategory';
const getCategorySettingById = '/dts/getDtsRuleCategory';
const getDtsPriorities = '/dts/getDtsRulePriorities';
const createDtsPriorityUrl = '/dts/createDtsRulePriority';
const getPrioritySettingById = '/dts/getDtsRulePriority';
const createDtsFeedbackUrl = '/dts/createDtsRuleFeedbackSource';
const getDtsFeedbackSettings = '/dts/listDtsRuleFeedbackSource';
const getFeedbackSourceSettingById = '/dts/getDtsRuleFeedbackSource';
const createDtsRuleUrl = '/dts/createDtsRule';
const getDtsDetailUrl = '/dts/getDtsRule';
const getDtsRuleListUrl = '/dts/getDtsRules';
const getDtsViolationListUrl = '/dts/filterDtsViolation';
const getReporterListUrl = '/employee/getEmployeesPure';
const getPersonListUrl = '/person/filter';
const createDtsUrl = '/dts/createDTSViolation';
const updateDtsUrl = '/dts/updateDtsViolation';
const getDtsViolationDetailUrl = '/dts/getDtsViolation';
const getSignedUploadUrl = '/dts/getSignedUploadUrl';
const dtsBulkUploadUrl = '/dts/bulkUploadDtsLogs';

const getDtsCategoryConfigMock = {
  url: getDtsCategory,
  successData: MOCKS.mockedDysCategorySettings,
};

const createDtsCategorySettingMockOptions = {
  url: createDtsCategoryUrl,
  successData: { _id: 'success_id' },
};

const getCategorySettingByIdMockOptions = {
  url: getCategorySettingById,
  handler: req => {
    const { id } = req.body;
    return { data: { ...MOCKS.mockedDysCategorySettingDetail, id } };
  },
};

const getDtsPrioritiesConfigMock = {
  url: getDtsPriorities,
  successData: MOCKS.mockedDysPrioritySettings,
};

const createDtsPrioritySettingMockOptions = {
  url: createDtsPriorityUrl,
  successData: { _id: 'success_id' },
};

const getPrioritySettingByIdMockOptions = {
  url: getPrioritySettingById,
  handler: req => {
    const { id } = req.body;
    return { data: { ...MOCKS.mockedDysPrioritySettingDetail, id } };
  },
};

const createDtsFeedbackSettingMockOptions = {
  url: createDtsFeedbackUrl,
  successData: { _id: 'success_id' },
};

const getDtsFeedBackConfigMock = {
  url: getDtsFeedbackSettings,
  successData: MOCKS.mockedDysFeedbackSettings,
};

const getFeedbackSourceSettingByIdMockOptions = {
  url: getFeedbackSourceSettingById,
  handler: req => {
    const { id } = req.body;
    return { data: { ...MOCKS.mockedDysFeedbackSettingDetail, id } };
  },
};

const createDtsRuleMockOptions = {
  url: createDtsRuleUrl,
  successData: { _id: 'success_id' },
};

const getDtsMockOptions = {
  url: getDtsDetailUrl,
  successData: MOCKS.mockedDtsRuleDetail,
};

const getDtsRuleListMockOptions = {
  url: getDtsRuleListUrl,
  successData: MOCKS.mockedDtsRuleList,
};

const getDtsViolationListMockOptions = {
  url: getDtsViolationListUrl,
  successData: MOCKS.mockedDtsViolationList,
};

const getReporterListMockOptions = {
  url: getReporterListUrl,
  successData: MOCKS.mockedReporterList,
};

const getPersonListMockOptions = {
  url: getPersonListUrl,
  successData: MOCKS.mockedPersonList,
};

const createDtsMockOptions = {
  url: createDtsUrl,
  successData: { _id: 'success_id' },
};

const updateDtsStatusApologyOptions = {
  url: updateDtsUrl,
  successData: { _id: 'success_id' },
};

export const getDtsStatusApologyOptions = {
  url: getDtsViolationDetailUrl,
  successData: MOCKS.mockedApologyDtsDetail,
};

export const getDtsStatusDecisionOptions = {
  url: getDtsViolationDetailUrl,
  successData: MOCKS.mockedDecisionDtsDetail,
};

export const getDtsStatusClosedOptions = {
  url: getDtsViolationDetailUrl,
  successData: MOCKS.mockedClosedDtsDetail,
};

export const uploadDtsFileUrlMockHandler = {
  url: getSignedUploadUrl,
  successData: { url: '/signedUrl', fileName: 'test-file2.xlsx' },
};

export const dtsBulkUploadMockHandler = {
  url: dtsBulkUploadUrl,
  successData: MOCKS.mockedBulkUploadResponse,
};

export default [
  getDtsCategoryConfigMock,
  createDtsCategorySettingMockOptions,
  getCategorySettingByIdMockOptions,
  getDtsPrioritiesConfigMock,
  createDtsPrioritySettingMockOptions,
  getPrioritySettingByIdMockOptions,
  createDtsFeedbackSettingMockOptions,
  getDtsFeedBackConfigMock,
  getFeedbackSourceSettingByIdMockOptions,
  createDtsRuleMockOptions,
  getDtsMockOptions,
  getDtsRuleListMockOptions,
  getDtsViolationListMockOptions,
  getReporterListMockOptions,
  getPersonListMockOptions,
  createDtsMockOptions,
  updateDtsStatusApologyOptions,
  uploadDtsFileUrlMockHandler,
  dtsBulkUploadMockHandler,
];
