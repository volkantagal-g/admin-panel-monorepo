import * as MOCKS from './index.mock.data';

const exampleBillId = '638ded110ea66309863c364a';
const getFranchiseListURL = '/marketFranchise/getMarketFranchises';
const getWarehouseListURL = '/warehouse/getWarehouses';
const getBillListUrl = '/franchiseBillManagement/bill/filter';
const exportFranchiseBillListURL = '/franchiseBillManagement/bill/excel';
const getBillDetailURL = `/franchiseBillManagement/bill/${exampleBillId}`;

export const getFranchiseListConfigMock = {
  url: getFranchiseListURL,
  successData: MOCKS.franchiseListMock,
};

export const getWarehouseListConfigMock = {
  url: getWarehouseListURL,
  successData: MOCKS.warehouseListMock,
};

const getBillListConfigMock = {
  url: getBillListUrl,
  successData: MOCKS.billListMock,
};

const exportFranchiseBillListMock = {
  url: exportFranchiseBillListURL,
  successData: MOCKS.exportFranchiseUsersMock,
};

const getBillDetailConfigMock = {
  url: getBillDetailURL,
  method: 'get',
  successData: MOCKS.billDetailMock,
};

export default [
  getBillListConfigMock,
  exportFranchiseBillListMock,
  getBillDetailConfigMock,
];
