import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';
import { getStateObject } from '@shared/utils/common';

const reducerKey = REDUX_KEY.KDS.AUDIT_FORM_TYPE.LIST;

export const kdsAuditFormTypeListSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'kdsAuditFormTypeList');
    },
    ({ data }) => {
      return data;
    },
  ),
  getTotal: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'kdsAuditFormTypeList');
    },
    ({ total }) => {
      return total;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'kdsAuditFormTypeList');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};
