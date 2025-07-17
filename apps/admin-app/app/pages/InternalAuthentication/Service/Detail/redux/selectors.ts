import { REDUX_KEY } from '@shared/shared/constants';
import { State } from './reducer';

const reduxKey = REDUX_KEY.INTERNAL_AUTHENTICATION.SERVICE.DETAIL;

export const serviceByIdSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state?.[reduxKey].serviceById?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.serviceById?.data,
};

export const updateServiceSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.updateService?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.updateService?.data,
};

export const deleteServiceSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.deleteService?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.deleteService?.data,
};

export const slackConfigurationSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.slackConfigurations?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.slackConfigurations?.data,
};

export const updateSlackConfigurationSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.updateSlackConfigurations?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.updateSlackConfigurations?.data,
};

export const generateSlackTokenSelector = {
  getIsPending: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.slackToken?.isPending,
  getData: (state: {[reduxKey: string]: State}) => state?.[reduxKey]?.slackToken?.data,
};
