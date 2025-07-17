import * as Yup from 'yup';

import { PAYMENT_METHOD_BY_COUNTRY } from '@shared/shared/constants';
import { isValidAccountNumber, isValidIBAN, isValidRoutingNumber, isValidSortCode } from '@shared/utils/validation';

export const validationSchema = ({ t }) => {
  return Yup.object().shape({
    name: Yup.string().trim().required(),
    username: Yup.string().trim().required(),
    gsm: Yup.string(),
    email: Yup.string().email(),
    safeRidingTrainingDate: Yup.date().nullable(),
    financeDeliveryTrainingDate: Yup.date().nullable(),
    bloodType: Yup.string(),
    paymentCountryCode: Yup.object()
      .shape({
        name: Yup.string().required(),
        code: Yup.number().required(),
      })
      .required(),
    iban: Yup.string().when('paymentCountryCode', ({ code }, schema) => {
      if (!PAYMENT_METHOD_BY_COUNTRY.NOT_USING_IBAN.includes(code)) {
        return schema.test(t('error:INVALID'), iban => isValidIBAN(iban));
      }
      return schema;
    }),
    accountNumber: Yup.string().when('paymentCountryCode', ({ code }, schema) => {
      if (PAYMENT_METHOD_BY_COUNTRY.USING_ACCOUNT_NUMBER.includes(code)) {
        return schema.test(t('error:INVALID'), accountNumber => isValidAccountNumber({ accountNumber, paymentCountryCode: code }));
      }
      return schema;
    }),
    routingNumber: Yup.string().when('paymentCountryCode', ({ code }, schema) => {
      if (PAYMENT_METHOD_BY_COUNTRY.USING_ROUTING_NUMBER.includes(code)) {
        return schema.test(t('error:INVALID'), routingNumber => isValidRoutingNumber(routingNumber));
      }
      return schema;
    }),
    sortCode: Yup.string().when('paymentCountryCode', ({ code }, schema) => {
      if (PAYMENT_METHOD_BY_COUNTRY.USING_SORT_CODE.includes(code)) {
        return schema.test(t('error:INVALID'), sortCode => isValidSortCode(sortCode));
      }
      return schema;
    }),
    isOutsourced: Yup.bool(),
    isGorillasEmployee: Yup.bool(),
    dateOfBirth: Yup.date().nullable(),
    drivingLicenseDate: Yup.date().nullable(),
    drivingLicenseTypes: Yup.array(),
    employmentStartDate: Yup.date().nullable(),
  });
};
