import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.ALGORITHM.CONFIG.DOMAIN.BASE.DETAIL;

export const algorithmDomainConfigDetailSelector = {
  getIsPending: state => state[reduxKey]?.algorithmDomainConfigDetail?.isPending,
  getData: state => state[reduxKey]?.algorithmDomainConfigDetail?.data,
  getValueIsPending: state => state[reduxKey]?.algorithmDomainConfigValue?.isPending,
  getValueData: state => state[reduxKey]?.algorithmDomainConfigValue?.data,
  getDomainSettingsData: state => state[reduxKey]?.algorithmDomainSettings?.data,
  getDomainSettingsIsPending: state => state[reduxKey]?.algorithmDomainSettings?.isPending,
  getNamespace: state => state[reduxKey]?.namespace,
  getIsUpdating: state => state[reduxKey]?.isUpdating,
  getDomainTypes: state => state[reduxKey]?.warehouseData?.data?.domainTypes,
  getWarehouseIsPending: state => state[reduxKey]?.warehouseData?.isPending,
};
