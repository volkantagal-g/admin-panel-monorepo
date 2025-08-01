import { TFunction } from 'react-i18next';
import * as Yup from 'yup';

import {
  CONTRACT_TYPES,
  EMPLOYMENT_TYPES,
} from '@app/pages/Employee/constants';

export const validationSchema = (t: TFunction<'global | error | employeePage'>): Yup.ObjectSchema<any> => Yup.object().shape({
  workStartDate: Yup.date().required(t('error:REQUIRED')),
  seniorityStartDate: Yup.date().nullable(),
  annualLeaveCalculationStartDate: Yup.date().nullable(),
  mainWorkLocation: Yup.object({
    value: Yup.string().trim().required(t('error:REQUIRED')),
    label: Yup.string().trim().required(t('error:REQUIRED')),
  }).required(t('error:REQUIRED')),
  employmentType: Yup.number().oneOf(Object.values(EMPLOYMENT_TYPES)).required(t('error:REQUIRED')),
  contractType: Yup.number().oneOf(Object.values(CONTRACT_TYPES)).required(t('error:REQUIRED')),
  workEndDate: Yup.date().nullable(),
  isTerminationCancelled: Yup.boolean(),
  sgkCity: Yup.string().trim().required(t('error:REQUIRED')),
});
