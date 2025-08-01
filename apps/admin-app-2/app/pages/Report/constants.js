export const PARAMETER_TYPE = {
  date: 'Date',
  dateRange: 'DateRange',
  number: 'Number',
  string: 'String',
  boolean: 'Boolean',
  dropdown: 'Dropdown',
  promo: '[promo]',
  product: '[product]',
  country: '[country]',
  city: '[city]',
  supplier: '[supplier]',
  brand: '[brand]',
  franchise: '[franchise]',
  promoObjectiveType: '[promoObjectiveType]',
  manufacturer: '[manufacturer]',
  domainType: '[domainType]',
  warehouse: '[warehouse]',
  category: '[category]',
  subCategory: '[subCategory]',
  csvArrayOfObject: '[csvArrayOfObject]',
  s3CsvUpload: '[s3CsvUpload]',
  // not supported anymore
  store: '[store]',
};

export const DROPDOWN_OPTION_TYPE = {
  number: {
    value: 0,
    label: 'Number',
  },
  string: {
    value: 1,
    label: 'String',
  },
};

export const RESERVED_VARIABLE_NAMES = [
  'name',
  'description',
  'scriptFile',
  'isActive',
  'reportTags',
];

export const TEST_ID_FOR_REPORT_TYPE = {
  reportTagSelect: 'reportTagSelect',
  reportTypeTable: 'reportTypeTable',
};
