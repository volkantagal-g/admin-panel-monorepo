import _ from 'lodash';

import { t } from '@shared/i18n';

export const removeEmptyProperties = filters => {
  return _.pickBy(filters, value => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    if (typeof value === 'object') {
      return !_.isEmpty(value);
    }
    return !_.isNil(value);
  });
};

export const setPieChartData = data => data.map(value => ({
  name: t(`franchiseLegalPage:DETAIL.${value.translationKey}`),
  y: value.value || 0,
}));
