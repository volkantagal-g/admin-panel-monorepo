import { REDUX_KEY } from '@shared/shared/constants';
import { createMap } from '@shared/utils/common';

const reducerKey = REDUX_KEY.EMPLOYEE.MODAL.PERMIT.DETAIL;

export const getPermitDetailSelector = {
  getData: state => {
    const permit = state?.[reducerKey]?.permitDetail?.permit;
    const copyOfPermit = { ...permit };
    copyOfPermit.actionsMap = createMap(copyOfPermit.actions || [], { field: 'type' });
    return copyOfPermit;
  },
  getHistory: state => state?.[reducerKey]?.permitDetail?.history,
  getStatementOptions: state => {
    const { isSupervisor, hasPermission } = state?.[reducerKey]?.permitDetail || {};
    return { isSupervisor, hasPermission };
  },
  getIsPending: state => state?.[reducerKey]?.permitDetail?.isPending,
};
