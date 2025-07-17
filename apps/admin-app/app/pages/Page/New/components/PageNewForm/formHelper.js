import * as Yup from 'yup';

export const PERM_KEY_PREFIX = 'PAGE_';

export const defaultValues = {
  name: {
    tr: '',
    en: '',
  },
  description: {
    tr: '',
    en: '',
  },
  permKey: '',
  countries: [],
  hasGlobalAccess: true,
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      name: Yup.object().shape({
        tr: Yup.string()
          .trim()
          .min(2)
          .max(64)
          .required(),
        en: Yup.string()
          .trim()
          .min(2)
          .max(64)
          .required(),
      }),
      description: Yup.object().shape({
        tr: Yup.string()
          .trim()
          .min(2)
          .max(1000)
          .required(),
        en: Yup.string()
          .trim()
          .min(2)
          .max(1000)
          .required(),
      }),
      permKey: Yup.string().required(),
      hasGlobalAccess: Yup.boolean(),
    });
};

export const manipulateValuesAfterSubmit = values => {
  const countries = values.countries.map(country => {
    return country.value;
  });
  const newValues = {
    ...values,
    permKey: PERM_KEY_PREFIX + values.permKey,
    countries,
  };
  return newValues;
};
