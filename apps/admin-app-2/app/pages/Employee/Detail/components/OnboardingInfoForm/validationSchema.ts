import { TFunction } from 'react-i18next';
import * as Yup from 'yup';

import { EMPLOYEE_SURVEY_TURNOVER_TYPES, LEAVE_TYPES } from '@app/pages/Employee/constants';

export const validationSchema = (t: TFunction<'global | error | employeePage'>): Yup.ObjectSchema<any> => Yup.object().shape({
  workEndDate: Yup.date().required(t('error:REQUIRED')),
  surveyInfo: Yup.object().shape({
    turnoverType: Yup.number().oneOf(Object.values(EMPLOYEE_SURVEY_TURNOVER_TYPES)).required(t('error:REQUIRED')),
    leaveType: Yup.number().oneOf(Object.values(LEAVE_TYPES)).required(t('error:REQUIRED')),
  }),
  terminationBy: Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(t('error:INVALID_EMAIL')),
    id: Yup.string().required(t('error:REQUIRED')),
  }),
  status: Yup.number(),
  type: Yup.number(),
});
