import { createActions } from 'reduxsauce';

import { GETIR_10_DOMAIN_TYPE, REDUX_KEY } from '@shared/shared/constants';
import { getSelectedDomainTypeFromLocalStorage } from './localStorage';

const prefix = `${REDUX_KEY.MARKET_ORDER.MISSING_PRODUCTS}_`;
export const defaultRowsPerPage = 100;
export const defaultCurrentPage = 1;
export const defaultDomainType = GETIR_10_DOMAIN_TYPE;

export const { Types, Creators } = createActions(
  {
    getMissingProductOrdersRequest: {
      domainType: defaultDomainType,
      offset: 0,
      limit: defaultRowsPerPage,
      city: null,
    },
    getMissingProductOrdersSuccess: { data: [] },
    getMissingProductOrdersFailure: { error: null },
    setSelectedDomainType: { domainType: defaultDomainType },
    setPagination: {
      currentPage: defaultCurrentPage,
      rowsPerPage: defaultRowsPerPage,
    },
    setSelectedCity: { city: null },
    updateMissingOrderStatus: { orderId: null },
    setSearchTerm: { searchTerm: null },
    initPage: () => ({
      initialDomainType: getSelectedDomainTypeFromLocalStorage(),
      type: `${prefix}INIT_PAGE`,
    }),
    destroyPage: null,
    addMhProblemRequest: { adminUser: null, orderId: null, domainType: defaultDomainType },
    addMhProblemSuccess: { data: {} },
    addMhProblemFailure: { error: null },
    updateMissingProductStatusRequest: { status: null, orderId: null, domainType: defaultDomainType },
    updateMissingProductStatusSuccess: { data: {} },
    updateMissingProductStatusFailure: { error: null },
    getOrderCancelReasonsRequest: { domainType: defaultDomainType },
    getOrderCancelReasonsSuccess: { data: {} },
    getOrderCancelReasonsFailure: { error: null },
    orderPartialRefundRequest: {
      orderId: null,
      products: [],
      refundBagFee: false,
      refundDeliveryFee: false,
      domainType: defaultDomainType,
      onSuccess: null,
    },
    orderPartialRefundSuccess: { data: {} },
    orderPartialRefundFailure: { error: null },
    getMarketOrderRequest: { domainType: defaultDomainType, id: null },
    getMarketOrderSuccess: { data: {} },
    getMarketOrderFailure: { error: null },
  },
  { prefix },
);
