import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.DYS_CONFIGS.UPDATE;

export const dysConfigsSelector = {
  getData: state => state?.[reduxKey]?.dysConfigs?.data,
  getIsPending: state => state?.[reduxKey]?.dysConfigs?.isPending,
};
