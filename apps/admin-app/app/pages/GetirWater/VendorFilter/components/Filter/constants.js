export const getIsOpenSelectList = t => [{
  label: t('FILTER.IS_OPEN.OPEN'),
  value: 'true',
}, {
  label: t('FILTER.IS_OPEN.CLOSE'),
  value: 'false',
}];

export const initialVendorFilter = {
  page: 0,
  count: 10,
};

export const FilterFormState = {
  FORM_VALUES_NOT_READY: 'FORM_VALUES_NOT_READY',
  FORM_VALUES_READY: 'FORM_VALUES_READY',
  FORM_VALUES_INITIALIZED: 'FORM_VALUES_INITIALIZED',
};
