import { TFunction } from 'react-i18next';
import moment from 'moment';
import * as Yup from 'yup';

import {
  EDUCATION_LEVELS,
  EDUCATION_STATUSES,
} from '@app/pages/Employee/constants';

export const validationSchema = (t: TFunction<'global | error | employeePage'>): Yup.ObjectSchema<any> => Yup.object().shape({
  level: Yup.number().oneOf(Object.values(EDUCATION_LEVELS)).required(t('error:REQUIRED')),
  status: Yup.number().oneOf(Object.values(EDUCATION_STATUSES)).required(t('error:REQUIRED')),
  institute: Yup.string().trim().required(t('error:REQUIRED')),
  graduationYear: Yup.date().required(t('error:REQUIRED')).when('status', {
    is: EDUCATION_STATUSES.ONGOING,
    then: Yup.date().min(moment().startOf('year').startOf('day').toDate(), t('employeePage:ERROR_EDUCATION_YEAR_AND_STATUS_MISMATCH')),
  }),
  academicProgram: Yup.string().trim().when('level', {
    is: value => value > EDUCATION_LEVELS.HIGH_SCHOOL,
    then: (schema: any) => schema.required(t('error:REQUIRED')),
  }),
});
