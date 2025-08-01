import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.EMPLOYEE.LIST}_`;

export const { Types, Creators } = createActions({
  getFilteredEmployeesCommonRequest: null,
  getFilteredActiveEmployeesRequest: null,
  getFilteredActiveEmployeesSuccess: { data: null, totalCount: 0 },
  getFilteredActiveEmployeesFailure: { error: null },
  getFilteredNoNActiveEmployeesRequest: null,
  getFilteredNoNActiveEmployeesSuccess: { data: null, totalCount: 0 },
  getFilteredNoNActiveEmployeesFailure: { error: null },
  getEmployeesExcelDownloadRequest: null,
  getFormerEmployeesExcelDownloadRequest: null,
  getEmployeesLimitedExcelDownloadRequest: null,
  getFormerEmployeesLimitedExcelDownloadRequest: null,
  getEmployeesEducationsExcelDownloadRequest: null,
  getFormerEmployeesEducationsExcelDownloadRequest: null,
  updateFilters: { filters: {}, resetPagination: false } as any,
  resetFilters: null,
  initPage: null,
  destroyPage: null,
}, { prefix });
