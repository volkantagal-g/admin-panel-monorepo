import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.POPUP.NEW;

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

export const pageOptionSelector = { getPageOptions: state => state?.[reducerKey]?.pageOptions };
