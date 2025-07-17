import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.ALGORITHM.CONFIG.DETAIL;

export const configDetailSelector = {
  getIsPending: state => state?.[reduxKey]?.configDetail?.isPending,
  getData: state => state?.[reduxKey]?.configDetail?.data,
  getIsCustom: state => state?.[reduxKey]?.configDetail?.data?.isCustom,
  dataUpdating: state => state?.[reduxKey]?.configUpdating,
  configLinking: state => state?.[reduxKey]?.configLinking,
  configDeleting: state => state?.[reduxKey]?.configDeleting,
  configNodeUpdating: state => state?.[reduxKey]?.configNodeUpdating,
  configUnlinking: state => state?.[reduxKey]?.configUnlinking,
  getNamespace: state => state?.[reduxKey]?.configDetail?.data?.namespace,
};

export const configValueSelector = {
  getIsPending: state => state?.[reduxKey]?.configValue?.isPending,
  getData: state => state?.[reduxKey]?.configValue?.data,
};

export const customConfigListSelector = {
  getIsPending: state => state?.[reduxKey]?.customConfigList?.isPending,
  getData: state => state?.[reduxKey]?.customConfigList?.data,
};

export const linkedConfigsSelector = {
  getIsPending: state => state?.[reduxKey]?.linkedConfigs?.isPending,
  getData: state => state?.[reduxKey]?.linkedConfigs?.data,
};

export const configSchemaSelector = {
  getIsPending: state => state?.[reduxKey]?.configSchema?.isPending,
  getData: state => state?.[reduxKey]?.configSchema?.data,
};

export const validateConfigValueSelector = {
  getIsPending: state => state?.[reduxKey]?.validateConfigValue?.isPending,
  getData: state => state?.[reduxKey]?.validateConfigValue?.data,
};
