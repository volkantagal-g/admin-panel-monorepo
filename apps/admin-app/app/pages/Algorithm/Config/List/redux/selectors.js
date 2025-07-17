import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.ALGORITHM.CONFIG.LIST;

export const algorithmConfigListSelector = {
  getIsPending: state => state?.[reduxKey]?.algorithmConfigList?.isPending,
  getData: state => state?.[reduxKey]?.algorithmConfigList?.data,
  getFilters: state => state?.[reduxKey]?.filters,
  getNamespace: state => state?.[reduxKey]?.namespace,
  getNamespaceListData: state => state?.[reduxKey]?.namespaceList?.data,
  getTypeListData: state => state?.[reduxKey]?.typeList?.data,
  getTypeListIsPending: state => state?.[reduxKey]?.typeList?.isPending,
  createdData: state => state?.[reduxKey]?.createNewConfig?.data,
  configIsCreating: state => state?.[reduxKey]?.createNewConfig?.isPending,
};

export const configSchemaSelector = {
  getIsPending: state => state?.[reduxKey]?.configSchema?.isPending,
  getData: state => state?.[reduxKey]?.configSchema?.data,
};

export const bulkEditCsv = {
  getIsPending:
    state => state?.[reduxKey]?.bulkEditCsv?.isPending,
};

export const exportCsvSelector = {
  getIsPending:
    state => state?.[reduxKey]?.exportCsv?.isPending,
};
