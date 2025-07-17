import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.COMPANY.KPI_DICTIONARY}_`;

export const { Types, Creators } = createActions({
  getFilterOptionsRequest: null,
  getFilterOptionsSuccess: { data: null },
  getFilterOptionsFailure: { error: null },
  getKPIAcronymDictionaryRequest: null,
  getKPIAcronymDictionarySuccess: { data: null },
  getKPIAcronymDictionaryFailure: { error: null },
  getKPIDictionaryRequest: null,
  getKPIDictionarySuccess: { data: null, totalCount: null },
  getKPIDictionaryFailure: { error: null },
  updateFilters: { filters: {}, resetPagination: false } as any,
  resetFilters: null,
  initPage: null,
  destroyPage: null,
}, { prefix });
