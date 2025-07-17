import * as Yup from 'yup';

import { t } from '@shared/i18n';

export const getPart1ValidationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().trim().required(t('error:REQUIRED')),
    country: Yup.string().trim().required(t('error:REQUIRED')),
    activeDomains: Yup.array(Yup.number()).min(1, t('error:REQUIRED')).required(t('error:REQUIRED')),
  });
};

export const getGeoJSONValidationSchema = () => {
  return Yup.object().shape({
    geoJSON: Yup.string()
      .required(t('error:REQUIRED'))
      .test('check valid json', t('error:INVALID_JSON'), value => {
        let valid = true;
        try {
          JSON.parse(value);
        }
        catch (error) {
          valid = false;
          console.error(error);
        }
        return valid;
      }),
  });
};

export const getCombinedValidationSchema = () => {
  const part1Validation = getPart1ValidationSchema();
  const geoValidation = getGeoJSONValidationSchema();
  return part1Validation.concat(geoValidation);
};
