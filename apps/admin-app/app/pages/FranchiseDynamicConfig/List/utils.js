import { capitalize, isEmpty, cloneDeep } from 'lodash';

import { convertSelectOptions, getLimitAndOffset } from '@shared/utils/common';

import { sortingNameConvention } from './constants';
import { getLangKey } from '@shared/i18n';

export const getDynamicConfigFilterRequestParams = (filters, pagination, sorter) => {
  let params = {};

  params = cloneDeep(filters);

  params.sort = sorter?.columnKey;
  params.sort_direction = sortingNameConvention[sorter?.order];

  const { limit, offset } = getLimitAndOffset(pagination);
  params.limit = limit;
  params.offset = offset;

  params.lang_key = getLangKey();

  delete params.configType;

  return { filters: params, configType: filters.configType };
};

export const formatSelectConfigDropdownData = data => {
  if (!isEmpty(data)) {
    const formattedData = data.map(config => {
      return { displayValue: capitalize(config.name), ...config };
    });

    const options = convertSelectOptions(formattedData, { valueKey: 'name', labelKey: 'displayValue' });

    return options;
  }
  return [];
};
