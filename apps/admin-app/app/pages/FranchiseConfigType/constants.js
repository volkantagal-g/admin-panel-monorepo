export const fieldTypes = [
  { label: 'Boolean', value: 'boolean' },
  { label: 'Date', value: 'date' },
  { label: 'Integer', value: 'integer' },
  { label: 'ObjectId', value: 'objectId' },
  { label: 'String', value: 'string' },
  { label: 'Translation', value: 'translation' },
  { label: 'Warehouse Domain', value: 'warehouseDomain' },
];

export const fieldPermissions = [
  { label: 'DATA_PERM_KEY', value: 'DATA_PERM_KEY' },
  { label: 'BIZ_PERM_KEY', value: 'BIZ_PERM_KEY' },
];

export const fieldAttributes = [
  { label: 'ATTRIBUTES.IS_REQUIRED', value: 'isRequired' },
  { label: 'ATTRIBUTES.IS_SELECTABLE', value: 'isSelectable' },
  { label: 'ATTRIBUTES.IS_SORTABLE', value: 'isSortable' },
  { label: 'ATTRIBUTES.IS_HIDDEN_FROM_LISTING', value: 'isHiddenFromListing' },
];

export const NON_EDITABLE_FIELDS = [
  'start_date',
  'end_date',
];
