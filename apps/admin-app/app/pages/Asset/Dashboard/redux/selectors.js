import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.ASSET.DASHBOARD;

export const getDeviceTypeStatisticsSelector = {
  getData: state => state[reducerKey]?.getDeviceTypeStatistics?.data,
  getIsPending: state => state[reducerKey]?.getDeviceTypeStatistics?.isPending,
};

export const getDeviceStatusStatisticsSelector = {
  getData: state => state[reducerKey]?.getDeviceStatusStatistics?.data,
  getIsPending: state => state[reducerKey]?.getDeviceStatusStatistics?.isPending,
};

export const getAssignmentStatusStatisticsSelector = {
  getData: state => state[reducerKey]?.getAssignmentStatusStatistics?.data,
  getIsPending: state => state[reducerKey]?.getAssignmentStatusStatistics?.isPending,
};

export const getRentalStatisticsSelector = {
  getData: state => state[reducerKey]?.getRentalStatistics?.data,
  getIsPending: state => state[reducerKey]?.getRentalStatistics?.isPending,
};

export const getMDMStatisticsSelector = {
  getData: state => state[reducerKey]?.getMDMStatistics?.data,
  getIsPending: state => state[reducerKey]?.getMDMStatistics?.isPending,
};

export const getBrandsStatisticsSelector = {
  getData: state => state[reducerKey]?.getBrandsStatistics?.data,
  getIsPending: state => state[reducerKey]?.getBrandsStatistics?.isPending,
};

export const getAssetOwnersStatisticsSelector = {
  getData: state => state[reducerKey]?.getAssetOwnersStatistics?.data,
  getIsPending: state => state[reducerKey]?.getAssetOwnersStatistics?.isPending,
};
