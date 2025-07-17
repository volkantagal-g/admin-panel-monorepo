import * as MOCKS from './index.mock.data';

const createNewStoreAuditUrl = '/franchiseAudit/form/create';
const getWarehouseListURL = '/warehouse/getWarehouses';
const getFranchiseListURL = '/marketFranchise/getMarketFranchises';
const getQualityDepartmentListURL = '/employee/getQualityDepartmentEmployees';
const getStoreAuditListUrl = '/franchiseAudit/auditForm/filter';
const getStoreAuditDetailUrl = '/franchiseAudit/auditForm/detail';
const updateStoreAuditDetailUrl = '/franchiseAudit/auditForm/update';

const createNewStoreAuditMockOptions = {
  url: createNewStoreAuditUrl,
  successData: { _id: 'success_id' },
};

export const getWarehouseListConfigMock = {
  url: getWarehouseListURL,
  successData: MOCKS.warehouseListMock,
};

export const getFranchiseListConfigMock = {
  url: getFranchiseListURL,
  successData: MOCKS.franchiseListMock,
};

const getQualityDepartmentListConfigMock = {
  url: getQualityDepartmentListURL,
  successData: MOCKS.qualityDepartmentMock,
};

const getStoreAuditListConfigMock = {
  url: getStoreAuditListUrl,
  successData: MOCKS.storeAuditListMock,
};

const getStoreAuditDetailConfigMock = {
  url: getStoreAuditDetailUrl,
  successData: MOCKS.storeAuditDetailMock,
};

const updateStoreAuditMock = {
  url: updateStoreAuditDetailUrl,
  successData: { _id: 'success_id' },
};

export default [
  createNewStoreAuditMockOptions,
  getQualityDepartmentListConfigMock,
  getStoreAuditListConfigMock,
  getStoreAuditDetailConfigMock,
  updateStoreAuditMock,
];
