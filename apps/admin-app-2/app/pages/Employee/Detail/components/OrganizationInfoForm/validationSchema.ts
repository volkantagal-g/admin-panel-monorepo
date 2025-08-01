import { TFunction } from 'react-i18next';
import * as Yup from 'yup';

import { POSITION_LEVELS } from '@app/pages/Employee/constants';

export const validationSchema = (t: TFunction<'global | error | employeePage'>): Yup.ObjectSchema<any> => Yup.object().shape({
  businessUnit: Yup.object({
    value: Yup.string().trim().required(t('error:REQUIRED')),
    label: Yup.string().trim(),
  }),
  department: Yup.string().trim().required(t('error:REQUIRED')),
  subDepartments: Yup.object().shape({ firstLevelSub: Yup.string().trim().required(t('error:REQUIRED')) }).required(),
  positionLevel: Yup.number().oneOf(Object.values(POSITION_LEVELS)).required(t('error:REQUIRED')),
  jobTitle: Yup.string().trim().required(t('error:REQUIRED')),
  lineManager: Yup.object({
    value: Yup.string().trim().required(t('error:REQUIRED')),
    label: Yup.string().trim(),
  }),
  secondManager: Yup.object({
    value: Yup.string().trim(),
    label: Yup.string().trim(),
  }),
  matrixManager: Yup.object({
    value: Yup.string().trim(),
    label: Yup.string().trim(),
  }),
  businessCountryCodes: Yup.array().of(Yup.string().trim().required('error:REQUIRED')).required(t('error:REQUIRED')),
  company: Yup.object({
    value: Yup.string().trim().required(t('error:REQUIRED')),
    label: Yup.string().trim(),
  }),
  businessPartner: Yup.object({
    value: Yup.string().trim(),
    label: Yup.string().trim(),
  }),
});
