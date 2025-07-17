import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.KDS.AUDIT_FORM_TYPE.NEW;

export const createKdsAuditFormTypeSelector = { getIsPending: state => state?.[reducerKey]?.createKdsAuditFormType?.isPending };
