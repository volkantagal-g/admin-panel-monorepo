import permKey from '@shared/shared/permKey.json';
import { lowerCaseN11 } from '../integrationTypeUtils';

export const INTEGRATION_TYPE_TO_ACCESS_KEY = {
  [lowerCaseN11]:
    (permKey.PAGE_MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD_COMPONENT_VIEW_N11),
};

export const REST_OF_GETIR_ACCESS_KEY = permKey.PAGE_MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_EXECUTIVE_DASHBOARD_COMPONENT_VIEW_REST_OF_GETIR;

export const DELIVERY_TYPES = {
  SCHEDULED: true,
  ON_DEMAND: false,
};
