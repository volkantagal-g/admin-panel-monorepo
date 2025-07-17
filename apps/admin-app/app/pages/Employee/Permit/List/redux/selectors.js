import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.EMPLOYEE.PERMIT.LIST;

export const filterSelector = {
  getFilters: state => state[reduxKey]?.filters,
  getPagination: state => state[reduxKey]?.pagination,
};

export const filteredPermitsSelector = {
  getIsPending: state => state[reduxKey]?.filteredPermits.isPending,
  getData: state => state[reduxKey]?.filteredPermits.data,
};

export const actionButtonSelector = {
  getIsPending: state => state?.[reduxKey]?.actionButton?.isPending,
  getIsSucceeded: state => state?.[reduxKey]?.actionButton?.isSucceeded,
};

export const getExportedPermitsExcelDownloadURLSelector = { getIsPending: state => state[reduxKey]?.exportedPermitsExcelDownloadURL.isPending };
