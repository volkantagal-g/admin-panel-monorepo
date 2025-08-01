import permKey from '@shared/shared/permKey.json';
import { lowerCaseN11 } from '../integrationTypeUtils';
import { MARKET_ACTIVE_ORDER_STATUS, MARKET_ORDER_STATUS } from '@shared/shared/constants';

export const TEST_ID = {
  FILTERS: {
    SELECT_DOMAIN_TYPE: 'filtersSelectDomainType',
    SELECT_CITY: 'filtersSelectCity',
    SELECT_FIELD_MANAGER: 'filtersSelectFieldManager',
    SELECT_COURIER_FILTER: 'filtersSelectCourier',
    SELECT_WAREHOUSE: 'filtersSelectWarehouse',
    SELECT_IS_SLOTTED_DELIVERY: 'filtersSelectIsSlottedDelivery',
    SELECT_ORDER_STATUS: 'filtersSelectOrderStatus',
    INPUT_ORDER_STATUS_MORE_THAN: 'filtersInputOrderStatusMoreThan',
    SELECT_INTEGRATION_TYPES: 'filtersSelectIntegrationTypes',
  },
  STATS_CARD: {
    TOTAL_ACTIVE_ORDER: 'totalActiveOrder',
    PROMO_COUNT: 'promoCount',
    COURIER_ASSIGNED: 'courierAssigned',
    COURIER_UNASSIGNED: 'courierUnassigned',
    AVERAGE_WEIGHT_SHORT: 'averageWeightShort',
    AVERAGE_VOLUME_SHORT: 'averageVolumeShort',
  },
  TABLE: { ORDER_TABLE: 'tableOrder' },
  ACTIONS: { APPLY_FILTERS: 'applyFilters' },
};

export const INTEGRATION_TYPE_TO_ACCESS_KEY = { [lowerCaseN11]: permKey.PAGE_MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_OPERATION_COMPONENT_VIEW_N11 };

export const REST_OF_GETIR_ACCESS_KEY = permKey.PAGE_MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_OPERATION_COMPONENT_VIEW_REST_OF_GETIR;

export const ORDER_STATUS_FOR_OPERATION_PAGE = {
  RESERVED: MARKET_ORDER_STATUS.RESERVED,
  ...MARKET_ACTIVE_ORDER_STATUS,
};
