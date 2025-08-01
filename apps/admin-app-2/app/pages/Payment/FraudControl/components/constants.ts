export type InitFiltersTypes = {
  enable?: boolean;
};

export const INIT_FILTERS: InitFiltersTypes = { enable: undefined };

export const RULE_OPERATOR_OPTIONS = [
  {
    label: '=',
    value: '=',
  },
  {
    label: '!=',
    value: '!=',
  },
  {
    label: '>',
    value: '>',
  },
  {
    label: '<',
    value: '<',
  },
  {
    label: '>=',
    value: '>=',
  },
  {
    label: '<=',
    value: '<=',
  },
  {
    label: 'in',
    value: 'in',
  },
  {
    label: 'not in',
    value: 'not_in',
  },
];

export const RULE_VALUE_TYPE_OPTIONS = [
  {
    label: 'STRING',
    value: 'STRING',
  },
  {
    label: 'NUMBER',
    value: 'NUMBER',
  },
  {
    label: 'BOOLEAN',
    value: 'BOOLEAN',
  },
  {
    label: 'LIST',
    value: 'LIST',
  },
];

export const INIT_RULE_MODAL_DATA = {
  isModalOpen: false,
  ruleId: null,
  name: null,
};

export const INIT_CREATE_RULE_FORM_VALUES = [
  { name: 'name', value: '' },
  { name: 'eventKeyField', value: '' },
  { name: 'ruleValue', value: '' },
  { name: 'score', value: 0 },
  { name: 'enable', value: false },
  { name: 'blockEvent', value: false },
  { name: 'ruleValueType', value: '' },
  { name: 'force3dEvent', value: false },
  {
    name: 'useRequestEventKeyFieldValue',
    value: false,
  },
  { name: 'whiteEvent', value: false },
  { name: 'eventType', value: '' },
  { name: 'ruleOperator', value: '' },
];
