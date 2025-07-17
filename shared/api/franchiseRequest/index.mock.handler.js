import { franchiseRequestListMock, dynamicColumnsMock } from './index.mock.data';

const getFranchiseRequestListUrl = '/franchiseRequest/filter';
// const FRANCHISE = 'FRANCHISE';
// const CREATE = 'CREATE';
// const dynamicColumnsUrl = `/dynamicForm/columns?formName=${FRANCHISE}&formType=${CREATE}`;
// NO need to add query params here, MSW warns about this
const dynamicColumnsUrl = '/dynamicForm/columns';

const getDynamicColumnsConfigMock = {
  url: dynamicColumnsUrl,
  method: 'get',
  successData: dynamicColumnsMock,
};

const getFranchiseRequestListConfigMock = {
  url: getFranchiseRequestListUrl,
  successData: franchiseRequestListMock,
};

export default [
  getDynamicColumnsConfigMock,
  getFranchiseRequestListConfigMock,
];
