import * as Yup from 'yup';

import { YupMultiLanguage } from '@shared/yup/commonSchemas';

export function validationSchema() {
  return Yup.object().shape({
    name: Yup.string().trim().required(),
    type: Yup.number().required(),
    description: YupMultiLanguage.string({ isRequired: true }),
    interval: Yup.number().min(0).required(),
    intervalType: Yup.number().required(),
    clientList: Yup.string().required(),
  });
}

export function manipulateValuesBeforeSubmit(values) {
  const newValues = { ...values };
  return newValues;
}

export function getInitialValues() {
  const initialValues = {
    name: '',
    type: 1,
    description: {},
    interval: 1,
    intervalType: 3,
    clientList: null,
  };
  return manipulateValuesBeforeSubmit(initialValues);
}
