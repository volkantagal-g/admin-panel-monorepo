import { get as _get } from 'lodash';

import { createSelector } from 'reselect';

import { availableDomainTypesForCountrySelector } from '@shared/redux/selectors/common';
import { GETIR_10_DOMAIN_TYPE, INTEGRATION_TYPES, REDUX_KEY } from '@shared/shared/constants';
import {
  getFormattedPromoRatesDataWithObjectiveTypes,
  getFormattedPromoRatesDataWithoutObjectiveTypes,
  getFormattedNewClientStats,
  // getFormattedClientOrderCounts,
  getFormattedClientOrderCountsFromOldPanel,
  getFormattedWarehouseStats,
} from '../utils';

import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

const reduxKey = REDUX_KEY.GETIR_MARKET.GROWTH_COMPARISON;

export const getActiveIntegrationTypesIsPending = state => state[reduxKey]?.activeIntegrationTypes?.isPending;

export const getActiveIntegrationTypesSetSelector = createSelector(
  state => state[reduxKey]?.activeIntegrationTypes?.data,
  activeIntegrationTypes => {
    const selectedCountry = getSelectedCountry();
    const countryCode = _get(selectedCountry, 'code.alpha2', '');

    const filteredActiveIntegrationTypes = [
      ...(activeIntegrationTypes?.value || []),
      ...(activeIntegrationTypes?.customValue?.[countryCode] || []),
    ];
    if (!filteredActiveIntegrationTypes.length) {
      return new Set([]);
    }
    return new Set([
      INTEGRATION_TYPES.GETIR,
      ...filteredActiveIntegrationTypes,
    ]);
  },
);

export const filtersSelector = {
  getFilters: state => state[reduxKey]?.filters,
  getDomainTypes: createSelector(
    state => state[reduxKey]?.filters,
    availableDomainTypesForCountrySelector?.getDomainTypes,
    (filters, availableDomainTypes) => {
      const domainType = filters?.domainType;
      if (!availableDomainTypes?.includes(domainType)) return GETIR_10_DOMAIN_TYPE;
      return domainType;
    },
  ),
  getIntegrationTypes: createSelector(
    state => state[reduxKey]?.filters,
    getActiveIntegrationTypesSetSelector,
    (filters, availableIntegrationTypes) => {
      const integrationType = filters?.integrationType;

      if (!availableIntegrationTypes?.has(integrationType)) return null;
      return integrationType;
    },
  ),
};

export const promoRatesSelector = {
  getDataWithObjectives: state => getFormattedPromoRatesDataWithObjectiveTypes(state[reduxKey]?.orderPromoDistribution.data),
  getDataWithoutObjectives: state => getFormattedPromoRatesDataWithoutObjectiveTypes(state[reduxKey]?.orderPromoDistribution.data),
  getIsPending: state => state[reduxKey]?.orderPromoDistribution.isPending,
};

export const newClientStatsSelector = {
  getData: state => getFormattedNewClientStats(state[reduxKey]?.newClientStats.data),
  getIsPending: state => state[reduxKey]?.newClientStats.isPending,
};

export const clientOrderCountsSelector = {
  getData: state => getFormattedClientOrderCountsFromOldPanel(state[reduxKey]?.clientOrderCounts.data),
  getIsPending: state => state[reduxKey]?.clientOrderCounts.isPending,
};

export const warehouseStatsSelector = {
  getData: state => getFormattedWarehouseStats({ filters: state[reduxKey]?.filters, warehouseStats: state[reduxKey]?.warehouseStats.data }),
  getIsPending: state => state[reduxKey]?.warehouseStats.isPending,
};
