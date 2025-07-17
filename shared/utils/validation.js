import { isValidPhoneNumber } from 'libphonenumber-js';

import { checkIBANDigits } from '@shared/utils/common';
import { IBAN_COUNTRY_CODE_LENGTHS, PAYMENT_METHOD_BY_COUNTRY } from '@shared/shared/constants';
import { REGEX } from '@shared/shared/regex';

export const isValidJson = str => {
  try {
    JSON.parse(str);
    return true;
  }
  catch (e) {
    return false;
  }
};

export const isValidIBAN = input => {
  const iban = String(input).toUpperCase().replace(/[^A-Z0-9]/g, '');
  const code = iban.match(/^([A-Z]{2})(\d{2})([A-Z\d]+)$/);
  if (!code || iban.length !== IBAN_COUNTRY_CODE_LENGTHS[code[1]]) {
    return false;
  }
  const digits = (code[3] + code[1] + code[2]).replace(/[A-Z]/g, letter => (letter.charCodeAt(0) - 55));
  return checkIBANDigits(digits) === 1;
};

export const isValidTcNo = tc => {
  if (tc?.length !== 11 || tc % 2 !== 0) {
    return false;
  }

  const [num1, num2, num3, num4, num5, num6, num7, num8, num9, num10, num11] = [...tc].map(num => parseInt(num, 10));

  if (!num1) return false;

  const sumOfOddNumbers = num1 + num3 + num5 + num7 + num9;
  const sumOfEvenNumbers = num2 + num4 + num6 + num8;

  const conditionForNum10 = (sumOfOddNumbers * 7 + sumOfEvenNumbers * 9) % 10 === num10;
  const conditionForNum11 = (sumOfOddNumbers * 8) % 10 === num11;

  return conditionForNum10 && conditionForNum11;
};

export const isValidGSMGlobal = gsm => isValidPhoneNumber(`+${gsm}`);

export const isValidAccountNumber = ({ accountNumber, paymentCountryCode }) => {
  if (PAYMENT_METHOD_BY_COUNTRY.USING_ACCOUNT_NUMBER.includes(paymentCountryCode)) {
    return accountNumber && accountNumber.match(REGEX.ACCOUNT_NUMBER[paymentCountryCode]);
  }
  return false;
};

export const isValidRoutingNumber = routingNumber => routingNumber && routingNumber.match(REGEX.ROUTING_NUMBER);

export const isValidSortCode = sortCode => sortCode && sortCode.match(REGEX.SORT_CODE);

export const isValidEmail = email => {
  const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
};
