import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  setSelectedRestaurants: { selectedRestaurants: [] },

  getRestaurantsByNameRequest: { searchString: '' },
  getRestaurantsByNameSuccess: { data: [] },
  getRestaurantsByNameFailure: { error: null },

  getRestaurantDetailsByIdsRequest: { restaurants: [], setSelectedRestaurants: false },
  getRestaurantDetailsByIdsSuccess: { data: [] },
  getRestaurantDetailsByIdsFailure: { error: null },

  getChainRestaurantsRequest: { searchString: '' },
  getChainRestaurantsSuccess: { data: [] },
  getChainRestaurantsFailure: { error: null },

  getChainRestaurantBranchesRequest: { chainRestaurantId: null },
  getChainRestaurantBranchesSuccess: { data: {} },
  getChainRestaurantBranchesFailure: { error: null },

  uploadFilesToS3Request: { file: { base64: null, name: null }, fileStateKey: null },
  uploadFilesToS3Success: { file: {}, fileStateKey: null },
  uploadFilesToS3Failure: { error: null },

  getClientListTemplateIdSuccess: { data: [] },
  getClientListTemplateIdFailure: { error: null },
  getClientListTemplateFilterExcludedRequest: { body: null },
  getClientListTemplateFilterExcludedSuccess: { data: [] },
  getClientListTemplateFilterExcludedFailure: { error: null },

  getPromoRequest: {},
  getPromoSuccess: { data: [] },
  getPromoFailure: { error: null },
  getFoodPromosBySearchCodeRequest: { params: {} },
  getFoodPromosBySearchCodeSuccess: { data: [] },
  getFoodPromosBySearchCodeFailure: { error: null },

  notificationSaveRequest: { body: {} },
  notificationSaveSuccess: { data: [] },
  notificationSaveFailure: { error: null },

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

  // Client App Actions
  getAnnouncementRequest: {},
  getAnnouncementSuccess: { data: [] },
  getAnnouncementFailure: { error: null },

  getMarketProductCategoriesRequest: { isSubCategory: null },
  getMarketProductCategoriesSuccess: { data: [] },
  getMarketProductCategoriesFailure: { error: null },

  getFoodPromoBySearchCodeRequest: { filterParams: {} },
  getFoodPromoBySearchCodeSuccess: { data: [] },
  getFoodPromoBySearchCodeFailure: { error: null },

  initPage: null,
  destroyPage: null,
  updateNotificationImageUrlSuccess: { data: {} },
  updateNotificationImageUrlFailure: { error: null },
}, { prefix: `${REDUX_KEY.PUSH_NOTIFICATION.NEW}_` });
