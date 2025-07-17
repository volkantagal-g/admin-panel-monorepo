import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.EXCLUDE_PROMO_PRODUCTS;

export const getPromosByFiltersSelector = {
  getData: state => state?.[reducerKey]?.getPromosByFilters?.data || [],
  getIsPending: state => state?.[reducerKey]?.getPromosByFilters?.isPending,
};

export const getResponsibleDepartmentsSelector = {
  getData: state => state?.[reducerKey]?.getResponsibleDepartments?.data?.departmentFilter?.departments || [],
  getIsPending: state => state?.[reducerKey]?.getResponsibleDepartments?.isPending,
};

export const excludePromoProductsSelector = { getIsPending: state => state?.[reducerKey]?.excludePromoProducts?.isPending };
