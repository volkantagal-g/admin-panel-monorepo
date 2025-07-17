import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions({
  getPromosByFiltersRequest: {
    domainTypes: undefined,
    status: undefined,
    isFreeProduct: undefined,
    responsibleDepartment: undefined,
    promoMechanic: undefined,
    limit: undefined,
    page: undefined,
    promoUsageType: undefined,
  },
  getPromosByFiltersSuccess: { promos: [], totalCount: 0 },
  getPromosByFiltersFailure: { error: null },
  setFilteredPromosRequest: { },
  setFilteredPromosSuccess: { promos: [] },
  setFilteredPromosFailure: { error: null },
  getResponsibleDepartmentsRequest: {},
  getResponsibleDepartmentsSuccess: { data: {} },
  getResponsibleDepartmentsFailure: { error: null },
  excludePromoProductsRequest: { body: {}, message: null },
  excludePromoProductsSuccess: { data: {} },
  excludePromoProductsFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix: `${REDUX_KEY.EXCLUDE_PROMO_PRODUCTS}_` });
