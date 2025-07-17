import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export const INITIAL_STATE = {
  promoList: {
    isPending: false,
    data: [],
    error: null,
    promoCities: [],
    promoRestaurants: [],
  },

  restaurantList: {
    isPending: false,
    selectedRestaurants: [],
    data: [],
    error: null,
  },

  chainRestaurants: {
    isPending: false,
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

  chainRestaurantBranches: {
    isPending: false,
    data: [],
    error: null,
  },

  getFoodPromosBySearchCode: {
    isPending: false,
    data: [],
    error: null,
  },

  notificationUpdate: {
    isPending: false,
    data: [],
    error: null,
  },

  notificationSave: {
    isPending: false,
    data: [],
    error: null,
  },

  uploadTemplateNotificationCsv: {
    isPending: false,
    isSuccess: false,
  },

};

export const cancelPromoRequest = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    promoList: {
      ...INITIAL_STATE.promoList,
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

export const getRestaurantDetailsByIdsSuccess = (state = INITIAL_STATE, { data }) => {
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

export const notificationSaveRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    notificationSave: {
      ...state.notificationSave,
      isPending: true,
    },
  };
};

export const notificationSaveSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    notificationSave: {
      ...state.notificationSave,
      isPending: false,
      data,
    },
  };
};

export const notificationSaveFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    notificationSave: {
      ...state.notificationSave,
      isPending: false,
      error,
    },
  };
};

export const getFoodPromosBySearchCodeRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    getFoodPromosBySearchCode: {
      ...state.getFoodPromosBySearchCode,
      isPending: true,
    },
  };
};

export const getFoodPromosBySearchCodeSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    getFoodPromosBySearchCode: {
      ...INITIAL_STATE.getFoodPromosBySearchCode,
      data,
      isPending: false,
    },
  };
};

export const getFoodPromosBySearchCodeFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    getFoodPromosBySearchCode: {
      ...state.getFoodPromosBySearchCode,
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

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.SET_SELECTED_RESTAURANTS]: setSelectedRestaurants,

  [Types.GET_RESTAURANTS_BY_NAME_REQUEST]: getRestaurantsByNameRequest,
  [Types.GET_RESTAURANTS_BY_NAME_SUCCESS]: getRestaurantsByNameSuccess,
  [Types.GET_RESTAURANTS_BY_NAME_FAILURE]: getRestaurantsByNameFailure,

  [Types.GET_RESTAURANT_DETAILS_BY_IDS_REQUEST]: getRestaurantDetailsByIdsRequest,
  [Types.GET_RESTAURANT_DETAILS_BY_IDS_SUCCESS]: getRestaurantDetailsByIdsSuccess,
  [Types.GET_RESTAURANT_DETAILS_BY_IDS_FAILURE]: getRestaurantDetailsByIdsFailure,

  [Types.GET_CHAIN_RESTAURANTS_REQUEST]: getChainRestaurantsRequest,
  [Types.GET_CHAIN_RESTAURANTS_SUCCESS]: getChainRestaurantsSuccess,
  [Types.GET_CHAIN_RESTAURANTS_FAILURE]: getChainRestaurantsFailure,

  [Types.GET_CHAIN_RESTAURANT_BRANCHES_REQUEST]: getChainRestaurantBranchesRequest,
  [Types.GET_CHAIN_RESTAURANT_BRANCHES_SUCCESS]: getChainRestaurantBranchesSuccess,
  [Types.GET_CHAIN_RESTAURANT_BRANCHES_FAILURE]: getChainRestaurantBranchesFailure,

  [Types.UPLOAD_FILES_TO_S3_REQUEST]: uploadFilesToS3Request,
  [Types.UPLOAD_FILES_TO_S3_SUCCESS]: uploadFilesToS3Success,
  [Types.UPLOAD_FILES_TO_S3_FAILURE]: uploadFilesToS3Failure,

  [Types.GET_FOOD_PROMOS_BY_SEARCH_CODE_REQUEST]: getFoodPromosBySearchCodeRequest,
  [Types.GET_FOOD_PROMOS_BY_SEARCH_CODE_SUCCESS]: getFoodPromosBySearchCodeSuccess,
  [Types.GET_FOOD_PROMOS_BY_SEARCH_CODE_FAILURE]: getFoodPromosBySearchCodeFailure,

  [Types.NOTIFICATION_SAVE_REQUEST]: notificationSaveRequest,
  [Types.NOTIFICATION_SAVE_SUCCESS]: notificationSaveSuccess,
  [Types.NOTIFICATION_SAVE_FAILURE]: notificationSaveFailure,

  [Types.UPLOAD_TEMPLATE_NOTIFICATION_CSV_REQUEST]: uploadTemplateNotificationCsvRequest,
  [Types.UPLOAD_TEMPLATE_NOTIFICATION_CSV_SUCCESS]: uploadTemplateNotificationCsvSuccess,
  [Types.UPLOAD_TEMPLATE_NOTIFICATION_CSV_FAILURE]: uploadTemplateNotificationCsvFailure,

  [Types.GET_S3_SIGNED_IMAGE_URL_REQUEST]: getS3SignedImageUrlRequest,
  [Types.GET_S3_SIGNED_IMAGE_URL_SUCCESS]: getS3SignedImageUrlSuccess,
  [Types.GET_S3_SIGNED_IMAGE_URL_FAILURE]: getS3SignedImageUrlFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
