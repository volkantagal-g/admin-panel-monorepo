import { ROUTE } from '@app/routes';

export const NAMESPACES = {
  MARKET: 'market',
  FOOD: 'food',
  VOYAGER: 'voyager',
  LOCALS: 'locals',
};

export const CONFIG_TYPES = {
  GLOBAL: 'global',
  COUNTRY: 'country',
  CITY: 'city',
  REGION: 'region',
  WAREHOUSE: 'warehouse',
  WAREHOUSE_GROUP: 'warehouse_group',
};

export const DOMAIN_DETAIL_ROUTES_BY_NAMESPACES = {
  [NAMESPACES.MARKET]: ROUTE.ALGORITHM_MARKET_DOMAIN_CONFIG_DETAIL,
  [NAMESPACES.FOOD]: ROUTE.ALGORITHM_FOOD_DOMAIN_CONFIG_DETAIL,
  [NAMESPACES.VOYAGER]: ROUTE.ALGORITHM_VOYAGER_DOMAIN_CONFIG_DETAIL,
  [NAMESPACES.LOCALS]: ROUTE.ALGORITHM_LOCALS_DOMAIN_CONFIG_DETAIL,
};

export const DOMAIN_LIST_ROUTES_BY_NAMESPACES = {
  [NAMESPACES.MARKET]: ROUTE.ALGORITHM_MARKET_DOMAIN_CONFIG_LIST,
  [NAMESPACES.FOOD]: ROUTE.ALGORITHM_FOOD_DOMAIN_CONFIG_LIST,
  [NAMESPACES.VOYAGER]: ROUTE.ALGORITHM_VOYAGER_DOMAIN_CONFIG_LIST,
  [NAMESPACES.LOCALS]: ROUTE.ALGORITHM_LOCALS_DOMAIN_CONFIG_LIST,
};

export const FOOD_CONSTANTS = {
  namespace: 'food',
  defaultFilters: [{ field: 'is_custom', value: false }],
  typeOptions: [
    { value: 'global', label: 'GLOBAL' },
    { value: 'country', label: 'COUNTRY' },
    { value: 'city', label: 'CITY' },
    { value: 'warehouse_group', label: 'WAREHOUSE_GROUP' },
  ],
};

export const LOCALS_CONSTANTS = {
  namespace: 'locals',
  defaultFilters: [{ field: 'is_custom', value: false }],
  typeOptions: [
    { value: 'global', label: 'GLOBAL' },
    { value: 'country', label: 'COUNTRY' },
    { value: 'city', label: 'CITY' },
    { value: 'warehouse_group', label: 'WAREHOUSE_GROUP' },
  ],
};

export const MARKET_CONSTANTS = {
  namespace: 'market',
  defaultFilters: [{ field: 'is_custom', value: false }],
  typeOptions: [
    { value: 'global', label: 'GLOBAL' },
    { value: 'country', label: 'COUNTRY' },
    { value: 'city', label: 'CITY' },
    { value: 'region', label: 'REGION' },
    { value: 'warehouse', label: 'WAREHOUSE' },
  ],
};

export const VOYAGER_CONSTANTS = {
  namespace: 'voyager',
  defaultFilters: [{ field: 'is_custom', value: false }],
  typeOptions: [
    { value: 'global', label: 'GLOBAL' },
    { value: 'country', label: 'COUNTRY' },
    { value: 'city', label: 'CITY' },
    { value: 'region', label: 'REGION' },
    { value: 'warehouse', label: 'WAREHOUSE' },
  ],
};

export const INPUT_VALIDATION_TYPE_MAP = {
  slider: 'number',
  decimal: 'number',
  integer: 'number',
  boolean: 'bool',
};
