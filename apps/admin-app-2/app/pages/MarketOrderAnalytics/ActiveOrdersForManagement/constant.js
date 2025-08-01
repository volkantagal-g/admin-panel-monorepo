import permKey from '@shared/shared/permKey.json';
import { lowerCaseN11 } from '../integrationTypeUtils';

export const SEARCH_CLIENT_CACHE_MIN = 5;

export const defaultSortOptions = { sortOptions: { 'checkout.date': -1 } };

export const INTEGRATION_TYPE_TO_ACCESS_KEY = { [lowerCaseN11]: permKey.PAGE_MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_MANAGEMENT_COMPONENT_VIEW_N11 };

export const REST_OF_GETIR_ACCESS_KEY = permKey.PAGE_MARKET_ORDER_ANALYTICS_ACTIVE_ORDERS_FOR_MANAGEMENT_COMPONENT_VIEW_REST_OF_GETIR;
