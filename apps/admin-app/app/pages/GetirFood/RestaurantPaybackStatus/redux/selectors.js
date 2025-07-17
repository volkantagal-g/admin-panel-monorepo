import { createSelector } from 'reselect';

import { t } from '@shared/i18n';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FOOD.RESTAURANT_PAYBACK_STATUS;

export const getCurrentStatus = {
  getData: createSelector(
    state => state?.[reducerKey]?.getCurrentStatus.data,
    ({ data }) => {
      const result = {
        ...data,
        status: data?.isPaused ? t('foodRestaurantPaybackStatus:PAUSED') : t('foodRestaurantPaybackStatus:ACTIVE'),
        buttonLabel: data?.isPaused ? t('foodRestaurantPaybackStatus:RESUME') : t('foodRestaurantPaybackStatus:PAUSE'),
      };
      return result;
    },
  ),
  getIsPending: state => state?.[reducerKey]?.getCurrentStatus.isPending,
};

export const changePaybackStatus = {
  getIsPending:
   state => state?.[reducerKey]?.changePaybackStatus.isPending,
};

export const changeAllRestaurantsPaybackStatus = {
  getIsPending:
   state => state?.[reducerKey]?.changeAllRestaurantsPaybackStatus.isPending,
};

export const changePartialRestaurantsPaybackStatus = {
  getIsPending:
   state => state?.[reducerKey]?.changePartialRestaurantsPaybackStatus.isPending,
};

export const validatePartialRestaurantsPaybackStatus = {
  getIsPending:
   state => state?.[reducerKey]?.validatePartialRestaurantsPaybackStatus.isPending,
};
