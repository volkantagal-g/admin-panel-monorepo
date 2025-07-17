import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.POPUP.DETAIL;

export const getPopupDetailSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'popupDetail');
    },
    ({ data }) => {
      return data || {};
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'popupDetail');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
  getErrors: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'popupDetail');
    },
    ({ error }) => {
      return error || null;
    },
  ),
};

export const getPromoSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'promos');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'promos');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getPopupImagesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'popupImages');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'popupImages');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getConfigKeySelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getConfigKey');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getConfigKey');
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

export const getMarketProductsSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProducts');
    },
    ({ data = [] }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProducts');
    },
    ({ isPending }) => {
      return isPending;
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

/* TODO: This part will be deleted after the promo endpoints of the target services are completed. */
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

export const getCitiesSelector = {
  getData: state => {
    const { data } = getStateObject(state, reducerKey, 'cities');
    return data;
  },
  getIsPending: state => {
    const { isPending } = getStateObject(state, reducerKey, 'cities');
    return isPending;
  },
};

export const getWarehousesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouses');
    },
    ({ data }) => {
      return data;
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'warehouses');
    },
    ({ isPending }) => isPending,
  ),
};

export const pageOptionSelector = { getPageOptions: state => state?.[reducerKey]?.pageOptions };
