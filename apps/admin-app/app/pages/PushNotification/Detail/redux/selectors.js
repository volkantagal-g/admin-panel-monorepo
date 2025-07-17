import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PUSH_NOTIFICATION.DETAIL;

export const notificationDetailSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'notificationDetail');
    },
    ({ data }) => {
      return data || {};
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'notificationDetail');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
  getError: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'notificationDetail');
    },
    ({ error }) => {
      return error || null;
    },
  ),
};

export const restaurantListSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'restaurantList');
    },
    ({ data }) => {
      return data || [];
    },
  ),
  getSelectedRestaurants: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'restaurantList');
    },
    ({ selectedRestaurants }) => {
      return selectedRestaurants || [];
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'restaurantList');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};

export const getPromoListSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'promoList');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'promoList');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const chainRestaurantsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'chainRestaurants');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'chainRestaurants');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getBranchRestaurants: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'chainRestaurants');
    },
    ({ branchData }) => {
      return branchData;
    },
  ),
};

export const fileUploadSelector = {
  getTemplateFile: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'fileUploads');
    },
    ({ template }) => {
      return template?.data;
    },
  ),
  isTemplateFileUploading: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'fileUploads');
    },
    ({ template }) => {
      return template?.isPending || false;
    },
  ),
  getExcludedTemplateFile: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'fileUploads');
    },
    ({ excludedTemplate }) => {
      return excludedTemplate?.data;
    },
  ),
  isExcludedTemplateFileUploading: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'fileUploads');
    },
    ({ excludedTemplate }) => {
      return excludedTemplate?.isPending || false;
    },
  ),
};

export const getClientListTemplateExcludedFilterSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getClientListTemplateExcludedFilter');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getClientListTemplateExcludedFilter');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getChainRestaurantBranchesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getChainRestaurantBranches');
    },
    ({ data }) => {
      return data || {};
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getChainRestaurantBranches');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const chainRestaurantBranchesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'chainRestaurantBranches');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'chainRestaurantBranches');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const restaurantsByNameSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'restaurantList');
    },
    ({ data }) => {
      return data;
    },
  ),
  getSelectedRestaurants: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'selectedRestaurants');
    },
    ({ selectedRestaurants }) => {
      return selectedRestaurants;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'restaurantList');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getRestaurantAllByIdsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRestaurantAllByIds');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getRestaurantAllByIds');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getFoodPromosBySearchCodeSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getFoodPromosBySearchCode');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getFoodPromosBySearchCode');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const notificationSaveSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'notificationSave');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'notificationSave');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const uploadTemplateNotificationCsvSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'uploadTemplateNotificationCsv');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getIsSuccess: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'uploadTemplateNotificationCsv');
    },
    ({ isSuccess }) => {
      return isSuccess;
    },
  ),
};

export const getS3SignedImageUrlSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'notifImages');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};

export const testPushNotificationSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'testPushNotification');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'testPushNotification');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getSampleUserListSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'sampleUserList');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'sampleUserList');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getTotalUserCountSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'totalUserCount');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'totalUserCount');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getStatisticsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'statistics');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'statistics');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

// Client App Action Selectors Begin

export const artisanCuisineTypesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'artisanCuisineTypes');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'artisanCuisineTypes');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};

export const getMarketProductCategoriesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketProductCategories');
    },
    ({ data }) => {
      return data || [];
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'marketProductCategories');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};

export const getFoodPromoBySearchCodeSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'foodPromos');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'foodPromos');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getRestaurantsByNameSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'restaurantsByName');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'restaurantsByName');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const localsChainsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'chains');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'chains');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const shopsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'shops');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'shops');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

// Client App Action Selectors End
