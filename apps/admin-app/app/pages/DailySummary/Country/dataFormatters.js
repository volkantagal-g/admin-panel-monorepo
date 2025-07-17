import { isEmpty } from 'lodash';

export function getTotalCountsFromCityDimensionedData({ dataFromDataKey, startDates }) {
  const initialData = {};
  Object.values(dataFromDataKey).forEach(cityData => {
    startDates.forEach(startDate => {
      initialData[startDate] = (initialData[startDate] || 0) + (cityData?.totals?.[startDate] || 0);
    });
  });

  return initialData;
}

export function getDomainTypeTotals({ domainData }) {
  if (isEmpty(domainData)) return null;
  const datesData = Object.values(domainData);
  for (let i = 0; i < datesData.length; i += 1) {
    const dateData = datesData[i];
    if (dateData > 0) return domainData;
  }
  // if all dates have 0 counts, don't show domain type
  return null;
}
