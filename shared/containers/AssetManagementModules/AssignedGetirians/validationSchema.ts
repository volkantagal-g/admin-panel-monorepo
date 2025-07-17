import { TFunction } from 'react-i18next';
import * as Yup from 'yup';

import { ASSIGNMENT_PERIOD_TYPES } from '@app/pages/Employee/AssetManagement/constants';

export const validationSchema = (t: TFunction<'global | error '>): Yup.ObjectSchema<any> => Yup.object().shape({
  assignmentPeriodType: Yup.string().required(t('error:REQUIRED')),
  assignDate: Yup.date().required(t('error:REQUIRED')),
  estimatedReturnDate: Yup.date()
    .when('assignmentPeriodType', {
      is: ASSIGNMENT_PERIOD_TYPES.DEFINITE_TERM,
      then: Yup.date()
        .required(t('error:REQUIRED'))
        .min(Yup.ref('assignDate'), t('assetManagement:ESTIMATED_RETURN_DATE_AFTER_START_DATE')),
    }),
});
