import { isEmpty } from 'lodash';

import { getUser } from '@shared/redux/selectors/auth';

export const manipulateValuesAfterSubmit = ({ values, availableChangeTypes }) => {
  const newValues = { ...values };
  const user = getUser();
  if (!isEmpty(availableChangeTypes)) {
    return {
      changeTypeId: newValues.changeTypeId,
      note: newValues.note,
      updatedBy: user._id,
    };
  }
  return {
    changeTypeId: newValues.changeTypeId,
    note: newValues.note,
    createdBy: user._id,
  };
};
