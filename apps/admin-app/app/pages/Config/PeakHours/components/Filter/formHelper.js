import * as Yup from 'yup';

import { t } from '@shared/i18n';
import { CITY_BASE_PEAK_HOURS, REGION_BASE_PEAK_HOURS } from '@shared/shared/constants';

export const defaultValues = {
  workingHoursType: undefined,
  cityId: '',
  regionId: '',
};

export const validationSchema = () => {
  return Yup.object()
    .shape({
      workingHoursType: Yup.number(),
      cityId: Yup.string()
        .when('peakHoursType', (peakHoursType, schema) => {
          if (peakHoursType !== CITY_BASE_PEAK_HOURS && peakHoursType !== REGION_BASE_PEAK_HOURS) {
            return schema;
          }
          return schema.required(t('error:REQUIRED'));
        }),
      regionId: Yup.string()
        .when('peakHoursType', (peakHoursType, schema) => {
          if (peakHoursType !== REGION_BASE_PEAK_HOURS) {
            return schema;
          }
          return schema.required(t('error:REQUIRED'));
        }),
    });
};
