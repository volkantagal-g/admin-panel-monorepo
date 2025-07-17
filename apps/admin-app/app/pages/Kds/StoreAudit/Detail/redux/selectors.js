import { REDUX_KEY } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';

const reducerKey = REDUX_KEY.KDS.STORE_AUDIT.DETAIL;

export const storeAuditDetailSelector = {
  getData: state => state?.[reducerKey]?.storeAuditDetail?.data,
  getInitialData: state => state?.[reducerKey]?.storeAuditDetail?.initialData,
  getIsPending: state => state?.[reducerKey]?.storeAuditDetail?.isPending,
  getUploadedImageCollapsePanel: state => state?.[reducerKey]?.storeAuditDetail?.uploadedImageCollapsePanel,
  getAuditTypeName: state => state?.[reducerKey]?.storeAuditDetail?.auditFormTypeName?.[getLangKey()],
};
