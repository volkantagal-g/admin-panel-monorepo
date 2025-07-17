import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.KDS.STORE_AUDIT.LIST;

export const kdsStoreAuditListSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'kdsStoreAuditList');
    return data;
  },
  getTotal: state => {
    const { total } = getStateObject(state, reducerKey, 'kdsStoreAuditList');
    return total;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'kdsStoreAuditList');
    return isPending;
  },
};
