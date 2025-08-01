import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.MARKET_FRANCHISE.USER.ROLE.DETAIL;

export const franchiseUserRoleDetailSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'franchiseUserRoleDetail');
    return data;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'franchiseUserRoleDetail');
    return isPending;
  },
};
