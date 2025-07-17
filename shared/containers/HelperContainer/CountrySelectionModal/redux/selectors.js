import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.HELPER.HELPER_COUNTRY_SELECTION_MODAL;

export const getCountrySelectionModalVisibilitySelector = {
  getVisibility: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'setVisibility');
    },
    ({ data }) => {
      return data;
    }),
};
