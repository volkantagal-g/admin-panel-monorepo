import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.KDS.SELECT_AUDIT_FORM_TYPE;

export const auditFormTypeSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'auditFormType');
    return data;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'auditFormType');
    return isPending;
  },
};
