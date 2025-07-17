import { createActions } from 'reduxsauce';
import moment from 'moment-timezone';

import { GETIR_10_DOMAIN_TYPE, REDUX_KEY } from '@shared/shared/constants';
import { getSelectedDomainTypeFromLocalStorage } from './localStorage';
import { getInitialDateRanges } from '@shared/containers/Filter/utils';

const prefix = `${REDUX_KEY.MARKET_ORDER.ORDER_FILTER}_`;
export const defaultRowsPerPage = 10;
export const defaultCurrentPage = 1;
export const defaultDomainType = GETIR_10_DOMAIN_TYPE;
export const defaultDates = getInitialDateRanges();
const { startDate, endDate } = defaultDates;

export const { Types, Creators } = createActions(
  {
    getFilteredOrdersRequest: {
      domainType: null,
      offset: defaultCurrentPage,
      limit: defaultRowsPerPage,
      city: null,
      warehouse: null,
      client: null,
      statuses: null,
      errorCode: null,
      deviceTypes: null,
      createdAtStart: moment(startDate).startOf('day').toISOString(),
      createdAtEnd: moment(endDate).endOf('day').toISOString(),
      referenceId: null,
      integrationType: null,
      excludedIntegrationTypes: null,
      initialStatusForSuccessDuration: null,
      minDuration: null,
      maxDuration: null,
      isSlottedDelivery: false,
      isFresh: null,
    },
    getFilteredOrdersSuccess: { data: [] },
    getFilteredOrdersFailure: { error: null },
    setSelectedDomainType: { domainType: defaultDomainType },
    setPagination: {
      currentPage: defaultCurrentPage,
      rowsPerPage: defaultRowsPerPage,
    },
    setSelectedCity: { city: null },
    setSelectedDateRange: { selectedDateRange: defaultDates },
    setWarehouse: { warehouse: null },
    setStatus: { status: null },
    setErrorCode: { errorCode: null },
    setIntegrationType: { integrationType: null },
    setDeviceTypes: { deviceTypes: [] },
    setReferenceId: { referenceId: null },
    setInitialStatusForSuccessDuration: { status: null },
    setMinDuration: { dur: null },
    setMaxDuration: { dur: null },
    setLastUsedFilters: { lastUsedFilters: null },
    setIsSlottedDelivery: { isSlottedDelivery: false },
    initPage: () => ({
      initialDomainType: getSelectedDomainTypeFromLocalStorage(),
      type: `${prefix}INIT_PAGE`,
    }),
    destroyPage: null,
    setFreshFilter: { isFresh: null },
  },

  { prefix },
);
