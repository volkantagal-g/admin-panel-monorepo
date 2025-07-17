import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.ALGORITHM.CONFIG.DOMAIN.BASE.LIST;

export const algorithmDomainConfigListSelector = {
  getIsPending: state => state?.[reduxKey]?.algorithmDomainConfigList?.isPending,
  getData: state => state?.[reduxKey]?.algorithmDomainConfigList?.data,
  getDomainSettingsData: state => state[reduxKey]?.algorithmDomainSettings?.data,
  getFilters: state => state?.[reduxKey]?.filters,
  getNamespace: state => state?.[reduxKey]?.namespace,
  getConstants: state => state?.[reduxKey]?.constants,
};

export const bulkEditCsv = {
  getIsPending:
    state => state?.[reduxKey]?.bulkEditCsv?.isPending,
};

export const exportCsvSelector = {
  getIsPending:
    state => state?.[reduxKey]?.exportCsv?.isPending,
};
