import { createSelector } from 'reselect';
import _ from 'lodash';

import { getLangKey } from '@shared/i18n';
import { getStateObject, searchItemFields } from '@shared/utils/common';
import { REDUX_KEY, GETIR_MARKET_DOMAIN_TYPES, DOMAIN_FILTER_TYPES } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.DTS.SUMMARY;

const resultsDataSearchFields = [
  '_id',
  'name',
  `city.name.${getLangKey()}`,
  `city.region.${getLangKey()}`,
  `stateText.${getLangKey()}`,
  `statusText.${getLangKey()}`,
];

export const resultsSelector = {
  getResults: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'response');
    },
    ({ data }) => {
      return data;
    }
  ),
  getResultsIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'response');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const pointsSelector = {
  getPoints: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'response');
    },
    ({ data }) => {
      return data;
    }
  ),
  getPointsIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'response');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const dtsCategoriesSelector = {
  getDtsCategories: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'dtsCategories');
    },
    ({ data }) => {
      return data;
    }
  ),
  getDtsCategoriesIsPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'dtsCategories');
    },
    ({ isPending }) => {
      return isPending;
    }
  ),
};

export const filtersSelector = {
  getCities: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ cities }) => {
      return cities;
    }
  ),
  getDomainTypes: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ domainTypes }) => {
      return domainTypes;
    }
  ),
  getWarehouseTypes: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ warehouseTypes }) => {
      return warehouseTypes;
    }
  ),
  getSearchValue: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filters');
    },
    ({ searchValue }) => {
      return searchValue;
    }
  ),
};

export const filteredResultsSelector = {
  getResults: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'filteredResults');
    },
    filtersState => {
      return getStateObject(filtersState, reducerKey, 'filters');
    },
    ({ data }, filters) => {
      return data.filter(result => {
        if (!result.city) {
          return false;
        }
        const selectedCities = filters.cities.map(city => _.split(city, '_')[1]);

        const { domainFilterType } = filters;
        const domainTypesSet = new Set(filters.domainTypes);
        const stringDomainTypes = result.domainTypes.filter(domainType => {
          return _.includes(GETIR_MARKET_DOMAIN_TYPES, domainType);
        }).sort((a, b) => a - b).map(domainType => domainType.toString());
        const hasCity = _.some(selectedCities, id => id === result.city._id, false);
        const hasDomainType =  domainFilterType === DOMAIN_FILTER_TYPES.INCLUDES ? stringDomainTypes.some(selectedDomainType => {
          return domainTypesSet.has(selectedDomainType);
        }) : _.isEqual(stringDomainTypes, filters.domainTypes.sort((a, b) => a.localeCompare(b)));
        const hasWarehouseType = filters.warehouseTypes.includes(result.warehouseType.toString());
        const hasSearchValue = searchItemFields(result, filters.searchValue, resultsDataSearchFields);

        return hasCity && hasDomainType && hasWarehouseType && hasSearchValue;
      });
    }
  ),
};
