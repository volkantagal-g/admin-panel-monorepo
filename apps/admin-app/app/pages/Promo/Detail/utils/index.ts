import _ from 'lodash';

import { WORKING_HOURS_MINS_RANGE } from '../../constantValues';
import { AvailableTime, LanguageGlobal } from '../../types';

export const getLanguageValues = (languages: (keyof LanguageGlobal)[], val?: LanguageGlobal | null) => {
  return languages.reduce((acc, langKey) => {
    acc[langKey] = val && val[langKey] ? val[langKey] : '';
    return acc;
  }, {} as LanguageGlobal);
};

const isInRange = (source: AvailableTime[], value: number) => {
  return source?.some(timeObject => {
    if (!timeObject.startMin || !timeObject.endMin) {
      return false;
    }
    return value > timeObject.startMin && timeObject.endMin >= value;
  });
};

export const getAvailableTimes = (availableTimes: AvailableTime[]) => {
  return Array.from({ length: (24 * 7 * 60) / WORKING_HOURS_MINS_RANGE }).reduce((sumObject: Record<string, boolean>, tempValue, tempIndex) => {
    const timeValue = (tempIndex * WORKING_HOURS_MINS_RANGE) + WORKING_HOURS_MINS_RANGE;
    return {
      ...sumObject,
      [tempIndex]: isInRange(availableTimes, timeValue),
    };
  }, {} as Record<string, boolean>);
};

export function isArraysEqual(array1: Array<string | number>, array2: Array<string | number>) {
  return _.difference(array1, array2).length === 0 && _.difference(array2, array1).length === 0;
}

type MinAndMaxItemCountValidParams = {
  isListingPromo: boolean,
  doNotAllowMultiUsage: boolean,
  itemsCount: number,
  conditionItemsCount: number,
  maxItemCount: number,
  minItemCount: number,
}

export function areMinAndMaxItemCountValid({
  isListingPromo,
  doNotAllowMultiUsage,
  itemsCount,
  conditionItemsCount,
  maxItemCount,
  minItemCount,
}: MinAndMaxItemCountValidParams) {
  return !isListingPromo ||
    doNotAllowMultiUsage ||
    itemsCount === 0 ||
    conditionItemsCount === 0 ||
    maxItemCount <= minItemCount;
}
