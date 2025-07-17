import * as Yup from 'yup';

import { DEFAULT_MAP_OPTIONS, DEFAULT_MAP_COORDINATES, PAYMENT_METHOD_BY_COUNTRY } from '@shared/shared/constants';
import { isValidIBAN, isValidAccountNumber, isValidRoutingNumber, isValidSortCode, isValidGSMGlobal } from '@shared/utils/validation';
import { isValidClientGSM } from '../utils';

export const defaultPaymentValues = {
  iban: '',
  accountNumber: '',
  routingNumber: '',
  sortCode: '',
};

export const defaultValues = {
  name: '',
  username: '',
  uniqueIdentifier: '',
  country: '',
  countryCode: undefined,
  countryGsmCode: undefined,
  personalGsm: '',
  isOutsourced: false,
  shouldAddEmployeeDiscount: false,
  email: '',
  paymentCountryCode: { code: undefined },
  ...defaultPaymentValues,
  relative: {
    name: '',
    countryGsmCode: undefined,
    gsm: '',
    relation: undefined,
  },
  homeAddress: {
    location: {
      type: 'Point',
      coordinates: DEFAULT_MAP_COORDINATES,
    },
    description: '',
    mapOptions: {
      center: DEFAULT_MAP_OPTIONS.CENTER,
      zoom: DEFAULT_MAP_OPTIONS.ZOOM_LEVEL,
    },
  },
  createCourier: false,
};

export const relativeInformationValidationSchema = t => {
  return Yup.object().shape({
    name: Yup.string().trim(),
    countryGsmCode: Yup.string().nullable().trim(),
    gsm: Yup.string()
      .trim()
      .when('countryGsmCode', (code, schema) => {
        if (code) {
          return schema.test('check valid gsm', t('error:VALID_PHONE'), value => isValidGSMGlobal(`${code}${value}`));
        }
        return schema;
      }),
    relation: Yup.number().nullable(),
  });
};

export const homeAddressValidationSchema = () => {
  return Yup.object().shape({
    location: Yup.object().shape({
      type: Yup.string(),
      coordinates: Yup.array().of(Yup.number().required()),
    }),
    description: Yup.string().required(),
  });
};

export const validationSchema = t => {
  return Yup.object().shape({
    name: Yup.string().trim().min(2).max(64)
      .required(),
    username: Yup.string().trim().min(2).max(64)
      .required(),
    uniqueIdentifier: Yup.string().trim(),
    country: Yup.string().trim().required(),
    countryCode: Yup.string().trim().required(),
    countryGsmCode: Yup.string().trim().required(),
    shouldAddEmployeeDiscount: Yup.bool(),
    isOutsourced: Yup.bool(),
    personalGsm: Yup.string()
      .trim()
      .required()
      .when('countryGsmCode', (dialingCode, schema) => {
        if (dialingCode) {
          return schema.test('check valid gsm', t('error:VALID_PHONE'), gsm => isValidClientGSM(gsm, dialingCode));
        }
        return schema;
      }),
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
    email: Yup.string().email(t('error:VALID_EMAIL')).required(),
    paymentCountryCode: Yup.object().shape({ code: Yup.number().required(), name: Yup.object().required() }),
    relative: relativeInformationValidationSchema(t),
    homeAddress: homeAddressValidationSchema(),
    createCourier: Yup.bool(),
  });
};
