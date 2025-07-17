import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ALGORITHM.CONFIG.DOMAIN.BASE.LIST}_`;

export const {
  Types,
  Creators,
} = createActions({
  getAlgorithmDomainConfigListRequest: {
    page: 1,
    pageSize: 20,
    filters: [],
  },
  getAlgorithmDomainConfigListSuccess: { data: [] },
  getAlgorithmDomainConfigListFailure: { error: null },
  getAlgorithmDomainSettingsRequest: { namespace: null },
  getAlgorithmDomainSettingsSuccess: { data: {} },
  getAlgorithmDomainSettingsFailure: { error: null },
  addFilterParameter: {
    field: null,
    operator: 'exact',
    value: null,
  },
  setNamespace: { namespace: null },
  setConstants: { constants: {} },
  initPage: null,
  destroyPage: null,
  bulkEditCsvRequest: {
    file: null,
    isDomain: null,
  },
  bulkEditCsvSuccess: null,
  bulkEditCsvFailure: { error: null },
  exportCsvRequest: {
    rows: null,
    fileName: null,
    columns: null,
  },
  exportCsvSuccess: null,
  exportCsvFailure: { error: null },
}, { prefix });
