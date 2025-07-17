import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.MARKET.BUSINESS_CONFIG;

export const marketBusinessConfigsSelector = {
  getData: state => state[reducerKey]?.marketBusinessConfigs?.data,
  getIsPending: state => state[reducerKey]?.marketBusinessConfigs?.isPending,
};

export const businessConfigSelector = {
  getData: state => state[reducerKey]?.businessConfigSelector?.data,
  getIsPending: state => state[reducerKey]?.businessConfigSelector?.isPending,
};

export const businessCustomConfigSelector = {
  getData: state => state[reducerKey]?.businessCustomConfig?.data,
  getIsPending: state => state[reducerKey]?.businessCustomConfig?.isPending,
};
