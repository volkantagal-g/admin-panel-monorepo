import {
  getEmployeesForSelectComponentMockData,
  getDepartmentsForSelectComponentMockData,
  createNewEmployeeMockData,
  employeeCreateAssetMockData,
  mockedEmployees,
  mockedFormerEmployees,
  mockGetEmployeeForEmployeeDetail,
  mockUpdateEmployeeGeneralInfo,
  mockGetManagerOfEmployee,
  mockExportedEmployeeAssetExcelDownloadURL,
  mockEmployeeAssets,
  mockUpdateEmployeeAsset,
  mockEmployeeAssignedAssets,
  mockEmployeeInformationForAssetPrintForm,
  mockGetEmployeeNonPrivateInformation,
  mockLocationsForSelectComponent,
  mockJobFamiliesForSelectComponent,
} from './index.mock.data';

const getEmployeesForSelectComponentMockOptions = {
  url: '/employee/getEmployeesForSelectComponent',
  method: 'post',
  successData: getEmployeesForSelectComponentMockData,
};

const getEmployeesPureMockOptions = {
  url: '/employee/getEmployeesPure',
  method: 'post',
  successData: mockedEmployees,
};

const getDepartmentsForSelectComponentMockOptions = {
  url: '/employee/getDepartmentsPure',
  method: 'post',
  successData: getDepartmentsForSelectComponentMockData,
};

const createNewEmployeeOptions = {
  url: '/employee/createNewEmployee',
  method: 'post',
  successData: createNewEmployeeMockData,
};

const employeeCreateAssetMockOptions = {
  url: '/employee/createAsset',
  method: 'post',
  successData: employeeCreateAssetMockData,
};

const getFilteredActiveEmployeesMockOptions = {
  url: '/employee/getFilteredActiveEmployees',
  method: 'post',
  successData: mockedEmployees,
};

const getFilteredFormerEmployeesMockOptions = {
  url: '/employee/getFilteredFormerEmployees',
  method: 'post',
  successData: mockedFormerEmployees,
};

const getEmployeeAssetListOptions = {
  url: '/employee/getEmployeeAssetList',
  method: 'post',
  successData: mockEmployeeAssets,
};

const getEmployeeAssetsMockOptions = {
  url: '/employee/getEmployeeAssets',
  method: 'post',
  successData: mockEmployeeAssignedAssets,
};

const getEmployeeInformationForAssetPrintFormMockOptions = {
  url: '/employee/getEmployeeInformationForAssetPrintForm',
  method: 'post',
  successData: mockEmployeeInformationForAssetPrintForm,
};

const getEmployeeNonPrivateInformationMockOptions = {
  url: '/employee/getEmployeeNonPrivateInformation',
  method: 'post',
  successData: mockGetEmployeeNonPrivateInformation,
};

const getEmployeeAssetListExcelDownloadLinkOptions = {
  url: '/employee/getEmployeeAssetListExcelDownloadLink',
  method: 'post',
  successData: mockExportedEmployeeAssetExcelDownloadURL,
};

const updateEmployeeAssetDetailsMockOptions = {
  url: '/employee/updateEmployeeAssetDetails/123456',
  method: 'post',
  successData: mockUpdateEmployeeAsset,
};

const getEmployeeForEmployeeDetailOptions = {
  url: '/employee/getEmployeeForEmployeeDetail',
  method: 'post',
  successData: mockGetEmployeeForEmployeeDetail,
};

const updateEmployeeGeneralInfoOptions = {
  url: '/employee/updateEmployeeGeneralInfo',
  method: 'post',
  successData: mockUpdateEmployeeGeneralInfo,
};

const getManagerOfEmploeyeOptions = {
  url: '/employee/getManagerOfEmployee',
  method: 'post',
  successData: mockGetManagerOfEmployee,
};

const getLocationsForSelectComponent = {
  url: '/employee/getLocationsForSelectComponent',
  method: 'post',
  successData: mockLocationsForSelectComponent,
};

const getMockJobFamiliesForSelectComponent = {
  url: '/employee/getJobFamiliesForSelectComponent',
  method: 'post',
  successData: mockJobFamiliesForSelectComponent,
};

export default [
  getEmployeesForSelectComponentMockOptions,
  getEmployeesPureMockOptions,
  getDepartmentsForSelectComponentMockOptions,
  createNewEmployeeOptions,
  employeeCreateAssetMockOptions,
  getFilteredActiveEmployeesMockOptions,
  getFilteredFormerEmployeesMockOptions,
  getEmployeeForEmployeeDetailOptions,
  updateEmployeeGeneralInfoOptions,
  getManagerOfEmploeyeOptions,
  getEmployeeAssetListOptions,
  getEmployeeAssetsMockOptions,
  getEmployeeInformationForAssetPrintFormMockOptions,
  getEmployeeNonPrivateInformationMockOptions,
  getEmployeeAssetListExcelDownloadLinkOptions,
  updateEmployeeAssetDetailsMockOptions,
  getLocationsForSelectComponent,
  getMockJobFamiliesForSelectComponent,
];
