import { createReducer } from 'reduxsauce';

import { Types } from './actions';
import { STATE_STORE_TYPE } from '@app/pages/PushNotification/constants';

export const INITIAL_STATE = {

  notificationDetail: {
    isPending: false,
    data: {},
    error: null,
  },

  restaurantList: {
    isPending: false,
    selectedRestaurants: [],
    data: [],
    error: null,
  },

  chainRestaurants: {
    isPending: false,
    selectedChainRestaurant: '',
    data: [],
    branchData: [],
    error: null,
  },

  fileUploads: {
    template: {
      isPending: false,
      data: [],
      error: null,
    },
    excludedTemplate: {
      isPending: false,
      data: [],
      error: null,
    },
  },

  getFoodPromosBySearchCode: {
    isPending: false,
    data: [],
    error: null,
  },

  testPushNotification: {
    isPending: false,
    data: false,
    error: null,
  },

  uploadTemplateNotificationCsv: {
    isPending: false,
    isSuccess: false,
  },

  sampleUserList: {
    data: {},
    isPending: false,
    error: null,
  },

  totalUserCount: {
    data: {},
    isPending: false,
    error: null,
  },

  statistics: {
    isPending: false,
    data: {},
    error: null,
  },

  deleteNotifEvent: {
    isPending: false,
    data: null,
    error: null,
  },
};

export const getNotificationRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    notificationDetail: {
      ...INITIAL_STATE.notificationDetail,
      isPending: true,
    },
  };
};

export const getNotificationSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    notificationDetail: {
      ...INITIAL_STATE.notificationDetail,
      data,
      isPending: false,
    },
  };
};

export const getNotificationFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    notificationDetail: {
      ...INITIAL_STATE.notificationDetail,
      isPending: false,
      error,
    },
  };
};

export const updateNotificationRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    notificationDetail: {
      ...state.notificationDetail,
      isPending: true,
    },
  };
};

export const updateNotificationSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    notificationDetail: {
      ...state.notificationDetail,
      isPending: false,
      data,
    },
  };
};

export const updateNotificationFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    notificationDetail: {
      ...state.notificationDetail,
      isPending: false,
      error,
    },
  };
};

export const setSelectedRestaurants = (state = INITIAL_STATE, { selectedRestaurants }) => {
  return {
    ...state,
    restaurantList: {
      ...state.restaurantList,
      selectedRestaurants,
    },
  };
};

export const getRestaurantDetailsByIdsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    restaurantList: { isPending: true },
  };
};

export const getRestaurantDetailsByIdsSuccess = (state = INITIAL_STATE, { restaurantDetails, stateStoreType }) => {
  const data = stateStoreType === STATE_STORE_TYPE.APPEND ? [...state.promoList.data, ...restaurantDetails] : restaurantDetails;
  return {
    ...state,
    restaurantList: {
      ...state.restaurantList,
      data,
      isPending: false,
    },
  };
};

export const getRestaurantDetailsByIdsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    restaurantList: {
      isPending: false,
      error,
    },
  };
};

export const getChainRestaurantsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    chainRestaurants: {
      ...INITIAL_STATE.chainRestaurants,
      isPending: true,
    },
  };
};

export const getChainRestaurantsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    chainRestaurants: {
      ...INITIAL_STATE.chainRestaurants,
      data,
      isPending: false,
    },
  };
};

export const getChainRestaurantsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    chainRestaurants: {
      ...INITIAL_STATE.chainRestaurants,
      isPending: false,
      error,
    },
  };
};

export const getChainRestaurantDetailRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    chainRestaurants: {
      ...INITIAL_STATE.chainRestaurants,
      isPending: true,
    },
  };
};

export const getChainRestaurantDetailSuccess = (state = INITIAL_STATE, { chainRestaurant }) => {
  return {
    ...state,
    chainRestaurants: {
      ...INITIAL_STATE.chainRestaurants,
      data: [{ id: chainRestaurant.id, name: chainRestaurant.name }],
      isPending: false,
    },
  };
};

export const getChainRestaurantDetailFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    chainRestaurants: {
      ...INITIAL_STATE.chainRestaurants,
      isPending: false,
      error,
    },
  };
};

export const getChainRestaurantBranchesRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    restaurantList: {
      ...INITIAL_STATE.restaurantList,
      isPending: true,
    },
  };
};

export const getChainRestaurantBranchesSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    restaurantList: {
      ...INITIAL_STATE.restaurantList,
      data,
      isPending: false,
    },
  };
};

export const getChainRestaurantBranchesFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    restaurantList: {
      ...INITIAL_STATE.restaurantList,
      isPending: false,
      error,
    },
  };
};

export const uploadFilesToS3Request = (state = INITIAL_STATE, { fileStateKey }) => {
  return {
    ...state,
    fileUploads: {
      ...state.fileUploads,
      [fileStateKey]: { isPending: true },
    },
  };
};

export const uploadFilesToS3Success = (state = INITIAL_STATE, { file, fileStateKey }) => {
  return {
    ...state,
    fileUploads: {
      ...state.fileUploads,
      [fileStateKey]: { data: file, isPending: false },
    },
  };
};

export const uploadFilesToS3Failure = (state = INITIAL_STATE, { error, fileStateKey }) => {
  return {
    ...state,
    fileUploads: {
      ...state.fileUploads,
      [fileStateKey]: {
        isPending: false,
        error,
      },
    },
  };
};

export const uploadTemplateNotificationCsvRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    uploadTemplateNotificationCsv: {
      ...state.uploadTemplateNotificationCsv,
      isPending: true,
    },
  };
};

export const uploadTemplateNotificationCsvSuccess = (state = INITIAL_STATE) => {
  return {
    ...state,
    uploadTemplateNotificationCsv: {
      ...state.uploadTemplateNotificationCsv,
      isSuccess: true,
      isPending: false,
    },
  };
};

export const uploadTemplateNotificationCsvFailure = (state = INITIAL_STATE) => {
  return {
    ...state,
    uploadTemplateNotificationCsv: {
      ...state.uploadTemplateNotificationCsv,
      isPending: false,
    },
  };
};

export const getRestaurantsByNameRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    restaurantList: { isPending: true },
  };
};

export const getRestaurantsByNameSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    restaurantList: {
      ...state.restaurantList,
      data,
      isPending: false,
    },
  };
};

export const getRestaurantsByNameFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    restaurantList: {
      isPending: false,
      error,
    },
  };
};

export const getS3SignedImageUrlRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    notifImages: { isPending: true },
  };
};

export const getS3SignedImageUrlSuccess = (state = INITIAL_STATE, { fileLang, cdnUrl }) => {
  return {
    ...state,
    notifImages: {
      data: {
        cdnUrl,
        fileLang,
      },
      isPending: false,
    },
  };
};

export const getS3SignedImageUrlFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    notifImages: {
      ...INITIAL_STATE.notifImages,
      isPending: false,
      error,
    },
  };
};

export const sendTestPushNotificationRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    testPushNotification: { isPending: true },
  };
};

export const sendTestPushNotificationSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    testPushNotification: {
      ...state.testPushNotification,
      data,
      isPending: false,
      submitted: true,
    },
  };
};

export const sendTestPushNotificationFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    testPushNotification: {
      isPending: false,
      submitted: false,
      error,
    },
  };
};

export const getSampleUserListRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    sampleUserList: {
      ...state.sampleUserList,
      isPending: true,
    },
  };
};

export const getSampleUserListSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    sampleUserList: {
      ...INITIAL_STATE.sampleUserList,
      data,
      isPending: false,
    },
  };
};

export const getSampleUserListFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    sampleUserList: {
      ...state.sampleUserList,
      isPending: false,
      error,
    },
  };
};

export const getTotalUserCountRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    totalUserCount: {
      ...state.totalUserCount,
      isPending: true,
    },
  };
};

export const getTotalUserCountSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    totalUserCount: {
      ...INITIAL_STATE.totalUserCount,
      data,
      isPending: false,
    },
  };
};

export const getTotalUserCountFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    totalUserCount: {
      ...state.totalUserCount,
      isPending: false,
      error,
    },
  };
};

export const getStatisticsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    statistics: {
      ...INITIAL_STATE.statistics,
      isPending: true,
    },
  };
};

export const getStatisticsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    statistics: {
      ...INITIAL_STATE.statistics,
      data,
      isPending: false,
    },
  };
};

export const getStatisticsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    statistics: {
      ...INITIAL_STATE.statistics,
      isPending: false,
      error,
    },
  };
};

export const deleteNotifEventsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    deleteNotifEvent: { isPending: true },
  };
};

export const deleteNotifEventsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    deleteNotifEvent: {
      data,
      isPending: false,
      error: null,
    },
  };
};

export const deleteNotifEventsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    deleteNotifEvent: {
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_NOTIFICATION_REQUEST]: getNotificationRequest,
  [Types.GET_NOTIFICATION_SUCCESS]: getNotificationSuccess,
  [Types.GET_NOTIFICATION_FAILURE]: getNotificationFailure,

  [Types.UPDATE_NOTIFICATION_REQUEST]: updateNotificationRequest,
  [Types.UPDATE_NOTIFICATION_SUCCESS]: updateNotificationSuccess,
  [Types.UPDATE_NOTIFICATION_FAILURE]: updateNotificationFailure,

  [Types.SET_SELECTED_RESTAURANTS]: setSelectedRestaurants,

  [Types.GET_RESTAURANTS_BY_NAME_REQUEST]: getRestaurantsByNameRequest,
  [Types.GET_RESTAURANTS_BY_NAME_SUCCESS]: getRestaurantsByNameSuccess,
  [Types.GET_RESTAURANTS_BY_NAME_FAILURE]: getRestaurantsByNameFailure,

  [Types.GET_RESTAURANT_DETAILS_BY_IDS_REQUEST]: getRestaurantDetailsByIdsRequest,
  [Types.GET_RESTAURANT_DETAILS_BY_IDS_SUCCESS]: getRestaurantDetailsByIdsSuccess,
  [Types.GET_RESTAURANT_DETAILS_BY_IDS_FAILURE]: getRestaurantDetailsByIdsFailure,

  [Types.GET_CHAIN_RESTAURANT_DETAIL_REQUEST]: getChainRestaurantDetailRequest,
  [Types.GET_CHAIN_RESTAURANT_DETAIL_SUCCESS]: getChainRestaurantDetailSuccess,
  [Types.GET_CHAIN_RESTAURANT_DETAIL_FAILURE]: getChainRestaurantDetailFailure,

  [Types.GET_CHAIN_RESTAURANTS_REQUEST]: getChainRestaurantsRequest,
  [Types.GET_CHAIN_RESTAURANTS_SUCCESS]: getChainRestaurantsSuccess,
  [Types.GET_CHAIN_RESTAURANTS_FAILURE]: getChainRestaurantsFailure,

  [Types.GET_CHAIN_RESTAURANT_BRANCHES_REQUEST]: getChainRestaurantBranchesRequest,
  [Types.GET_CHAIN_RESTAURANT_BRANCHES_SUCCESS]: getChainRestaurantBranchesSuccess,
  [Types.GET_CHAIN_RESTAURANT_BRANCHES_FAILURE]: getChainRestaurantBranchesFailure,

  [Types.UPLOAD_FILES_TO_S3_REQUEST]: uploadFilesToS3Request,
  [Types.UPLOAD_FILES_TO_S3_SUCCESS]: uploadFilesToS3Success,
  [Types.UPLOAD_FILES_TO_S3_FAILURE]: uploadFilesToS3Failure,

  [Types.UPLOAD_TEMPLATE_NOTIFICATION_CSV_REQUEST]: uploadTemplateNotificationCsvRequest,
  [Types.UPLOAD_TEMPLATE_NOTIFICATION_CSV_SUCCESS]: uploadTemplateNotificationCsvSuccess,
  [Types.UPLOAD_TEMPLATE_NOTIFICATION_CSV_FAILURE]: uploadTemplateNotificationCsvFailure,

  [Types.GET_S3_SIGNED_IMAGE_URL_REQUEST]: getS3SignedImageUrlRequest,
  [Types.GET_S3_SIGNED_IMAGE_URL_SUCCESS]: getS3SignedImageUrlSuccess,
  [Types.GET_S3_SIGNED_IMAGE_URL_FAILURE]: getS3SignedImageUrlFailure,

  [Types.SEND_TEST_PUSH_NOTIFICATION_REQUEST]: sendTestPushNotificationRequest,
  [Types.SEND_TEST_PUSH_NOTIFICATION_SUCCESS]: sendTestPushNotificationSuccess,
  [Types.SEND_TEST_PUSH_NOTIFICATION_FAILURE]: sendTestPushNotificationFailure,

  [Types.GET_SAMPLE_USER_LIST_REQUEST]: getSampleUserListRequest,
  [Types.GET_SAMPLE_USER_LIST_SUCCESS]: getSampleUserListSuccess,
  [Types.GET_SAMPLE_USER_LIST_FAILURE]: getSampleUserListFailure,

  [Types.GET_TOTAL_USER_COUNT_REQUEST]: getTotalUserCountRequest,
  [Types.GET_TOTAL_USER_COUNT_SUCCESS]: getTotalUserCountSuccess,
  [Types.GET_TOTAL_USER_COUNT_FAILURE]: getTotalUserCountFailure,

  [Types.GET_STATISTICS_REQUEST]: getStatisticsRequest,
  [Types.GET_STATISTICS_SUCCESS]: getStatisticsSuccess,
  [Types.GET_STATISTICS_FAILURE]: getStatisticsFailure,

  [Types.DELETE_NOTIF_EVENTS_REQUEST]: deleteNotifEventsRequest,
  [Types.DELETE_NOTIF_EVENTS_SUCCESS]: deleteNotifEventsSuccess,
  [Types.DELETE_NOTIF_EVENTS_FAILURE]: deleteNotifEventsFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
