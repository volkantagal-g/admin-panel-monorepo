import { TFunction } from 'react-i18next';
import * as Yup from 'yup';
import moment from 'moment';

import { GENDERS } from '@app/pages/Employee/constants';

export const validationSchema = (t: TFunction<'global | error | employeePage'>): Yup.ObjectSchema<any> => Yup.object().shape({
  name: Yup.string().trim().required(t('error:REQUIRED')),
  surname: Yup.string().trim().required(t('error:REQUIRED')),
  uniqueIdentifier: Yup.string().trim().required(t('error:REQUIRED')),
  birthdate: Yup.date().max(moment().add(1, 'day').endOf('day').toDate()).required(t('error:REQUIRED')),
  nationality: Yup.string().trim().required(t('error:REQUIRED')),
  gender: Yup.number().oneOf(Object.values(GENDERS)).required(t('error:REQUIRED')),
});
