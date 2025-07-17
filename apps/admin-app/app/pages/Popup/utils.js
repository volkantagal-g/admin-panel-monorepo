import { toString } from 'lodash';

import { getLangKey } from '@shared/i18n';

export const convertPhoneLanguageOptions = countryLanguages => {
  return countryLanguages?.map(item => ({
    value: toString(item.toLowerCase()),
    label: item,
  }));
};

export const convertPageOptionsToSelectOptions = (pageOptions, componentType, targetDomain) => {
  const filterPageOptions = pageOption => {
    if (pageOption?.activeComponentTypes?.includes(componentType) &&
      (Array.isArray(targetDomain) ? targetDomain.some(domain => {
        return pageOption?.activeServices?.includes(domain);
      }) : pageOption?.activeServices?.includes(targetDomain))) {
      return [{
        value: pageOption?.pageId,
        label: pageOption?.name[getLangKey()],
      }];
    }
    return [];
  };

  return pageOptions.flatMap(filterPageOptions);
};
