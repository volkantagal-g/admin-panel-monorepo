import _ from 'lodash';

import { getSelectedCountryLanguages } from '@shared/redux/selectors/countrySelection';
import { isNullOrEmpty } from '@shared/utils/common';

/**
 * @param {object} data onject
 * @param {array} path array of string paths
 * @param {any} languageItemDefaultValue default value for language item
 *
 * * @returns {object} language item with values
 */
export const getLangDataOfItem = (data = {}, path = [], languageItemDefaultValue) => {
  const countryLanguages = getSelectedCountryLanguages();
  const newData = {};
  countryLanguages.forEach(countryLanguage => {
    newData[countryLanguage] = _.get(data, [...path, countryLanguage], languageItemDefaultValue);
  });
  return newData;
};

export const getLangDataOfProductFullName = marketProduct => {
  const countryLanguages = getSelectedCountryLanguages();
  const newData = {};
  countryLanguages.forEach(countryLanguage => {
    const name = _.get(marketProduct, ['name', countryLanguage], '');
    const shortDescription = _.get(marketProduct, ['shortDescription', countryLanguage], '');
    newData[countryLanguage] = !isNullOrEmpty(shortDescription) ? `${name} (${shortDescription})` : name;
  });
  return newData;
};
