import { orderBy } from 'lodash';

import { SORT_OPTIONS } from '@shared/shared/constants';

export const sortPlanogramProduct = (products, key, order) => orderBy(
  products,
  [key],
  [order === 'ascend' ? SORT_OPTIONS.DIRECTIONS.TEXT.ASC : SORT_OPTIONS.DIRECTIONS.TEXT.DESC],
);
