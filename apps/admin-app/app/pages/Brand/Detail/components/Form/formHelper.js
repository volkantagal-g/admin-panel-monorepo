import { get } from 'lodash';
import * as Yup from 'yup';

export const defaultValues = { name: '' };

export const getInitialValues = brand => {
  if (!get(brand, '_id')) return defaultValues;
  const initialValues = { name: get(brand, 'name', ''), sapCode: brand?.sapCode };
  return initialValues;
};
export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.string()
        .trim()
        .min(2)
        .max(64)
        .required(),
    });
};
