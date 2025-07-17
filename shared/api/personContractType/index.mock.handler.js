import { contractTypeList, detailTestRecord, dynamicForm, testDetailId } from './index.mock.data';

const dynamicFormApi = {
  method: 'get',
  url: '/dynamicForm/form',
  successData: dynamicForm,
};

const contractTypeDetailsApi = {
  method: 'get',
  url: `/contractManagement/contract/${testDetailId}`,
  successData: contractTypeList,
};

const contractTypeListApi = {
  url: '/contractManagement/contract/filter',
  successData: contractTypeList,
};

const saveContractTypeListApi = {
  url: '/contractManagement/contract',
  successData: detailTestRecord,
};

const updateContractTypeGenInfoApi = {
  method: 'put',
  url: `/contractManagement/contract/${testDetailId}`,
  successData: detailTestRecord,
};

const updateContractTypeBreakApi = {
  method: 'put',
  url: `/contractManagement/contract/breaks/${testDetailId}`,
  successData: detailTestRecord,
};

const updateContractTypeLeaveApi = {
  method: 'put',
  url: `/contractManagement/contract/leave-config/${testDetailId}`,
  successData: detailTestRecord,
};

const updateContractTypeSchdConfigApi = {
  method: 'put',
  url: `/contractManagement/contract/scheduling-constraints/${testDetailId}`,
  successData: detailTestRecord,
};

const updateContractTypeCompConfigApi = {
  method: 'put',
  url: `/contractManagement/contract/compensation-config/${testDetailId}`,
  successData: detailTestRecord,
};

export default [
  contractTypeListApi,
  dynamicFormApi,
  saveContractTypeListApi,
  contractTypeDetailsApi,
  updateContractTypeGenInfoApi,
  updateContractTypeBreakApi,
  updateContractTypeLeaveApi,
  updateContractTypeSchdConfigApi,
  updateContractTypeCompConfigApi,
];
