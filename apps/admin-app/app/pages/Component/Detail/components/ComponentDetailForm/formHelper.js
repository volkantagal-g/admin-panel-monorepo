import * as Yup from 'yup';
import _ from 'lodash';

import { getLangKey } from '@shared/i18n';
import { createMap } from '@shared/utils/common';

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
      page: Yup.string().required(),
      hasGlobalAccess: Yup.boolean(),
    });
};

const manipulateValuesBeforeSubmit = (values, _countries = []) => {
  const countriesMap = createMap(_countries);
  const newCountries = values.countries.map(countryId => {
    return {
      value: countryId,
      label: _.get(countriesMap, [countryId, 'name', getLangKey()], ''),
    };
  });
  const countries = _countries.length ? newCountries : [];
  const newValues = {
    ...values,
    countries,
  };
  return newValues;
};

export const manipulateValuesAfterSubmit = values => {
  const countries = values.countries.map(country => {
    return country.value;
  });
  const newValues = {
    ...values,
    countries,
  };
  return newValues;
};

export const getInitialValues = (component, countries) => {
  const initialValues = {
    name: {
      tr: _.get(component, 'name.tr', ''),
      en: _.get(component, 'name.en', ''),
    },
    description: {
      tr: _.get(component, 'description.tr', ''),
      en: _.get(component, 'description.en', ''),
    },
    permKey: _.get(component, 'permKey', ''),
    page: _.get(component, 'page._id'),
    countries: _.get(component, 'countries', []),
    hasGlobalAccess: _.get(component, 'hasGlobalAccess', false),
  };
  return manipulateValuesBeforeSubmit(initialValues, countries);
};
