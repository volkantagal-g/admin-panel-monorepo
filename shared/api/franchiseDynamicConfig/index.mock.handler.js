import * as MOCKS from './index.mock.data';

const configTypeUrl = '/franchiseDynamicConfig/config-type';
const configListUrl = '/franchiseDynamicConfig/config/earnings';
const createConfigType = '/franchiseDynamicConfig/config-type';
const getConfigTypeDetail = '/franchiseDynamicConfig/config-type/645261788bd4d63f9306d40e';
// const deleteConfigTypeField = '/franchiseDynamicConfig/config-type/645261788bd4d63f9306d40e/deleteField?keys=key1';
// NO NEED TO ADD SEARCH TO MOCK OPTIONS MATCH
const deleteConfigTypeField = '/franchiseDynamicConfig/config-type/645261788bd4d63f9306d40e/deleteField';
const updateConfigTypeField = '/franchiseDynamicConfig/config-type/645261788bd4d63f9306d40e';
const createDynamicConfig = '/franchiseDynamicConfig/config/properConfigType';
const updateDynamicConfig = '/franchiseDynamicConfig/config/detail/64638d27f0bc7e8908f58e64';
const getConfigTypeDetail2 = '/franchiseDynamicConfig/config-type/645bd238d8e5815f2ee429cd';
const getConfigDetail = '/franchiseDynamicConfig/config/detail/64638d27f0bc7e8908f58e64';

const getDynamicFranchiseTypeMock = {
  url: configTypeUrl,
  method: 'get',
  successData: MOCKS.mockedConfigTypeList,
};

const getDynamicFranchiseEarningsListMock = {
  url: configListUrl,
  method: 'get',
  successData: MOCKS.mockedConfigEarningsRecords,
};

const createConfigTypeMock = {
  url: createConfigType,
  successData: { _id: 'success_id' },
};

const getCongfigTypeDetailMock = {
  url: getConfigTypeDetail,
  method: 'get',
  successData: MOCKS.mockedConfigTypeDetail,
};

export const getCongfigTypeDetailMockUpdated = {
  url: getConfigTypeDetail,
  method: 'get',
  successData: MOCKS.mockedConfigTypeDetailUpdated,
};

const deleteCongfigTypeFieldlMock = {
  url: deleteConfigTypeField,
  method: 'delete',
  successData: { _id: 'success_id' },
};

const updateCongfigTypeFieldlMock = {
  url: updateConfigTypeField,
  method: 'put',
  successData: { _id: 'success_id' },
};

const createDynamicCongfigMock = {
  url: createDynamicConfig,
  method: 'post',
  successData: { _id: 'success_id' },
};

const updateDynamicConfigMock = {
  url: updateDynamicConfig,
  method: 'put',
  successData: { _id: 'success_id' },
};

const getDynamicConfigMock = {
  url: getConfigDetail,
  method: 'get',
  successData: MOCKS.mockedConfigDetail,
};

export const getCongfigTypeDetail2Mock = {
  url: getConfigTypeDetail2,
  method: 'get',
  successData: MOCKS.mockedConfigTypeDetail2,
};

export default [
  getDynamicFranchiseTypeMock,
  getDynamicFranchiseEarningsListMock,
  createConfigTypeMock,
  getCongfigTypeDetailMock,
  deleteCongfigTypeFieldlMock,
  updateCongfigTypeFieldlMock,
  createDynamicCongfigMock,
  updateDynamicConfigMock,
  getDynamicConfigMock,
];
