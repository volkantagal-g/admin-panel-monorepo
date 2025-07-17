import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.EMPLOYEE.PERMIT.LIST}_`;

export const { Types, Creators } = createActions({
  setFilters: { filters: {} },
  setPagination: { pagination: {} },
  resetFilters: {},
  getFilteredPermitsRequest: {
    nextPageCursor: null,
    previousPageCursor: null,
  },
  getFilteredPermitsSuccess: { data: [] },
  getFilteredPermitsFailure: { error: null },
  getExportedPermitsExcelDownloadURLRequest: {},
  getExportedPermitsExcelDownloadURLSuccess: {},
  getExportedPermitsExcelDownloadURLFailure: {},
  approvePermitRequest: { permitId: null },
  rejectPermitRequest: { permitId: null },
  cancelRequestedPermitRequest: { permitId: null },
  cancelPermitRequest: { permitId: null },
  actionButtonSuccess: {},
  actionButtonFailure: {},
  actionButtonReset: {},
  initPage: null,
  destroyPage: null,
}, { prefix });
