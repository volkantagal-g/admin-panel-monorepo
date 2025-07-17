import { reducerKey } from './key';

export const franchiseBillDetailSelector = {
  getData: state => state[reducerKey]?.franchiseBillDetail.data,
  getIsPending: state => state[reducerKey]?.franchiseBillDetail.isPending,
};
