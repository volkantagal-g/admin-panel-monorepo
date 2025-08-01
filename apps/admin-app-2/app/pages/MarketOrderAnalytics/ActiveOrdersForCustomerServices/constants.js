import permKey from '@shared/shared/permKey.json';
import { lowerCaseN11 } from '../integrationTypeUtils';

export const TEST_ID = {
  TABLE: { ORDERS: 'ordersTable' },
  FILTERS: {
    SELECT_DOMAIN_TYPE: 'filtersSelectDomainType',
    SELECT_CITY: 'filtersSelectCity',
    SELECT_WAREHOUSE: 'filtersSelectWarehouse',
    SELECT_COURIER: 'filtersSelectCourier',
    SELECT_INTEGRATION_TYPES: 'filtersSelectIntegrationTypes',
  },
};

export const INTEGRATION_TYPE_TO_ACCESS_KEY = { [lowerCaseN11]: permKey.PAGE_MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES_COMPONENT_VIEW_N11 };

export const REST_OF_GETIR_ACCESS_KEY = permKey.PAGE_MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES_COMPONENT_VIEW_REST_OF_GETIR;
