import { createSelector } from 'reselect';

import { isEmpty } from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';
import { getFilteredWarehousesSelector } from '@shared/redux/selectors/common';
import { formatActiveOrders } from '../utils';

const reduxKey = REDUX_KEY.MARKET_ORDER_ANALYTICS.ACTIVE_ORDERS_FOR_CUSTOMER_SERVICES;

export const activeOrdersForCustomerServicesSelector = {
  getIsPending: state => state[reduxKey].activeOrdersForCustomerServices.isPending,
  getData: createSelector(
    state => state[reduxKey]?.activeOrdersForCustomerServices?.data?.orders,
    orderData => {
      if (isEmpty(orderData)) {
        return [];
      }
      return formatActiveOrders({ activeOrders: orderData });
    },
  ),
  getTotalActiveOrders: state => state[reduxKey]?.activeOrdersForCustomerServices?.data?.count,
};

export const filtersSelector = {
  getSelectedDomainType: state => state[reduxKey]?.filters?.domainType,
  getSelectedCity: state => state[reduxKey]?.filters?.city,
  getWarehouseSelector: state => state[reduxKey]?.filters?.warehouse,
  getSelectedCourierId: state => state[reduxKey]?.filters?.courierId,
  getSlottedState: state => state[reduxKey]?.filters?.slottedState,
  getOrderStatuses: state => state[reduxKey]?.filters?.orderStatuses,
  getPagination: state => state[reduxKey]?.filters?.pagination,
  getIntegrationTypes: state => state[reduxKey]?.filters?.integrationTypes,
  getExcludedIntegrationTypes: state => state[reduxKey]?.filters?.excludedIntegrationTypes,
};

export const courierDataSelector = {
  getIsPending: state => state[reduxKey]?.courierData?.isPending,
  getData: state => state[reduxKey]?.courierData?.data,
};

export const getWarehousesSelector = {
  getData: createSelector(
    getFilteredWarehousesSelector.getData,
    filtersSelector.getSelectedDomainType,
    filtersSelector.getSelectedCity,
    (warehouses = [], domainType, city) => {
      return warehouses.filter(warehouse => {
        if (city && warehouse.city !== city) {
          return false;
        }
        if (domainType && !warehouse.domainTypes.includes(domainType)) {
          return false;
        }
        return true;
      });
    },
  ),
  getIsPending: getFilteredWarehousesSelector.getIsPending,
};
