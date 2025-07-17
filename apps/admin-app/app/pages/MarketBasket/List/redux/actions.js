import { createActions } from 'reduxsauce';

import { GETIR_10_DOMAIN_TYPE, REDUX_KEY } from '@shared/shared/constants';
import { getInitialDateRanges } from '@shared/containers/Filter/utils';

const prefix = `${REDUX_KEY.MARKET_BASKET.LIST}_`;
export const defaultRowsPerPage = 10;
export const defaultCurrentPage = 1;
export const defaultDomainType = GETIR_10_DOMAIN_TYPE;
export const defaultDates = getInitialDateRanges();

export const { Types, Creators } = createActions(
  {
    getMarketBasketsRequest: {
      cityId: null,
      deviceTypes: [],
      domainType: defaultDomainType,
      endDateTime: null,
      startDateTime: null,
      clientId: null,
      statuses: [],
      limit: defaultCurrentPage,
      page: defaultRowsPerPage,
    },
    getMarketBasketsSuccess: { data: [] },
    getMarketBasketsFailure: { error: null },
    initPage: null,
    destroyPage: null,
    setFilters: { filters: null },
  },
  { prefix },
);
