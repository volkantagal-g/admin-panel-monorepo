import { createSelector } from 'reselect';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.PRODUCTS_LIST;

export const productsSelector = {
  getData: createSelector(
    state => getStateObject(state, reducerKey, 'products'),
    ({ data }) => data,
  ),
  getIsPending: createSelector(
    state => getStateObject(state, reducerKey, 'products'),
    ({ isPending }) => isPending,
  ),
};

export const getIsProductsModalVisible = createSelector(
  state => getStateObject(state, reducerKey, 'isProductsModalVisible'),
  isProductsModalVisible => isProductsModalVisible,
);
