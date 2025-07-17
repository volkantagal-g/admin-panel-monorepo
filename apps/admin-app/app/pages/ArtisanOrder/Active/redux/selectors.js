import { createSelector } from 'reselect';
import { get, find, indexOf } from 'lodash';
import moment from 'moment-timezone';

import { getActivityDiff } from '../components/DataTable/utils';

import {
  REDUX_KEY,
  PLATFORM_TYPE,
  GETIR_DOMAIN_TYPES,
  LOCALS_DELIVERY,
  ARTISAN_ACTIVE_ORDER_QUEUED_STATUS,
} from '@shared/shared/constants';
import { searchItemFields } from '@shared/utils/common';

const reducerKey = REDUX_KEY.ARTISAN_ORDER.ACTIVE;

const activesSearchFields = [
  '_id',
  'client.name',
  'shop.name',
  'courier.name',
  'promo.promoCode',
];

export const activesSelector = {
  getActives: state => state?.[reducerKey]?.response?.data,
  getActivesIsPending: state => state?.[reducerKey]?.response?.isPending,
};

export const paymentMethodsSelector = {
  getPaymentMethods: state => state?.[reducerKey]?.paymentMethods?.data,
  getPaymentMethodsIsPending: state => state?.[reducerKey]?.paymentMethods?.isPending,
};

export const merchantTypesSelector = {
  getMerchantTypes: state => state?.[reducerKey]?.merchantTypes?.data,
  getMerchantTypesIsPending: state => state?.[reducerKey]?.merchantTypes?.isPending,
};

export const shopsSelector = {
  getShopsByName: state => state?.[reducerKey]?.shops?.data,
  getShopsByNameIsPending: state => state?.[reducerKey]?.shops?.isPending,
};

export const fetchersSelector = {
  getFetchersCountry: state => state?.[reducerKey]?.fetchers?.country,
  getFetchersCity: state => state?.[reducerKey]?.fetchers?.city,
};

export const filtersSelector = {
  getLocal: state => state?.[reducerKey]?.filters?.localsValue,
  getCity: state => state?.[reducerKey]?.filters?.city,
  getDelivery: state => state?.[reducerKey]?.filters?.deliveryValue,
  getPlatform: state => state?.[reducerKey]?.filters?.platformValue,
  getCouriers: state => state?.[reducerKey]?.filters?.couriers,
  getPaymentTypes: state => state?.[reducerKey]?.filters?.paymentTypes,
  getOrderStatusTypes: state => state?.[reducerKey]?.filters?.orderStatusTypes,
  getCouriersDomainTypes: state => state?.[reducerKey]?.filters?.domainType,
  getLastActivity: state => state?.[reducerKey]?.filters?.lastActivity,
  getSearchValue: state => state?.[reducerKey]?.filters?.searchValue,
  getLocalsSearchValue: state => state?.[reducerKey]?.filters?.searchLocalsValue,
};

export const mappedResultsSelector = {
  getResults: createSelector(
    state => state?.[reducerKey]?.mappedResults,
    paymentMethodsState => paymentMethodsState?.[reducerKey]?.paymentMethods,
    filtersState => filtersState?.[reducerKey]?.filters,
    ({ data: activeOrders }, { data: paymentMethods }, filters) => {
      const selectedPaymentTypes = filters.paymentTypes.map(payment => (find(paymentMethods, { id: payment })).type);
      const selectedCourierTypes = filters.couriers.map(courierType => +courierType);
      const selectedOrderStatusTypes = filters.orderStatusTypes.map(orderStatusType => +orderStatusType);

      return activeOrders.filter(activeOrder => {
        const additionalPaymentMethod = get(activeOrder, 'additionalPaymentInfo.paymentMethod');
        const selectedCourierDomainType = get(activeOrder, 'courierServiceDomainTypes', '');
        const orderPaymentMethod = get(activeOrder, 'paymentInfo.paymentMethod', '');
        const orderDeviceType = get(activeOrder, 'deviceInfo.deviceType', '');
        const orderCourierType = get(activeOrder, 'courier.courierType', '');
        const deliveryType = get(activeOrder, 'deliveryType', '');
        const isInQueue = get(activeOrder, 'isInQueue', '');
        const orderStatus = get(activeOrder, 'status', '');
        const orderCity = get(activeOrder, 'cityId', '');

        const orderLastActivityDiff = getActivityDiff(activeOrder);
        const lastActivityDiff = parseInt(moment.duration(orderLastActivityDiff).asMinutes(), 10);
        let hasCourierDomainTypesFilter = true;
        const lastActivityBoolVar = filters.lastActivity.some(lastActivity => {
          return (+(lastActivity.split('-')[0]) <= lastActivityDiff && +(lastActivity.split('-')[1]) > lastActivityDiff);
        });
        const boolVar = (selectedOrderStatusTypes.includes(ARTISAN_ACTIVE_ORDER_QUEUED_STATUS) && isInQueue) ||
        (indexOf(selectedOrderStatusTypes, orderStatus) > -1 && !isInQueue);

        const isDedicatedCourier = (selectedCourierDomainType?.length === 1 &&
          selectedCourierDomainType.includes(GETIR_DOMAIN_TYPES.LOCALS)) || (selectedCourierDomainType?.length === 2 &&
            selectedCourierDomainType.includes(GETIR_DOMAIN_TYPES.LOCALS) && selectedCourierDomainType.includes(GETIR_DOMAIN_TYPES.FOOD));

        if (filters.domainType) {
          if (+filters.domainType === GETIR_DOMAIN_TYPES.LOCALS) {
            hasCourierDomainTypesFilter = isDedicatedCourier;
          }
          else {
            hasCourierDomainTypesFilter = (+deliveryType === LOCALS_DELIVERY.GETIR) && !isDedicatedCourier;
          }
        }

        const hasCourierFilter = selectedCourierTypes.length > 0 ? indexOf(selectedCourierTypes, orderCourierType) > -1 : true;
        const hasOrderStatusTypeFilter = selectedOrderStatusTypes.length > 0 ? boolVar : true;
        const hasLastActivityFilter = filters.lastActivity.length > 0 ? lastActivityBoolVar : true;
        const hasCityFilter = filters.city.length > 0 ? indexOf(filters.city, orderCity) > -1 : true;
        const hasDeliveryFilter = filters.deliveryValue ? (+filters.deliveryValue === activeOrder.deliveryType) : true;
        const hasLocalsFilter = filters.localsValue ? (filters.localsValue === activeOrder.shop._id) : true;
        const hasSearchFilter = searchItemFields(activeOrder, filters.searchValue, activesSearchFields);
        const hasRetailOrderFilter = filters.filterRetailOrders ? activeOrder?.isShopRetail === true : true;
        const hasScheduledOrderFilter = filters.filterScheduledOrders ? activeOrder.hasOwnProperty('selectedSlotOption') === true : true;

        const hasMerchantTypeFilter = filters.merchantTypes.length > 0 ?
          filters.merchantTypes.some(merchantType => merchantType === activeOrder?.shop.type) : true;

        const hasPlatformFilter = filters.platformValue ? ((filters.platformValue === PLATFORM_TYPE.WEB && orderDeviceType === PLATFORM_TYPE.WEB) ||
          (filters.platformValue === PLATFORM_TYPE.MOBILE && orderDeviceType !== PLATFORM_TYPE.WEB)) : true;

        const hasPaymentFilter = selectedPaymentTypes.length > 0 ? selectedPaymentTypes.some(paymentType => paymentType === orderPaymentMethod ||
            paymentType === additionalPaymentMethod) : true;

        return hasPaymentFilter &&
              hasCourierFilter &&
              hasCourierDomainTypesFilter &&
              hasLastActivityFilter &&
              hasPlatformFilter &&
              hasDeliveryFilter &&
              hasCityFilter &&
              hasLocalsFilter &&
              hasSearchFilter &&
              hasOrderStatusTypeFilter &&
              hasMerchantTypeFilter &&
              hasRetailOrderFilter &&
              hasScheduledOrderFilter;
      });
    },
  ),
};
