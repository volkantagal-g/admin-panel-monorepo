import { TFunction } from 'react-i18next';
import * as Yup from 'yup';

import { ASSIGNMENT_PERIOD_TYPES } from '@app/pages/Employee/AssetManagement/constants';

export const validationSchema = (
  t: TFunction<'assetManagement | global | error'>,
  shouldAskAssignmentPeriodType: boolean,
): Yup.ObjectSchema<any> => {
  const baseSchema = {
    employeeId: Yup.string().required(t('error:REQUIRED')),
    assignmentStartDate: Yup.date().required(t('error:REQUIRED')),
    note: Yup.string().nullable(),
  };

  if (shouldAskAssignmentPeriodType) {
    return Yup.object().shape({
      ...baseSchema,
      assignmentPeriodType: Yup.string()
        .required(t('error:REQUIRED')),
      assignmentEndDate: Yup.date()
        .when('assignmentPeriodType', {
          is: ASSIGNMENT_PERIOD_TYPES.DEFINITE_TERM,
          then: Yup.date()
            .required(t('error:REQUIRED'))
            .min(Yup.ref('assignmentStartDate'), t('assetManagement:END_DATE_AFTER_START_DATE')),
        }),
    });
  }

  return Yup.object().shape(baseSchema);
};
