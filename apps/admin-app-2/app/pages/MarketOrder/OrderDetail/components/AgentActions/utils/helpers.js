import {
  FRESH_PRODUCT_UNIT_CONVERT_CALCULATION_LOOKUP,
  PRODUCT_TYPES,
} from '../../../constants';

/**
 * this is similar to Number.toFixed() but does not do round off
 *
 * ex. 11.109.toFixed(2) // output(11.11)
 * ex. toFixedNoRoundOff(11.109) // output(11.10)
 * @export
 * @param {number} floatingNumber
 * @param {number} [precision=2]
 * @return {String}
 */
export function toFixedNoRoundOff(floatingNumber, precision = 2) {
  const floatRegex = new RegExp(`(\\d+\\.\\d{${precision}})(\\d)`);
  const result = floatingNumber.toString().match(floatRegex);
  return result ? result[1] : floatingNumber.toString();
}

/**
 * Left shifts the given decimal number
 * ex. leftShiftDigits(1234.44) // output: 12344.4
 * @export
 * @param {number} num1
 * @return {number}
 */
export function leftShiftDigits(num1) {
  const num2 = 10; // shift digits by 1 place
  const num1Str = `${num1}`;
  const decimalIndex = num1Str.length - num1Str.indexOf('.') - 1;
  const num1Integer = Number(num1Str.replace('.', ''));

  return (num1Integer * num2) / 10 ** decimalIndex;
}

export function calculateCountForProduct({
  type,
  count,
  weightInfo,
  unit,
  isBundle = false,
}) {
  if (type === PRODUCT_TYPES.WEIGHT) {
    const divider = FRESH_PRODUCT_UNIT_CONVERT_CALCULATION_LOOKUP[
      weightInfo?.unit
    ].find(o => o.targetUnit === unit).value;

    return count / divider;
  }
  if (isBundle) {
    return 1;
  }

  return count;
}
