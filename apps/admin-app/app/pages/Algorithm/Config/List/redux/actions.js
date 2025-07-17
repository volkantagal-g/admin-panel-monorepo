import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.ALGORITHM.CONFIG.LIST}_`;

export const {
  Types,
  Creators,
} = createActions({
  getAlgorithmConfigListRequest: {
    namespace: null,
    page: 1,
    pageSize: 20,
    filters: [],
  },
  getAlgorithmConfigListSuccess: { data: [] },
  getAlgorithmConfigListFailure: { error: null },
  getAlgorithmConfigNamespaceListRequest: null,
  getAlgorithmConfigNamespaceListSuccess: { data: [] },
  getAlgorithmConfigNamespaceListFailure: { error: null },
  getAlgorithmConfigTypeListRequest: { namespace: null },
  getAlgorithmConfigTypeListSuccess: { data: [] },
  getAlgorithmConfigTypeListFailure: { error: null },
  getConfigSchemaRequest: { namespace: null },
  getConfigSchemaSuccess: { data: {} },
  getConfigSchemaFailure: { error: null },
  createAlgorithmConfigRequest: {
    namespace: null,
    key: null,
    alias: null,
    configType: null,
    value: null,
  },
  createAlgorithmConfigSuccess: { data: { } },
  createAlgorithmConfigFailure: { error: null },
  addFilterParameter: {
    field: null,
    operator: 'exact',
    value: null,
  },
  clearTypeFilter: null,
  setNamespace: { namespace: null },
  initPage: null,
  destroyPage: null,
  bulkEditCsvRequest: {
    namespace: null,
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
