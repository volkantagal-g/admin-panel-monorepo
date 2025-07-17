import { deniedCountriesOnOperationsSet } from './constants';

export const isAllowedToOperate = selectedCountry => {
  if (deniedCountriesOnOperationsSet.has(selectedCountry?.code?.alpha2)) {
    return false;
  }
  return true;
};
