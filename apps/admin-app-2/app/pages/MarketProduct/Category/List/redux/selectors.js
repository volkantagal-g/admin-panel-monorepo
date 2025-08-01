import { createSelector } from 'reselect';

import { isEmpty } from 'lodash';

import { getStateObject, searchItemFields } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';
import { getLangKey } from '@shared/i18n';

const reducerKey = REDUX_KEY.MARKET_PRODUCT.CATEGORY.LIST;

const lang = getLangKey();
const searchFields = [`name.${lang}`, 'description', 'order'];

export const getMarketProductCategoriesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductCategories');
    },
    ({ data }) => {
      return data || [];
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductCategories');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};

export const getMarketProductSubCategoriesSelector = {
  getData: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductSubCategories');
    },
    filterState => {
      return getStateObject(filterState, reducerKey, 'filters');
    },
    ({ data }, filters) => {
      if(!isEmpty(filters.selectedStatuses)) {
        const selectedStatuses = filters.selectedStatuses.map(status  => Number(status));
        return !isEmpty(data) && data.filter(category => {
          const hasStatusFilter =  selectedStatuses.some(status => category.status === status);
          const hasSearchValue = searchItemFields(category, filters.searchValue, searchFields);
          return hasStatusFilter && hasSearchValue;
        });
      }
      return data || [];
    }
  ),
  getIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getMarketProductSubCategories');
    },
    ({ isPending }) => {
      return isPending || false;
    }
  ),
};

export const filtersSelector = {
  getSelectedFilterOptions: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ selectedStatuses }) => {
      return selectedStatuses;
    },
  ),
};
