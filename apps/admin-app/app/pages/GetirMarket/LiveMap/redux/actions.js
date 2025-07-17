import _ from 'lodash';
import { createActions } from 'reduxsauce';

import { getSelectedCountry } from '@shared/redux/selectors/countrySelection';

import { REDUCER_KEY } from './selectors';

const prefix = `${REDUCER_KEY}_`;

export const { Types, Creators } = createActions(
  {
    getPolygonsRequest: { data: null },
    getPolygonsSuccess: { data: null },
    getPolygonsFailure: { error: null },
    resetPolygons: null,

    getInitialCouriersRequest: { data: null },
    getInitialCouriersSuccess: { data: null },
    getInitialCouriersFailure: { error: null },
    updateCouriersData: { data: null },

    setMapState: { coordinates: [], zoomLevel: 10 },

    setDomainType: { domainType: null },
    setCity: { city: null },
    setFilterCountry: { country: null },
    setPolygonType: { polygonType: null },
    setSelectedPlaceMark: { data: null },
    setMappedWarehouses: { warehouses: null },
    setMappedWarehousesSuccess: { mappedWarehouses: null },

    getLiveMapDataRequest: { selectedCity: null, selectedCountryCode: null, selectedDivision: null },
    getLiveMapDataSuccess: { data: null },
    getLiveMapDataFailure: { error: null },

    resetFailOrderCounts: null,
    startListeningSocketEvents: {},
    updateStateWithSocketData: { data: null },
    startInterval: null,

    formatCourierCountsTableRequest: {
      warehouseSearch: null,
      domainType: null,
      rawData: null,
      courierPlanViolations: null,
      warehouses: null,
      noBreadStockWarehouses: null,
      noRamadanPitaStockWarehouses: null,
    },
    toggleShowCourierType: { courierType: null },
    resetCouriersMarkers: {},
    formatCourierCountsTableSuccess: { data: null },
    formatCourierCountsTableError: { error: null },

    initPage: () => {
      const action = {
        type: `${prefix}INIT_PAGE`,
        initialFilterCountry: _.get(getSelectedCountry(), '_id', null),
      };
      return action;
    },
    destroyPage: null,
  },
  { prefix },
);
