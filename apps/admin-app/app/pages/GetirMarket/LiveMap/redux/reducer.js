import { createReducer } from 'reduxsauce';

import { DEFAULT_MAP_COORDINATES } from '@shared/shared/constants';

import { Types } from './actions';
import { getSelectedDomainType } from '@shared/redux/selectors/common';

const generateCustomInitialState = () => ({
  polygonsData: {
    data: null,
    isPending: false,
    error: null,
  },
  liveMapData: {
    data: { failedOrderMarkers: [] },
    isPending: false,
    error: null,
  },
  mapState: {
    coordinates: DEFAULT_MAP_COORDINATES,
    zoomLevel: 10,
  },
  couriersData: {
    data: null,
    isPending: false,
    error: null,
  },
  filteredCourierStatusCountsData: {
    data: null,
    isPending: false,
    error: null,
  },
  filters: {
    domainType: getSelectedDomainType(),
    city: null,
    polygonType: null,
    warehouseSearch: null,
    country: null,
  },
  selectedPlaceMark: null,
  failedOrderPlaceMark: null,
  mappedWarehouses: null,
  showCourierType: {
    showEMotorcycleCouriers: true,
    showMotoCouriers: true,
    showMoto50ccCouriers: true,
    showCarCouriers: true,
    showOnFootCouriers: true,
    showBusyCouriers: false,
    showMiTuCouriers: true,
    showEBicycleCouriers: true,
    showECarCouriers: true,
  },
});

export const INITIAL_STATE = generateCustomInitialState();

const getPolygonsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    polygonsData: {
      ...state.polygonsData,
      isPending: true,
    },
  };
};

const getPolygonsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    polygonsData: {
      ...state.polygonsData,
      isPending: false,
      data,
    },
  };
};

const getPolygonsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    polygonsData: {
      ...state.polygonsData,
      isPending: false,
      error,
    },
  };
};

const getLiveMapDataRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    liveMapData: {
      ...state.liveMapData,
      isPending: true,
    },
  };
};

const getLiveMapDataSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    liveMapData: {
      ...state.liveMapData,
      isPending: false,
      // failed order counts are coming from another source
      data: {
        ...state.liveMapData.data,
        ...data,
      },
    },
  };
};

const getLiveMapDataFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    liveMapData: {
      ...state.liveMapData,
      isPending: false,
      error,
    },
  };
};

const getInitialCouriersRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    couriersData: {
      ...state.couriersData,
      isPending: true,
    },
  };
};

const getInitialCouriersSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    couriersData: {
      ...state.couriersData,
      isPending: false,
      data,
    },
  };
};

const getInitialCouriersFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    couriersData: {
      ...state.couriersData,
      isPending: false,
      error,
    },
  };
};

const resetPolygons = (state = INITIAL_STATE) => {
  return {
    ...state,
    polygonsData: {
      data: null,
      isPending: false,
      error: null,
    },
  };
};

const setDomainType = (state = INITIAL_STATE, { domainType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      domainType,
    },
  };
};

const setMapState = (state = INITIAL_STATE, { coordinates, zoomLevel }) => {
  return {
    ...state,
    mapState: { coordinates, zoomLevel },
  };
};

const setCity = (state = INITIAL_STATE, { city }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      city,
    },
  };
};

const setFilterCountry = (state = INITIAL_STATE, { country }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      country,
    },
  };
};

const setPolygonType = (state = INITIAL_STATE, { polygonType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      polygonType,
    },
  };
};

const setSelectedPlaceMark = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    selectedPlaceMark: data,
  };
};

const updateStateWithSocketData = (state = INITIAL_STATE, { data }) => {
  const { failOrderCounts, couriers, failedOrderMarkers } = data;
  const copyCouriers = { ...couriers };
  let mergedCouriers = [];
  if (state.couriersData.data) {
    mergedCouriers = state.couriersData.data.map(courier => {
      const newCourier = { ...courier, ...copyCouriers[courier._id || courier.id] };
      // remove so new ones are left to loop
      delete copyCouriers[courier._id || courier.id];
      return newCourier;
    });
  }

  Object.values(copyCouriers).forEach(c => {
    mergedCouriers.push(c);
  });

  return {
    ...state,
    liveMapData: {
      ...state.liveMapData,
      data: {
        ...state.liveMapData.data,
        failOrderCounts,
        failedOrderMarkers,
      },
    },
    couriersData: {
      ...state.couriersData,
      data: mergedCouriers,
    },
  };
};

const formatCourierCountsTableRequest = (state = INITIAL_STATE, { warehouseSearch, rawData, warehouses, domainType }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      rawData,
      warehouseSearch,
      warehouses,
      domainType: domainType || state.filters.domainType,
    },
    filteredCourierStatusCountsData: {
      ...state.filteredCourierStatusCountsData,
      isPending: true,
    },
  };
};

const formatCourierCountsTableSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    filteredCourierStatusCountsData: {
      ...state.filteredCourierStatusCountsData,
      isPending: false,
      data,
    },
  };
};

const formatCourierCountsTableError = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    filteredCourierStatusCountsData: {
      isPending: false,
      error,
    },
  };
};

const setMappedWarehousesSuccess = (state = INITIAL_STATE, { mappedWarehouses }) => {
  return {
    ...state,
    mappedWarehouses,
  };
};

const toggleShowCourierType = (state = INITIAL_STATE, { courierType }) => {
  return {
    ...state,
    showCourierType: {
      ...state.showCourierType,
      [courierType]: !state.showCourierType[courierType],
    },
  };
};

const resetCouriersMarkers = (state = INITIAL_STATE) => {
  return {
    ...state,
    showCourierType: {
      showEMotorcycleCouriers: false,
      showMotoCouriers: false,
      showCarCouriers: false,
      showOnFootCouriers: false,
      showBusyCouriers: false,
      showMiTuCouriers: false,
      showEBicycleCouriers: false,
    },
  };
};

const resetFailOrderCounts = (state = INITIAL_STATE) => {
  return {
    ...state,
    liveMapData: {
      ...state.liveMapData,
      data: {
        ...state.liveMapData.data,
        failOrderCounts: null,
      },
    },
  };
};

const initPage = (state = INITIAL_STATE, { initialFilterCountry }) => {
  return {
    ...state,
    ...generateCustomInitialState(),
    filters: {
      ...state.filters,
      domainType: getSelectedDomainType(),
      country: initialFilterCountry,
      polygonType: `${getSelectedDomainType()}-1`,
    },
  };
};

const destroy = () => {
  return { ...generateCustomInitialState() };
};

export const HANDLERS = {
  [Types.GET_POLYGONS_REQUEST]: getPolygonsRequest,
  [Types.GET_POLYGONS_SUCCESS]: getPolygonsSuccess,
  [Types.GET_POLYGONS_FAILURE]: getPolygonsFailure,
  [Types.GET_LIVE_MAP_DATA_REQUEST]: getLiveMapDataRequest,
  [Types.GET_LIVE_MAP_DATA_SUCCESS]: getLiveMapDataSuccess,
  [Types.GET_LIVE_MAP_DATA_FAILURE]: getLiveMapDataFailure,
  [Types.GET_INITIAL_COURIERS_REQUEST]: getInitialCouriersRequest,
  [Types.GET_INITIAL_COURIERS_SUCCESS]: getInitialCouriersSuccess,
  [Types.GET_INITIAL_COURIERS_FAILURE]: getInitialCouriersFailure,
  [Types.RESET_POLYGONS]: resetPolygons,
  [Types.SET_DOMAIN_TYPE]: setDomainType,
  [Types.SET_CITY]: setCity,
  [Types.SET_FILTER_COUNTRY]: setFilterCountry,
  [Types.SET_POLYGON_TYPE]: setPolygonType,
  [Types.SET_MAP_STATE]: setMapState,
  [Types.SET_SELECTED_PLACE_MARK]: setSelectedPlaceMark,
  [Types.UPDATE_STATE_WITH_SOCKET_DATA]: updateStateWithSocketData,
  [Types.RESET_FAIL_ORDER_COUNTS]: resetFailOrderCounts,
  [Types.SET_MAPPED_WAREHOUSES_SUCCESS]: setMappedWarehousesSuccess,
  [Types.TOGGLE_SHOW_COURIER_TYPE]: toggleShowCourierType,
  [Types.RESET_COURIERS_MARKERS]: resetCouriersMarkers,
  [Types.FORMAT_COURIER_COUNTS_TABLE_REQUEST]: formatCourierCountsTableRequest,
  [Types.FORMAT_COURIER_COUNTS_TABLE_SUCCESS]: formatCourierCountsTableSuccess,
  [Types.FORMAT_COURIER_COUNTS_TABLE_ERROR]: formatCourierCountsTableError,
  [Types.INIT_PAGE]: initPage,
  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
