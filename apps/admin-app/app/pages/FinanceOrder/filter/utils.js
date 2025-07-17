import { getLangKey } from '@shared/i18n';
import { ALL_OPTION_KEY } from './constants';

export const getFormattedSelectOptions = (objectMap, langKey = getLangKey()) => {
  return objectMap.map(item => ({
    value: item.name,
    label: item.trans[langKey],
  }));
};

export const handleAllOptionSelect = (selection, filterArr) => {
  if (selection === ALL_OPTION_KEY) {
    return filterArr.reduce(
      (arr, item) => (item.name !== 'ALL' ? [...arr, item.name] : []),
      [],
    );
  }
  return [selection];
};
