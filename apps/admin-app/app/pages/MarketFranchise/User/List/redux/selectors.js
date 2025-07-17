import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET_FRANCHISE.USER.LIST;

export const franchiseUserListSelector = {
  getData: state => state[reducerKey]?.franchiseUserList.data,
  getCount: state => state[reducerKey]?.franchiseUserList.count,
  getIsPending: state => state[reducerKey]?.franchiseUserList.isPending,
};

export const exportFranchiseUsersSelector = { getIsPending: state => state[reducerKey]?.exportFranchiseUsers.isPending };
