import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

import { getStateObject, searchItemFields } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.SUPPLIER.LIST;

const dataFields = ['name', 'vn', 'phone', 'vd', 'supplierReferenceId'];

export const suppliersSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'suppliers');
    },
    filtersState => {
      return getStateObject(filtersState, reducerKey, 'filters');
    },
    ({ data }, filters) => {
      return data.filter(supplier => {
        const { types } = supplier;
        const { searchValue, supplierTypes } = filters;
        const hasSupplierType = !isEmpty(types) && types.some(type => {
          return supplierTypes.includes(type);
        });
        const hasSearchValue = searchItemFields(supplier, searchValue, dataFields);
        return hasSupplierType && hasSearchValue;
      });
    },
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'suppliers');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),

  getSupplierTypes: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ supplierTypes }) => {
      return supplierTypes;
    },
  ),

  getSearchValue: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ searchValue }) => {
      return searchValue;
    },
  ),
};
