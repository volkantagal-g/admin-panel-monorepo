import { TFunction } from 'react-i18next';
import * as Yup from 'yup';
import { isEmpty as _isEmpty } from 'lodash';

import { REGEX } from '@shared/shared/regex';
import {
  EMERGENCY_CONTACT_RELATIONSHIPS,
  TURKEY_DIALING_CODE,
  TURKEY_MAX_ALLOWED_PHONE_NUMBER_LENGTH,
} from '@app/pages/Employee/constants';

export const validationSchema = (
  t: TFunction<'global | error | employeePage'>,
  { isPersonalGSMRequired = false },
): Yup.ObjectSchema<any> => {
  const personalGSMNumber = Yup.string().trim().when('personalGSMDialCode', (personalGSMDialCode, schema) => {
    if (isPersonalGSMRequired) {
      if (personalGSMDialCode === TURKEY_DIALING_CODE) {
        return schema
          .required(t('employeePage:PERSONAL_OR_WORK_PHONE_NUMBER_REQUIRED'))
          .length(TURKEY_MAX_ALLOWED_PHONE_NUMBER_LENGTH, t('employeePage:PHONE_NUMBER_LENGTH_LIMIT'));
      }

      return schema.required(t('employeePage:PERSONAL_OR_WORK_PHONE_NUMBER_REQUIRED'));
    }

    if (personalGSMDialCode === TURKEY_DIALING_CODE) {
      return schema.length(TURKEY_MAX_ALLOWED_PHONE_NUMBER_LENGTH, t('employeePage:PHONE_NUMBER_LENGTH_LIMIT'));
    }

    return schema;
  });

  return Yup.object().shape({
    residentialAddress: Yup.object({
      address: Yup.string().trim().required(t('error:REQUIRED')),
      city: Yup.string().trim().required(t('error:REQUIRED')),
      country: Yup.string().trim().required(t('error:REQUIRED')),
      district: Yup.string().trim().required(t('error:REQUIRED')),
    }).required(t('error:REQUIRED')),
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
    personalGSMNumber,
    personalGSMDialCode: Yup.string().trim().when('personalGSMNumber', (personalGSM, schema) => {
      if (personalGSM && !_isEmpty(personalGSM.toString())) {
        return schema.required(`${t('employeePage:PERSONAL_GSM_DIALING_CODE')} ${t('error:REQUIRED').toLowerCase()}`);
      }
      return schema.optional();
    }),
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
  }, [['personalGSMNumber', 'personalGSMDialCode']]);
};
