import { isNumber } from 'lodash';

export const isFloat = x => !!(x % 1);

export const numberFormatter = num => {
  if (Math.abs(num) > 99999) return `${(Math.sign(num) * (Math.abs(num) / 1000000))?.toFixed(1)}M`;
  if (Math.abs(num) > 999) return `${(Math.sign(num) * (Math.abs(num) / 1000))?.toFixed(1)}k`;
  if (num === 'undefined' || num === 'NaN') return '';
  if (!isFloat(num)) return (Math.sign(num) * Math.abs(num))?.toFixed(2);
  return (Math.sign(num) * Math.abs(num))?.toFixed(2);
};

export const priceColor = price => (price >= 0 ? 'green' : 'red');

export const isValidate = value => value !== '' && isNumber(value);
