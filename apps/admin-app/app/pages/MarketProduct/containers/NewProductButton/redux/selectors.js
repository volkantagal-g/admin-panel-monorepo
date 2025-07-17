import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { reduxKey } from 'pages/MarketProduct/containers/NewProductButton/constants';

export const createMarketProductSelector = {
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reduxKey, 'createMarketProduct');
    },
    ({ isPending }) => {
      return isPending || false;
    },
  ),
};

export const isModalOpenSelector = createSelector(
  state => state?.[reduxKey],
  state => state?.isModalOpen,
);
