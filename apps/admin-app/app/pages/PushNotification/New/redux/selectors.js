import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PUSH_NOTIFICATION.NEW;

export const restaurantListSelector = {
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
      return isPending;
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
      return template.data;
    },
  ),
  isTemplateFileUploading: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'fileUploads');
    },
    ({ template }) => {
      return template?.isPending;
    },
  ),
  getExcludedTemplateFile: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'fileUploads');
    },
    ({ excludedTemplate }) => {
      return excludedTemplate.data;
    },
  ),
  isExcludedTemplateFileUploading: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'fileUploads');
    },
    ({ excludedTemplate }) => {
      return excludedTemplate?.isPending;
    },
  ),
};

export const getClientListTemplateIdSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getClientListTemplateId');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getClientListTemplateId');
    },
    ({ isPending }) => {
      return isPending;
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

export const getAnnouncementSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getAnnouncement');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getAnnouncement');
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
      return isPending;
    },
  ),
};
