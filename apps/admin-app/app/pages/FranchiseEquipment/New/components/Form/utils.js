import { removeNullOrUndefinedDeep } from '@shared/utils/common';

export const editEquipmentCreationBody = values => {
  return removeNullOrUndefinedDeep(values);
};
