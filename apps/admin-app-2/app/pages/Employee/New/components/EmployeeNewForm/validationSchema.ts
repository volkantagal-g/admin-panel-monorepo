import { TFunction } from 'react-i18next';
import * as Yup from 'yup';
import { isEmpty as _isEmpty } from 'lodash';
import moment from 'moment';

import {
  EMERGENCY_CONTACT_RELATIONSHIPS,
  GENDERS,
  EMPLOYMENT_TYPES,
  CONTRACT_TYPES,
  POSITION_LEVELS,
  TURKEY_DIALING_CODE,
  TURKEY_MAX_ALLOWED_PHONE_NUMBER_LENGTH,
  ACCEPTABLE_WORK_EMAIL_DOMAINS,
  PAYROLL_STATUSES,
} from '@app/pages/Employee/constants';
import { REGEX } from '@shared/shared/regex';
import { FormValues } from '../../types';

export const validationSchema = (t: TFunction<'global | error | employeePage'>): Yup.ObjectSchema<FormValues | undefined> => Yup.object().shape({
  name: Yup.string().trim().required(t('error:REQUIRED')),
  surname: Yup.string().trim().required(t('error:REQUIRED')),
  uniqueIdentifier: Yup.string().trim().required(t('error:REQUIRED')),
  // .add() for midnight works
  birthdate: Yup.date().max(moment().add(1, 'day').endOf('day').toDate()).required(t('error:REQUIRED')),
  nationality: Yup.string().trim().required(t('error:REQUIRED')),
  gender: Yup.number().oneOf(Object.values(GENDERS)).required(t('error:REQUIRED')),
  personalEmail: Yup
    .string()
    .email(t('error:VALID_EMAIL'))
    .test('is-valid-email-custom', t('error:VALID_EMAIL'), (value: string | undefined): boolean => {
      if (value) {
        return REGEX.PERSONAL_EMAIL.test(value);
      }
      return false;
    })
    .required(t('error:REQUIRED')),
  personalGSMNumber: Yup.string().trim()
    .when('workGSMNumber', (workGSM, schema) => {
      if (!workGSM || _isEmpty(workGSM.toString())) {
        return schema.required(t('employeePage:PERSONAL_OR_WORK_PHONE_NUMBER_REQUIRED'));
      }
      return schema.optional();
    })
    .when('personalGSMDialCode', (personalGSMDialCode, schema) => {
      if (personalGSMDialCode === TURKEY_DIALING_CODE) {
        return schema.length(TURKEY_MAX_ALLOWED_PHONE_NUMBER_LENGTH, t('employeePage:PHONE_NUMBER_LENGTH_LIMIT'));
      }
      return schema;
    }),
  personalGSMDialCode: Yup.string().trim().when('personalGSMNumber', (personalGSM, schema) => {
    if (personalGSM && !_isEmpty(personalGSM.toString())) {
      return schema.required(`${t('employeePage:PERSONAL_GSM_DIALING_CODE')} ${t('error:REQUIRED').toLowerCase()}`);
    }
    return schema.optional();
  }),
  residentialAddress: Yup.object({
    address: Yup.string().trim().required(t('error:REQUIRED')),
    city: Yup.string().trim().required(t('error:REQUIRED')),
    country: Yup.string().trim().required(t('error:REQUIRED')),
    district: Yup.string().trim().required(t('error:REQUIRED')),
  }).required(t('error:REQUIRED')),
  sgkCity: Yup.string().trim().required(t('error:REQUIRED')),
  emergencyContact: Yup.object({
    relationsType: Yup.number().oneOf(Object.values(EMERGENCY_CONTACT_RELATIONSHIPS)).required(t('error:REQUIRED')),
    name: Yup.string().trim().required(t('error:REQUIRED')),
    gsm: Yup.string().trim().required(t('error:REQUIRED')),
    dialCode: Yup.string().trim().when(['emergencyContact', 'gsm'], {
      is: val => (val && !_isEmpty(val)),
      then: (schema: Yup.ObjectSchema) => schema.required(t('error:REQUIRED')),
      otherwise: (schema: Yup.ObjectSchema) => schema,
    }),
  }).required(t('error:REQUIRED')),
  employmentType: Yup.number().oneOf(Object.values(EMPLOYMENT_TYPES)).required(t('error:REQUIRED')),
  contractType: Yup.number().oneOf(Object.values(CONTRACT_TYPES)).required(t('error:REQUIRED')),
  businessUnit: Yup.string().trim().required(t('error:REQUIRED')),
  department: Yup.string().trim().required(t('error:REQUIRED')),
  subDepartments: Yup.object().shape({ firstLevelSub: Yup.string().trim().required(t('error:REQUIRED')) }).required(),
  jobTitle: Yup.string().trim().required(t('error:REQUIRED')),
  positionLevel: Yup.number().oneOf(Object.values(POSITION_LEVELS)).required(t('error:REQUIRED')),
  lineManager: Yup.string().trim().required(t('error:REQUIRED')),
  matrixManager: Yup.string(),
  businessPartner: Yup.string(),
  mainWorkLocation: Yup.string().trim().required(t('error:REQUIRED')),
  officeAccessCardId: Yup.string().trim(),
  workStartDate: Yup.date().required(t('error:REQUIRED')),
  seniorityStartDate: Yup.date().nullable(),
  // .add() for midnight works
  annualLeaveCalculationStartDate: Yup.date().nullable(),
  payrollCountryCode: Yup.string().trim().required(t('error:REQUIRED')),
  payrollStatus: Yup.number().oneOf(Object.values(PAYROLL_STATUSES)).required(t('error:REQUIRED')),
  isInternationalBusinessEmployee: Yup.boolean(),
  workEmail: Yup
    .string()
    .email(t('error:VALID_EMAIL'))
    .test('is-valid-email-custom', t('error:VALID_EMAIL'), (value: string | undefined): boolean => {
      if (value) {
        return REGEX.EMAIL.test(value);
      }
      return false;
    })
    .test('is-getir-email', t('employeePage:ERROR.DOMAIN_NOT_ALLOWED'), (value: string | undefined): boolean => {
      if (value) {
        const [, domain] = value.trim().split('@');
        return (domain?.endsWith('.getir.com') || ACCEPTABLE_WORK_EMAIL_DOMAINS?.some((d: string) => value.endsWith(`@${d}`)));
      }
      return false;
    })
    .required(t('error:REQUIRED')),
  workGSMNumber: Yup.string().trim()
    .when('personalGSMNumber', (personalGSM, schema) => {
      if (!personalGSM || _isEmpty(personalGSM.toString())) {
        return schema.required(t('employeePage:PERSONAL_OR_WORK_PHONE_NUMBER_REQUIRED'));
      }
      return schema.optional();
    })
    .when('workGSMDialCode', (workGSMDialCode, schema) => {
      if (workGSMDialCode === TURKEY_DIALING_CODE) {
        return schema.length(TURKEY_MAX_ALLOWED_PHONE_NUMBER_LENGTH, t('employeePage:PHONE_NUMBER_LENGTH_LIMIT'));
      }
      return schema;
    }),
  workGSMDialCode: Yup.string().trim().when('workGSMNumber', (workGSM, schema) => {
    if (workGSM && !_isEmpty(workGSM?.toString())) {
      return schema.required(`${t('employeePage:PERSONAL_GSM_DIALING_CODE')} ${t('error:REQUIRED').toLowerCase()}`);
    }
    return schema.optional();
  }),
  company: Yup.string().required(t('error:REQUIRED')),
  businessCountryCodes: Yup.array().of(Yup.string().trim().required('error:REQUIRED')).min(1).required(t('error:REQUIRED')),
}, [
  ['personalGSMNumber', 'workGSMNumber'],
  ['personalGSMNumber', 'personalGSMDialCode'],
  ['workGSMNumber', 'workGSMDialCode'],
]);
