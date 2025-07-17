import { TFunction } from 'react-i18next';
import { isEmpty as _isEmpty } from 'lodash';
import * as Yup from 'yup';

import { REGEX } from '@shared/shared/regex';
import {
  TURKEY_DIALING_CODE,
  TURKEY_MAX_ALLOWED_PHONE_NUMBER_LENGTH,
  ACCEPTABLE_WORK_EMAIL_DOMAINS,
  PAYROLL_STATUSES,
} from '@app/pages/Employee/constants';

export const validationSchema = (
  t: TFunction<'global | error | employeePage'>,
  { isWorkGSMRequired = false }: { isWorkGSMRequired?: boolean },
): Yup.ObjectSchema<any> => {
  const workGSMNumber = Yup.string().trim().when('workGSMDialCode', (workGSMDialCode, schema) => {
    if (isWorkGSMRequired) {
      if (workGSMDialCode === TURKEY_DIALING_CODE) {
        return schema
          .required(t('employeePage:PERSONAL_OR_WORK_PHONE_NUMBER_REQUIRED'))
          .length(TURKEY_MAX_ALLOWED_PHONE_NUMBER_LENGTH, t('employeePage:PHONE_NUMBER_LENGTH_LIMIT'));
      }

      return schema.required(t('employeePage:PERSONAL_OR_WORK_PHONE_NUMBER_REQUIRED'));
    }

    if (workGSMDialCode === TURKEY_DIALING_CODE) {
      return schema.length(TURKEY_MAX_ALLOWED_PHONE_NUMBER_LENGTH, t('employeePage:PHONE_NUMBER_LENGTH_LIMIT'));
    }

    return schema;
  });

  return Yup.object().shape({
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
    workGSMNumber,
    workGSMDialCode: Yup.string().trim().when('workGSMNumber', (workGSM, schema) => {
      if (workGSM && !_isEmpty(workGSM?.toString())) {
        return schema.required(`${t('employeePage:PERSONAL_GSM_DIALING_CODE')} ${t('error:REQUIRED').toLowerCase()}`);
      }
      return schema.optional();
    }),
    payrollCountryCode: Yup.string().trim().required(t('error:REQUIRED')),
    payrollStatus: Yup.number().oneOf(Object.values(PAYROLL_STATUSES)).required(t('error:REQUIRED')),
    officeAccessCardId: Yup.string().trim(),
  }, [['workGSMNumber', 'workGSMDialCode']]);
};
