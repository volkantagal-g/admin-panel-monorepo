import { get } from 'lodash';

export const getCountryList = (
  listData = [],
  {
    valueKey = '_id',
    labelKey = 'name',
  },
) => {
  return listData.map(obj => {
    const value = get(obj, valueKey, 'ERR - Value Key Not Found');
    const label = get(obj, labelKey, value);
    const code = get(obj, 'code');
    return {
      value,
      label,
      code,
    };
  });
};
