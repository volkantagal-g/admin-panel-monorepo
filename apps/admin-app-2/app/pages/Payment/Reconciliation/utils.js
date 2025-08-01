import { POS_BANK_OPTIONS } from '@shared/shared/constantValues';
import { isCurrentCountryTurkey } from '@shared/utils/common';
import { DOMAIN_OPTIONS_GLOBAL, DOMAIN_OPTIONS_TR, SOURCE_OF_STATEMENTS_GLOBAL, SOURCE_OF_STATEMENTS_TR } from './constants';

export const isLocationTurkey = isCurrentCountryTurkey();

// for ant-design component options should contains only value-label object
export const getTurkeyPosBankOptions = (allPosBankOptions = POS_BANK_OPTIONS) => {
  const optionList = [];
  allPosBankOptions.map(options => options.isAvailableInTR && optionList.push({ value: options.value, label: options.label }));
  return optionList;
};

// return not available for turkey options
// for ant-design component options should contains only value-label object
export const getExceptTurkeyPosBankOptions = (allPosBankOptions = POS_BANK_OPTIONS) => {
  const optionList = [];
  allPosBankOptions.map(options => !options.isAvailableInTR && optionList.push({ value: options.value, label: options.label }));
  return optionList;
};
export const LOCATION_BASED_POS_BANKS = isLocationTurkey ? getTurkeyPosBankOptions() : getExceptTurkeyPosBankOptions();

export const LOCATION_BASED_DOMAIN_TYPES = isLocationTurkey ? DOMAIN_OPTIONS_TR : DOMAIN_OPTIONS_GLOBAL;

export const LOCATION_BASED_SOURCE_OF_STATEMENTS = isLocationTurkey ? SOURCE_OF_STATEMENTS_TR : SOURCE_OF_STATEMENTS_GLOBAL;
