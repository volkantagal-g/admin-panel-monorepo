import { reducerKey } from './key';

export const franchiseBillManagementListSelector = {
  getData: state => state[reducerKey]?.franchiseBillManagementList.data,
  getTotal: state => state[reducerKey]?.franchiseBillManagementList.total,
  getIsPending: state => state[reducerKey]?.franchiseBillManagementList.isPending,
};

export const exportFranchiseBillListSelector = { getIsPending: state => state[reducerKey]?.exportFranchiseBillManagementList.isPending };
