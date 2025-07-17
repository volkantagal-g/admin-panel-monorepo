import * as Yup from 'yup';
import _get from 'lodash/get';

export const defaultValues = { dcBonus: 0 };

export const validationSchema = () => {
  return Yup.object()
    .shape({ dcBonus: Yup.number() });
};

export const getInitialValues = supplierAccount => {
  if (!_get(supplierAccount, '_id')) {
    return defaultValues;
  }

  return { dcBonus: _get(supplierAccount, 'dcBonus', 0) };
};
