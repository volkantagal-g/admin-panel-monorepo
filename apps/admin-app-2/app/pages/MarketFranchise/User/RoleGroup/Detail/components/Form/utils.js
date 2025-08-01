import { getDiffObj } from '@shared/utils/common';

export const getUpdateOptions = (roleGroupDetails, originalDetails) => {
  const { ...fieldParameters } = roleGroupDetails;
  delete fieldParameters.isActive;
  delete fieldParameters._id;

  const { newValues, unsetValues } = getDiffObj(fieldParameters, originalDetails);
  const objectDiffs = { ...newValues, ...unsetValues };
  ['name', 'description', 'reports', 'roles'].forEach(key => {
    if (!Object.keys(objectDiffs).includes(key)) {
      delete fieldParameters[key];
    }
  });

  return fieldParameters;
};
