import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({

  getDeviceTypeStatisticsRequest: { filters: null },
  getDeviceTypeStatisticsSuccess: { data: [] },
  getDeviceTypeStatisticsFailure: { error: null },

  getDeviceStatusStatisticsRequest: { filters: null },
  getDeviceStatusStatisticsSuccess: { data: [] },
  getDeviceStatusStatisticsFailure: { error: null },

  getAssignmentStatusStatisticsRequest: { filters: null },
  getAssignmentStatusStatisticsSuccess: { data: [] },
  getAssignmentStatusStatisticsFailure: { error: null },

  getRentalStatisticsRequest: { filters: null },
  getRentalStatisticsSuccess: { data: [] },
  getRentalStatisticsFailure: { error: null },

  getMDMStatisticsRequest: { filters: null },
  getMDMStatisticsSuccess: { data: [] },
  getMDMStatisticsFailure: { error: null },

  getBrandsStatisticsRequest: { filters: null },
  getBrandsStatisticsSuccess: { data: [] },
  getBrandsStatisticsFailure: { error: null },

  getAssetOwnersStatisticsRequest: { filters: null },
  getAssetOwnersStatisticsSuccess: { data: [] },
  getAssetOwnersStatisticsFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.ASSET.DASHBOARD}_` });
