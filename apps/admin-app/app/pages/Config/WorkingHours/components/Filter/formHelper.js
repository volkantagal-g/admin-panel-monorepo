import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { CITY_BASE_WORKING_HOURS, REGION_BASE_WORKING_HOURS } from '@shared/shared/constants';

export const defaultValues = {
  workingHoursType: undefined,
  countryId: '',
  cityId: '',
  regionId: '',
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      workingHoursType: Yup.number(),
      countryId: Yup.string()
        .required(t('error:REQUIRED')),
      cityId: Yup.string()
        .when('workingHoursType', (workingHoursType, schema) => {
          if (workingHoursType !== CITY_BASE_WORKING_HOURS && workingHoursType !== REGION_BASE_WORKING_HOURS) {
            return schema;
          }
          return schema.required(t('error:REQUIRED'));
        }),
      regionId: Yup.string()
        .when('workingHoursType', (workingHoursType, schema) => {
          if (workingHoursType !== REGION_BASE_WORKING_HOURS) {
            return schema;
          }
          return schema.required(t('error:REQUIRED'));
        }),
    });
};
