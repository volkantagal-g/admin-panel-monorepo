import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { STATE_STORE_TYPE } from '@app/pages/PushNotification/constants';

export const { Types, Creators } = createActions({
  getNotificationRequest: { notificationId: null },
  getNotificationSuccess: { data: {} },
  getNotificationFailure: { error: null },

  updateNotificationRequest: { id: null, body: null },
  updateNotificationSuccess: { data: [] },
  updateNotificationFailure: { error: null },

  setSelectedRestaurants: { selectedRestaurants: [] },

  getRestaurantsByNameRequest: { searchString: '' },
  getRestaurantsByNameSuccess: { data: [] },
  getRestaurantsByNameFailure: { error: null },

  getRestaurantDetailsByIdsRequest: { restaurants: [], setSelectedRestaurants: false, stateStoreType: STATE_STORE_TYPE.FULFILL },
  getRestaurantDetailsByIdsSuccess: { restaurantDetails: {}, setSelectedRestaurants: false, stateStoreType: STATE_STORE_TYPE.FULFILL },
  getRestaurantDetailsByIdsFailure: { error: null },

  getChainRestaurantDetailRequest: { chainRestaurantId: null },
  getChainRestaurantDetailSuccess: { chainRestaurant: {} },
  getChainRestaurantDetailFailure: { error: null },

  getChainRestaurantsRequest: { searchString: '' },
  getChainRestaurantsSuccess: { data: [] },
  getChainRestaurantsFailure: { error: null },

  getChainRestaurantBranchesRequest: { chainRestaurantId: null },
  getChainRestaurantBranchesSuccess: { data: {} },
  getChainRestaurantBranchesFailure: { error: null },

  uploadFilesToS3Request: { file: { base64: null, name: null }, fileStateKey: null },
  uploadFilesToS3Success: { file: {}, fileStateKey: null },
  uploadFilesToS3Failure: { error: null },

  uploadTemplateNotificationCsvRequest: { csvContent: null, csvName: null },
  uploadTemplateNotificationCsvSuccess: null,
  uploadTemplateNotificationCsvFailure: null,

  getS3SignedImageUrlRequest: {
    fileName: null,
    loadedImage: null,
    afterUpload: {},
  },
  getS3SignedImageUrlSuccess: { cdnUrl: null, fileLang: null },
  getS3SignedImageUrlFailure: { error: null },

  sendTestPushNotificationRequest: { body: null },
  sendTestPushNotificationSuccess: { data: [] },
  sendTestPushNotificationFailure: { error: null },

  getSampleUserListRequest: { notificationId: null },
  getSampleUserListSuccess: { data: {} },
  getSampleUserListFailure: { error: null },

  getTotalUserCountRequest: { notificationId: null },
  getTotalUserCountSuccess: { data: {} },
  getTotalUserCountFailure: { error: null },

  getStatisticsRequest: { notificationId: null },
  getStatisticsSuccess: { data: {} },
  getStatisticsFailure: { error: null },

  deleteNotifEventsRequest: { notificationId: null },
  deleteNotifEventsSuccess: { data: null },
  deleteNotifEventsFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.PUSH_NOTIFICATION.DETAIL}_` });
