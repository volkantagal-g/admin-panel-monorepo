import { TFunction } from 'react-i18next';
import * as Yup from 'yup';

export const validationSchema = (
  t: TFunction<'assetManagement | global | error'>,
): Yup.ObjectSchema<any> => {
  const baseSchema = {
    assignmentReturnDate: Yup.date().required(t('error:REQUIRED')),
    assignableStatus: Yup.string().required(t('error:REQUIRED')),
    assignableStatusReason: Yup.string().required(t('error:REQUIRED')),
    note: Yup.string(),
  };

  return Yup.object().shape(baseSchema);
};
