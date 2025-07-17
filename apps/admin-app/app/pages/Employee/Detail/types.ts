import { IEmployee } from '../types';

export type ActionButtonPropTypes = {
  isFormEditable: boolean,
  isPending: boolean,
  isSaveDisabled?: boolean,
  onCancel: () => void,
  onEdit: () => void,
  onSave: () => void,
  editBtnText?: string
}

export interface IPersonalInfoFormValues {
  name: IEmployee['name'];
  surname: IEmployee['surname'];
  uniqueIdentifier: IEmployee['uniqueIdentifier'];
  picURL: IEmployee['picURL'];
  birthdate: IEmployee['birthdate'];
  gender: IEmployee['gender'];
  nationality: IEmployee['nationality'];
}
