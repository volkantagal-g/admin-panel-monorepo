import * as Yup from 'yup';

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
  page: null,
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
          .max(100)
          .required(),
      }),
      permKey: Yup.string().required(),
      page: Yup.string().required(),
      hasGlobalAccess: Yup.boolean(),
    });
};

export const manipulateValuesAfterSubmit = (values, permKeyPrefix) => {
  const countries = values.countries.map(country => {
    return country.value;
  });
  const newValues = {
    ...values,
    permKey: permKeyPrefix + values.permKey,
    countries,
  };
  return newValues;
};
