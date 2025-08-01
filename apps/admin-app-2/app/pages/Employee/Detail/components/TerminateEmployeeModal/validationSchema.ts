import { TFunction } from 'react-i18next';
import * as Yup from 'yup';
import moment from 'moment';

import { END_OF_EMPLOYMENT_LEAVE_REASONS } from '@app/pages/Employee/constants';

export const validationSchema = (t: TFunction<'global | error | employeePage'>): Yup.ObjectSchema<any> => Yup.object().shape({
  workEndDate: Yup.date().required(t('error:REQUIRED')),
  shouldImmediatelyTerminate: Yup.boolean().when('workEndDate', {
    is: (workEndDate: string) => moment().isSame(workEndDate, 'day'),
    then: Yup.boolean().required(t('error:REQUIRED')),
  }),
});
