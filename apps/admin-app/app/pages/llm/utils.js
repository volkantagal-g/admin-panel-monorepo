import { getLangKey } from '@shared/i18n';

export const getFormattedSelectOptions = (
  valuesMap,
  langKey = getLangKey(),
) => {
  return Object.entries(valuesMap).map(([key, value]) => ({
    value: key,
    label: value?.[langKey],
  }));
};
export const getFormattedReasons = (options = [], langKey = getLangKey()) => {
  return options.map(option => ({
    value: option?.title?.en,
    label: option?.title?.[langKey],
  }));
};
