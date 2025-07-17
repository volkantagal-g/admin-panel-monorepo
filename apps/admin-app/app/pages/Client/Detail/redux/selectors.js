import { createSelector } from 'reselect';
import _ from 'lodash';

import { getStateObject } from '@shared/utils/common';
import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.CLIENT.DETAIL;

export const clientSelector = {
  getClient: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'client');
    },
    ({ data }) => {
      return data;
    },
  ),
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'client');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const segmentsOfClientSelector = {
  segments: state => {
    const clientSegmentsObj = getStateObject(state, reducerKey, 'clientSegments');
    return clientSegmentsObj.data;
  },
  isPending: state => {
    const clientSegmentsObj = getStateObject(state, reducerKey, 'clientSegments');
    return !!clientSegmentsObj.isPending;
  },
};

export const commPrefSelector = {
  comPref: state => state?.[reducerKey]?.clientMarketingCommunicationPreferences,
  isPending: state => state?.[reducerKey]?.clientMarketingCommunicationPreferences?.isPending,
};

export const noteSelector = {
  getNotes: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'notes');
    },
    ({ data }) => {
      return data;
    },
  ),
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'notes');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const ordersHistorySelector = {
  getOrdersHistory: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'ordersHistory');
    },
    filters => {
      return filters;
    },
  ),
};

export const foodOrdersSelector = {
  getFoodOrders: state => state?.[reducerKey]?.foodOrders?.data,
  isPending: state => state?.[reducerKey]?.foodOrders?.isPending,

  getFilters: state => state?.[reducerKey]?.filters,
  getOrderStatus: state => state?.[reducerKey]?.filters?.status,
  getDeliveryTypes: state => state?.[reducerKey]?.filters?.deliveryTypes,
  getPaymentMethods: state => state?.[reducerKey]?.filters?.paymentMethods,
  getStartDate: state => state?.[reducerKey]?.filters?.startDate,
  getEndDate: state => state?.[reducerKey]?.filters?.endDate,
};

export const paymentMethodsSelector = {
  getData: state => state?.[reducerKey]?.paymentMethods?.data,
  isPending: state => state?.[reducerKey]?.paymentMethods?.isPending,
};

export const discountsSelector = {
  getDiscounts: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'discounts');
    },
    ({ data }) => {
      return data;
    },
  ),
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'discounts');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const feedbacksSelector = {
  getFeedbacks: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'feedbacks');
    },
    ({ data }) => {
      return _.orderBy(data, ['createdAt'], 'desc');
    },
  ),
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'feedbacks');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const localsOrdersSelector = {
  getLocalsOrders: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'localsOrders');
    },
    ({ data }) => {
      return data;
    },
  ),
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'localsOrders');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getirBiTaksiOrdersSelector = {
  getGetirBiTaksiOrders: state => {
    return getStateObject(state, reducerKey, 'getirBiTaksiOrders');
  },
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getirBiTaksiOrders');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const deviceSelector = {
  getDevices: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'devices');
    },
    ({ data }) => {
      return data;
    },
  ),
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'devices');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const forbiddenMatchSelector = {
  getForbiddenMatches: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'forbiddenMatches');
    },
    ({ data }) => {
      return data;
    },
  ),
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'forbiddenMatches');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const eligiblePromosSelector = {
  getEligiblePromos: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'eligiblePromos');
    },
    ({ data }) => {
      return data;
    },
  ),
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'eligiblePromos');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const shownPromosSelector = {
  getShownPromos: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'shownPromos');
    },
    ({ data }) => {
      return data;
    },
  ),
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'shownPromos');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const loyaltyStampsSelector = {
  getStamps: state => state?.[reducerKey]?.loyaltyStamps?.data,
  getIsPending: state => state?.[reducerKey]?.loyaltyStamps?.isPending,
};

export const accessSelector = {
  getToken: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'access');
    },
    ({ clientDetailAccessToken }) => {
      return clientDetailAccessToken;
    },
  ),
  getCountryCodes: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'access');
    },
    ({ availableCountryCodes }) => {
      return availableCountryCodes;
    },
  ),
  isOtpSent: state => {
    const { isOtpSent } = getStateObject(state, reducerKey, 'access');

    return isOtpSent;
  },
  isOtpValid: state => {
    const { isOtpValid } = getStateObject(state, reducerKey, 'access');

    return isOtpValid;
  },
  isActiveChatTokenValid: state => {
    const { activeChatToken } = getStateObject(state, reducerKey, 'access');

    return activeChatToken?.isValid;
  },
  isActiveChatTokenValidationPending: state => {
    const { activeChatToken } = getStateObject(state, reducerKey, 'access');

    return activeChatToken?.isValidationPending;
  },
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'access');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
  getErrorCode: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'access');
    },
    ({ errorCode }) => {
      return errorCode;
    },
  ),
};

export const waterMarketPlaceSelector = {
  getGetirWaterMarketplaceOrders: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getirWaterMarketplaceOrders');
    },
    ({ data }) => {
      return data;
    },
  ),
  getGetirWaterMarketplacePagination: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getirWaterMarketplaceOrders');
    },
    ({ pagination }) => {
      return pagination;
    },
  ),
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'getirWaterMarketplaceOrders');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const subscriptionDetailSelector = {
  getSubscriptionDetails: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'subscriptionDetails');
    },
    ({ data }) => {
      return data;
    },
  ),
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'subscriptionDetails');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const transactionDetailSelector = {
  getTransactionDetails: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'transactionDetails');
    },
    ({ data }) => {
      return data;
    },
  ),
  isPending: createSelector(
    state => {
      return getStateObject(state, reducerKey, 'transactionDetails');
    },
    ({ isPending }) => {
      return isPending;
    },
  ),
};

export const getClientDiscountWarnConfigSelector = {
  getData: state => state[reducerKey]?.discountWarnAmounts?.data,
  getIsPending: state => state[reducerKey]?.discountWarnAmounts?.isPending,
};

export const getirTableOrdersSelector = {
  getData: state => state?.[reducerKey]?.getirTableOrders?.data?.result?.data,
  getIsPending: state => state?.[reducerKey]?.getirTableOrders?.isPending,
};

export const financeOrdersSelector = {
  getOrders: state => state?.[reducerKey]?.financeOrders?.data,
  getTotalCount: state => state?.[reducerKey]?.financeOrders?.totalCount,
  getIsPending: state => state?.[reducerKey]?.financeOrders?.isPending,
};

export const getirJobsSelector = {
  getClient: state => state?.[reducerKey]?.getirJobsClientStatus?.data,
  getIsPending: state => state?.[reducerKey]?.getirJobsClientStatus?.isPending,
};

export const getirJobsDeleteSelector = {
  deletedStatus: state => state?.[reducerKey]?.getirJobsClientDelete?.data,
  getIsPending: state => state?.[reducerKey]?.getirJobsClientDelete?.isPending,
};
