import moment from 'moment';

export enum TASK_COVERAGE_CHOOSING_COURIER_TYPES {
    WAREHOUSE_CHOOSE = 'WAREHOUSE_CHOOSE',
    BULK_PERSON_UPLOAD = 'BULK_PERSON_UPLOAD'
}

export enum TASK_TYPES {
    WITH_DEADLINE = 1,
    WITHOUT_DEADLINE = 2
}

export const GOAL_COMPARITION_OPTIONS = [
  {
    value: 'eq',
    label: '=',
  },
  {
    value: 'gt',
    label: '>',
  },
  {
    value: 'gte',
    label: '>=',
  },
  {
    value: 'lt',
    label: '<',
  },
  {
    value: 'lte',
    label: '=<',
  },
];
