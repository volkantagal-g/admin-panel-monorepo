import * as Yup from 'yup';
import { get } from 'lodash';

import { createMap } from '@shared/utils/common';
import { getLangKey } from '@shared/i18n';

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

const manipulateValuesBeforeSubmit = (values, _countries) => {
  const countriesMap = createMap(_countries);
  const newCountries = values.countries.map(countryId => {
    return {
      value: countryId,
      label: get(countriesMap, [countryId, 'name', getLangKey()], ''),
    };
  });
  const countries = _countries.length ? newCountries : [];

  return {
    ...values,
    countries,
  };
};

export const manipulateValuesAfterSubmit = values => {
  const countries = values.countries.map(country => {
    return country.value;
  });

  return {
    ...values,
    countries,
  };
};

export const getInitialValues = (page, countries) => {
  const initialValues = {
    name: {
      tr: get(page, 'name.tr', ''),
      en: get(page, 'name.en', ''),
    },
    description: {
      tr: get(page, 'description.tr', ''),
      en: get(page, 'description.en', ''),
    },
    permKey: get(page, 'permKey', ''),
    countries: get(page, 'countries', []),
    hasGlobalAccess: get(page, 'hasGlobalAccess', false),
  };
  return manipulateValuesBeforeSubmit(initialValues, countries);
};
