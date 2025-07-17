import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { CATEGORY_STATUS } from '@shared/containers/Marketing/Select/ProductCategorySelect/constants';

export const { Types, Creators } = createActions(
  {
    getMarketProductCategoriesRequest: { isSubCategory: true, status: CATEGORY_STATUS.ACTIVE },
    getMarketProductCategoriesSuccess: { data: [] },
    getMarketProductCategoriesFailure: { error: null },

    initContainer: null,
    destroyContainer: null,
  },
  { prefix: `${REDUX_KEY.MARKETING.SELECT.PRODUCT_CATEGORY}_` },
);
