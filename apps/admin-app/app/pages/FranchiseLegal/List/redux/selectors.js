import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FRANCHISE_LEGAL.LIST;

export const getFranchiseLegalListSelector = {
  getData: state => state?.[reducerKey]?.franchiseLegalList?.data,
  getTotal: state => state?.[reducerKey]?.franchiseLegalList?.total,
  getIsPending: state => state?.[reducerKey]?.franchiseLegalList?.isPending,
  getIsStatusChangePending: state => state?.[reducerKey]?.franchiseLegalList?.isChangeStatusPending,
};
