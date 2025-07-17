import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.KDS.AUDIT_FORM_TYPE.DETAIL;

export const kdsAuditFormTypeDetailSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'kdsAuditFormTypeDetail');
    return data;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'kdsAuditFormTypeDetail');
    return isPending;
  },
};
