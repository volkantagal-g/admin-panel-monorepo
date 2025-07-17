/* eslint-disable object-curly-newline */

import { TFunction } from 'react-i18next';
import * as Yup from 'yup';

export const validationSchema = (t: TFunction<'global | error | employeePage'>): Yup.ObjectSchema<any> => Yup.object().shape({
  workStartDate: Yup.date().required(t('error:REQUIRED')),
});
