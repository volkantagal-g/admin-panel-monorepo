import { getLangKey } from '@shared/i18n';
import { MAX_MINUTE_FOR_TIME_PERIOD } from '@app/pages/BusinessAlertingTool/constants';

/**
 * Creates an object with keys corresponding to letters starting from 'A' and values matched with the array items.
 *
 * @param {string[]} arr - The array of strings to be used as values for the object.
 * @returns {Object} - The object with dynamically created keys and matched values.
 */
export function createObjectWithKeysFromArray(arr: string[]): { [key: string]: string } {
  const obj: { [key: string]: string } = {};
  let letter: string = 'A';

  for (let i = 0; i < arr.length; i++) {
    obj[letter] = arr[i];
    letter = String.fromCharCode(letter.charCodeAt(0) + 1);
  }

  return obj;
}

export function getTimePeriodOptions(frequency: { intervalType: number; intervalValue: number; }) {
  const { intervalValue } = frequency;

  const times = MAX_MINUTE_FOR_TIME_PERIOD / intervalValue;

  const options = [];
  for (let i = 1; i <= times; i++) {
    options.push({
      label: { en: `${(i * intervalValue) / 60 / 1000} min`, tr: `${(i * intervalValue) / 60 / 1000} dakika` }[getLangKey()],
      value: (i * intervalValue),
    });
  }

  return options;
}

export function convertDeviceTypesToSelectOptions(options: any) {
  return Object.entries(options).map(([, value]) => ({ value, label: value }));
}
