import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CONFIG.MOBILE_ANIMATION;

export const getConfigGeneralKeySelector = {
  getData: state => state[reducerKey]?.getConfigGeneralKey?.data,
  getIsPending: state => state[reducerKey]?.getConfigGeneralKey.isPending,
};

export const getConfigSplashKeySelector = {
  getData: state => state[reducerKey]?.getConfigSplashKey?.data,
  getIsPending: state => state[reducerKey]?.getConfigSplashKey?.isPending,
};

export const getConfigOnBoardingKeySelector = {
  getData: state => state[reducerKey]?.getConfigOnBoardingKey?.data,
  getIsPending: state => state[reducerKey]?.getConfigOnBoardingKey.isPending,
};

export const uploadConfigJsonFileSelector = {
  getData: state => state[reducerKey]?.uploadConfigJsonFile?.data,
  getIsPending: state => state[reducerKey]?.uploadConfigJsonFile.isPending,
};

export const updateConfigKeySelector = {
  getData: state => state[reducerKey]?.updateConfigKey?.data,
  getIsPending: state => state[reducerKey]?.updateConfigKey.isPending,
};
