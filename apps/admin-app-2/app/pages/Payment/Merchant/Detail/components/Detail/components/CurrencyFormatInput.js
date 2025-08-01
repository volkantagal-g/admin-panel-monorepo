/*

 SOURCE: https://ant.design/components/input-number#components-input-number-demo-formatter
         https://codesandbox.io/s/currency-wrapper-antd-input-3ynzo

 */

import { InputNumber } from 'antd';

import { getLangKey } from '@shared/i18n';

const locale = getLangKey();

const currencyFormatter = selectedCurrOpt => value => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: selectedCurrOpt,
  }).format(value);
};

const currencyParser = val => {
  let inputValue = val;
  try {
    // for when the input gets clears
    if (typeof inputValue === 'string' && !inputValue.length) {
      inputValue = '0.0';
    }

    // detecting and parsing between comma and dot
    const group = new Intl.NumberFormat(locale).format(1111).replace(/1/g, '');
    const decimal = new Intl.NumberFormat(locale).format(1.1).replace(/1/g, '');
    let reversedVal = inputValue.replace(new RegExp(`\\${group}`, 'g'), '');
    reversedVal = reversedVal.replace(new RegExp(`\\${decimal}`, 'g'), '.');
    //  => 1232.21 €

    // removing everything except the digits and dot
    reversedVal = reversedVal.replace(/[^0-9.]/g, '');
    //  => 1232.21

    // appending digits properly
    const digitsAfterDecimalCount = (reversedVal.split('.')[1] || []).length;
    const needsDigitsAppended = digitsAfterDecimalCount > 2;

    if (needsDigitsAppended) {
      reversedVal *= 10 ** (digitsAfterDecimalCount - 2);
    }

    return Number.isNaN(reversedVal) ? 0 : reversedVal;
  }
  catch (error) {
    return error;
  }
};

const CurrencyFormatInput = ({ currency, ...props }) => {
  return (
    <InputNumber
      formatter={currencyFormatter(currency)}
      parser={currencyParser}
      {...props}
    />
  );
};

export default CurrencyFormatInput;
