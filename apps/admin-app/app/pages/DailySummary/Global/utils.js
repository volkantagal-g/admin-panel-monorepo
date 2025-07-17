import { isEmpty } from 'lodash';

export function getAvailableCountryGroupNames(countryIdToData, countryIdToCountryGroupMap) {
  if (isEmpty(countryIdToData) || !countryIdToCountryGroupMap.size) {
    return [];
  }
  const countryGroupNamesMap = new Map();
  const countryIds = Object.keys(countryIdToData);

  countryIds.forEach(countryId => {
    if (countryIdToCountryGroupMap.has(countryId)) {
      const countryGroupName = countryIdToCountryGroupMap?.get(countryId)?.name;
      countryGroupNamesMap.set(countryGroupName, true);
    }
  });

  return [...countryGroupNamesMap.keys()];
}
