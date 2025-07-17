import permKey from '@shared/shared/permKey.json';

export const warehouseDomainTypes = [
  { label: 'Market', value: 'market' },
  { label: 'Getir Water', value: 'getirWater' },
  { label: 'Store Conversion', value: 'storeConversion' },
];

// Currently start_date and end_date are mandatory fields that will come from the API
// If naming convention changes, this should be updated to not break any functionality
export const mandatoryDateFields = {
  startDate: 'start_date',
  endDate: 'end_date',
};

export const FRANCHISE_DYNAMIC_CONFIG_PERMS = {
  BIZ_PERM_KEY: permKey.PAGE_FRANCHISE_CONFIG_DETAIL_COMPONENT_BIZ_PERM_KEY,
  DATA_PERM_KEY: permKey.PAGE_FRANCHISE_CONFIG_DETAIL_COMPONENT_DATA_PERM_KEY,
};
