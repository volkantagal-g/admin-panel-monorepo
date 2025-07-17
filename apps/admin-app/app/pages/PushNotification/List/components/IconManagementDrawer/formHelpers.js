import { GLOBAL_RULESET_STATUS } from './constants';

export const manipulateValuesBeforeSubmit = values => {
  const tempvalues = values;
  tempvalues.status = GLOBAL_RULESET_STATUS.ACTIVE;
  return tempvalues;
};

export const getInitialValues = values => values;
