export const mockedDomainSettingsData = {
  namespace: 'voyager',
  units: null,
  default_config_set: [
    {
      field: 'DELIVERY_DURATION_THRESHOLD_BY_WAREHOUSES',
      type: 'slider',
      min: 120,
      max: 210,
      step: 10,
      options: null,
    },
    {
      field: 'WAREHOUSE_OPENING_MODE_ORDER_LIMIT_BY_WAREHOUSES',
      type: 'slider',
      min: 10,
      max: 50,
      step: 1,
      options: null,
    },
    {
      field: 'MITU_WAREHOUSE_SERVICE_LIMIT_BY_WAREHOUSES',
      type: 'slider',
      min: 1,
      max: 5,
      step: 0.5,
      options: null,
    },
  ],
};
