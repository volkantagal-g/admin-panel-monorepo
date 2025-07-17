import moment from 'moment';
import { createReducer } from 'reduxsauce';

import { Types } from '@app/pages/Client/Detail/redux/actions';
import { GETIR_DOMAIN_TYPES } from '@shared/shared/constants';

export const defaultDates = {
  startDate: moment().subtract(7, 'd').startOf('day'),
  endDate: moment().endOf('day'),
};

export const INITIAL_STATE = {
  access: {
    clientDetailAccessToken: null,
    clientId: null,
    availableCountryCodes: [],
    isPending: false,
    error: null,
    errorCode: null,
    isOtpSent: false,
    isOtpValid: undefined,
    activeChatToken: {
      isValid: false,
      isValidationPending: false,
    },
  },
  client: {
    data: {},
    isPending: false,
    error: null,
  },
  clientSegments: {
    data: [],
    isPending: false,
    error: null,
  },
  notes: {
    data: [],
    isPending: false,
    error: null,
  },
  discounts: {
    data: [],
    isPending: false,
    error: null,
  },
  ordersHistory: {
    data: [],
    isPending: false,
    error: null,
    filters: {
      city: null,
      region: null,
      statuses: null,
      domainType: GETIR_DOMAIN_TYPES.GETIR10,
      createdAtStart: defaultDates.startDate,
      createdAtEnd: defaultDates.endDate,
    },
  },
  foodOrders: {
    data: [],
    isPending: false,
    error: null,
  },
  paymentMethods: {
    data: [],
    isPending: false,
    error: null,
  },
  filters: {
    page: 1,
    count: 10,
    status: null,
    deliveryTypes: [],
    paymentMethods: [],
    startDate: defaultDates.startDate,
    endDate: defaultDates.endDate,
  },
  feedbacks: {
    data: [],
    isPending: false,
    error: null,
  },
  devices: {
    data: [],
    isPending: false,
    error: null,
  },
  localsOrders: {
    data: [],
    isPending: false,
    error: null,
  },
  forbiddenMatches: {
    data: [],
    isPending: false,
    error: null,
  },
  getirBiTaksiOrders: {
    data: [],
    pagination: {},
    isPending: false,
    error: null,
  },
  eligiblePromos: {
    data: [],
    isPending: false,
    error: null,
  },
  shownPromos: {
    data: [],
    isPending: false,
    error: null,
  },
  loyaltyStamps: {
    data: {},
    isPending: false,
    error: null,
  },
  getirWaterMarketplaceOrders: {
    data: [],
    pagination: {},
    isPending: false,
    error: null,
  },
  clientMarketingCommunicationPreferences: {
    data: {},
    isPending: false,
    error: null,
    emailLoading: false,
    smsLoading: false,
    phoneLoading: false,
    ntfLoading: false,
    disabled: false,
  },
  subscriptionDetails: {
    data: [],
    pagination: {},
    isPending: false,
    error: null,
  },
  transactionDetails: {
    data: [],
    pagination: {},
    isPending: false,
    error: null,
  },
  discountWarnAmounts: {
    data: null,
    isPending: false,
    error: null,
  },
  getirTableOrders: {
    data: {},
    isPending: false,
    error: null,
  },
  financeOrders: {
    data: [],
    totalCount: 0,
    isPending: false,
    error: null,
  },
  getirJobsClientStatus: {
    data: null,
    isPending: false,
    error: null,
  },
  getirJobsClientDelete: {
    data: null,
    isPending: false,
    error: null,
  },
};

export const getClientDetailAccessTokenRequest = state => {
  return {
    ...state,
    access: {
      ...state.access,
      isPending: true,
    },
  };
};

export const getClientDetailAccessTokenSuccess = (state, { data }) => {
  return {
    ...state,
    access: {
      ...state.access,
      ...data,
      isPending: false,
    },
  };
};

export const getClientDetailAccessTokenFailure = (state, { error }) => {
  return {
    ...state,
    access: {
      ...state.access,
      ...error?.response?.data,
      isPending: false,
      error,
    },
  };
};

export const updateClientDetailAccessToken = (state, { token }) => {
  return {
    ...state,
    access: {
      ...state.access,
      token,
    },
  };
};

export const sendOtpRequest = state => {
  return {
    ...state,
    access: {
      ...state.access,
      isOtpSent: false,
    },
  };
};

export const sendOtpSuccess = state => {
  return {
    ...state,
    access: {
      ...state.access,
      isOtpSent: true,
    },
  };
};

export const sendOtpFailure = state => {
  return {
    ...state,
    access: {
      ...state.access,
      isOtpSent: false,
    },
  };
};

export const checkOtpRequest = state => {
  return {
    ...state,
    access: {
      ...state.access,
      isOtpValid: undefined,
    },
  };
};

export const checkOtpSuccess = (state, { isOtpValid }) => {
  return {
    ...state,
    access: {
      ...state.access,
      isOtpValid,
    },
  };
};

export const checkOtpFailure = state => {
  return {
    ...state,
    access: {
      ...state.access,
      isOtpValid: false,
    },
  };
};

export const getClientRequest = state => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: true,
    },
  };
};

export const getClientSuccess = (state, { data }) => {
  return {
    ...state,
    client: {
      ...state.client,
      data,
      isPending: false,
    },
  };
};

export const getClientFailure = (state, { error }) => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: false,
      error,
    },
  };
};

export const getSegmentsOfClientRequest = state => {
  return {
    ...state,
    clientSegments: {
      ...state.clientSegments,
      isPending: true,
    },
  };
};

export const getSegmentsOfClientSuccess = (state, { data }) => {
  return {
    ...state,
    clientSegments: {
      ...state.clientSegments,
      data,
      isPending: false,
    },
  };
};

export const getSegmentsOfClientFailure = (state, { error }) => {
  return {
    ...state,
    clientSegments: {
      ...state.clientSegments,
      isPending: false,
      error,
    },
  };
};

export const updateContactNumberRequest = state => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: true,
    },
  };
};

export const updateContactNumberSuccess = (state, { data }) => {
  const { contactNumber } = data;
  return {
    ...state,
    client: {
      ...state.client,
      data: {
        ...state.client.data,
        contactNumber,
      },
      isPending: false,
    },
  };
};

export const updateContactNumberFailure = (state, { error }) => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: false,
      error,
    },
  };
};

export const updateClientActivenessRequest = state => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: true,
    },
  };
};

export const updateClientActivenessSuccess = (state, { data }) => {
  const { isActivated } = data;
  return {
    ...state,
    client: {
      ...state.client,
      data: {
        ...state.client.data,
        isActivated,
      },
      isPending: false,
    },
  };
};

export const updateClientActivenessFailure = (state, { error }) => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: false,
      error,
    },
  };
};

export const closeClientAccountRequest = state => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: true,
    },
  };
};

export const closeClientAccountSuccess = state => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: false,
    },
  };
};

export const closeClientAccountFailure = (state, { error }) => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: false,
      error,
    },
  };
};

export const reopenClientAccountRequest = state => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: true,
    },
  };
};

export const reopenClientAccountSuccess = state => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: false,
    },
  };
};

export const reopenClientAccountFailure = (state, { error }) => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: false,
      error,
    },
  };
};

export const anonymiseClientAccountRequest = state => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: true,
    },
  };
};

export const anonymiseClientAccountSuccess = state => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: false,
    },
  };
};

export const anonymiseClientAccountFailure = (state, { error }) => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: false,
      error,
    },
  };
};

export const unlinkFacebookRequest = state => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: true,
    },
  };
};

export const unlinkFacebookSuccess = state => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: false,
    },
  };
};

export const unlinkFacebookFailure = (state, { error }) => {
  return {
    ...state,
    client: {
      ...state.client,
      isPending: false,
      error,
    },
  };
};

export const getClientNotesRequest = state => {
  return {
    ...state,
    notes: {
      ...state.notes,
      isPending: true,
    },
  };
};

export const getClientNotesSuccess = (state, { data }) => {
  return {
    ...state,
    notes: {
      ...state.notes,
      data,
      isPending: false,
    },
  };
};

export const getClientNotesFailure = (state, { error }) => {
  return {
    ...state,
    notes: {
      ...state.notes,
      isPending: false,
      error,
    },
  };
};

export const getClientDevicesRequest = state => {
  return {
    ...state,
    devices: {
      ...state.devices,
      isPending: true,
    },
  };
};

export const getClientDevicesSuccess = (state, { data }) => {
  return {
    ...state,
    devices: {
      ...state.devices,
      data,
      isPending: false,
    },
  };
};

export const getClientDevicesFailure = (state, { error }) => {
  return {
    ...state,
    devices: {
      ...state.devices,
      isPending: false,
      error,
    },
  };
};

export const blockClientDeviceRequest = state => {
  return {
    ...state,
    devices: {
      ...state.devices,
      isPending: true,
    },
  };
};

export const blockClientDeviceSuccess = state => {
  return {
    ...state,
    devices: {
      ...state.devices,
      isPending: false,
    },
  };
};

export const blockClientDeviceFailure = (state, { error }) => {
  return {
    ...state,
    devices: {
      ...state.devices,
      isPending: false,
      error,
    },
  };
};

export const unblockClientDeviceRequest = state => {
  return {
    ...state,
    devices: {
      ...state.devices,
      isPending: true,
    },
  };
};

export const unblockClientDeviceSuccess = state => {
  return {
    ...state,
    devices: {
      ...state.devices,
      isPending: false,
    },
  };
};

export const unblockClientDeviceFailure = (state, { error }) => {
  return {
    ...state,
    devices: {
      ...state.devices,
      isPending: false,
      error,
    },
  };
};

export const logoutFromAllClientDevicesRequest = state => {
  return {
    ...state,
    devices: {
      ...state.devices,
      isPending: true,
    },
  };
};

export const logoutFromAllClientDevicesSuccess = state => {
  return {
    ...state,
    devices: {
      ...state.devices,
      isPending: false,
    },
  };
};

export const logoutFromAllClientDevicesFailure = (state, { error }) => {
  return {
    ...state,
    devices: {
      ...state.devices,
      isPending: false,
      error,
    },
  };
};

export const logoutClientDeviceRequest = state => {
  return {
    ...state,
    devices: {
      ...state.devices,
      isPending: true,
    },
  };
};

export const logoutClientDeviceSuccess = state => {
  return {
    ...state,
    devices: {
      ...state.devices,
      isPending: false,
    },
  };
};

export const logoutClientDeviceFailure = (state, { error }) => {
  return {
    ...state,
    devices: {
      ...state.devices,
      isPending: false,
      error,
    },
  };
};

export const createClientNoteRequest = state => {
  return {
    ...state,
    notes: {
      ...state.notes,
      // isPending: true,
    },
  };
};

export const createClientNoteSuccess = (state, { data }) => {
  return {
    ...state,
    notes: {
      ...state.notes,
      data: [
        ...state.notes.data,
        data,
      ],
      isPending: false,
    },
  };
};

export const createClientNoteFailure = (state, { error }) => {
  return {
    ...state,
    notes: {
      ...state.notes,
      isPending: false,
      error,
    },
  };
};

export const updateClientNoteRequest = state => {
  return {
    ...state,
    notes: {
      ...state.notes,
      // isPending: true,
    },
  };
};

export const updateClientNoteSuccess = (state, { data }) => {
  const notes = state.notes.data.map(note => {
    if (note._id !== data._id) return note;
    return data;
  });
  return {
    ...state,
    notes: {
      ...state.notes,
      data: notes,
      isPending: false,
    },
  };
};

export const updateClientNoteFailure = (state, { error }) => {
  return {
    ...state,
    notes: {
      ...state.notes,
      isPending: false,
      error,
    },
  };
};

export const getClientMarketingCommunicationPreferencesRequest = state => {
  return {
    ...state,
    clientMarketingCommunicationPreferences: {
      ...state.clientMarketingCommunicationPreferences,
      isPending: true,
    },
  };
};

export const getClientMarketingCommunicationPreferencesSuccess = (state, { data }) => {
  return {
    ...state,
    clientMarketingCommunicationPreferences: {
      ...state.clientMarketingCommunicationPreferences,
      isPending: false,
      data,
    },
  };
};

export const getClientMarketingCommunicationPreferencesFailure = (state, { error }) => {
  return {
    ...state,
    clientMarketingCommunicationPreferences: {
      ...state.clientMarketingCommunicationPreferences,
      isPending: false,
      error,
    },
  };
};

export const updateClientMarketingCommunicationPreferencesRequest = (state, { loading }) => {
  return {
    ...state,
    clientMarketingCommunicationPreferences: {
      ...state.clientMarketingCommunicationPreferences,
      [loading]: true,
      disabled: true,
    },
  };
};

export const updateClientMarketingCommunicationPreferencesSuccess = (state, { data, loading }) => {
  return {
    ...state,
    clientMarketingCommunicationPreferences: {
      ...state.clientMarketingCommunicationPreferences,
      data,
      isPending: false,
      [loading]: false,
      disabled: false,
    },
  };
};

export const updateClientMarketingCommunicationPreferencesFailure = (state, { error }) => {
  return {
    ...state,
    clientMarketingCommunicationPreferences: {
      ...state.clientMarketingCommunicationPreferences,
      isPending: false,
      error,
    },
  };
};

export const getOrdersHistoryRequest = state => {
  return {
    ...state,
    ordersHistory: {
      ...state.ordersHistory,
      isPending: true,
    },
  };
};

export const getClientFeedbacksRequest = state => {
  return {
    ...state,
    feedbacks: {
      ...state.feedbacks,
      isPending: true,
    },
  };
};

export const getOrdersHistorySuccess = (state, { data }) => {
  return {
    ...state,
    ordersHistory: {
      ...state.ordersHistory,
      data,
      isPending: false,
    },
  };
};

export const getClientFeedbacksSuccess = (state, { data }) => {
  return {
    ...state,
    feedbacks: {
      ...state.feedbacks,
      data,
      isPending: false,
    },
  };
};

export const getOrdersHistoryFailure = (state, { error }) => {
  return {
    ...state,
    ordersHistory: {
      ...state.ordersHistory,
      isPending: false,
      error,
    },
  };
};

export const getClientFeedbacksFailure = (state, { error }) => {
  return {
    ...state,
    feedbacks: {
      ...state.feedbacks,
      isPending: false,
      error,
    },
  };
};

export const resolveClientFeedbackRequest = state => {
  return {
    ...state,
    feedbacks: {
      ...state.feedbacks,
      isPending: true,
    },
  };
};

export const resolveClientFeedbackSuccess = state => {
  return {
    ...state,
    feedbacks: {
      ...state.feedbacks,
      isPending: false,
    },
  };
};

export const resolveClientFeedbackFailure = (state, { error }) => {
  return {
    ...state,
    feedbacks: {
      ...state.feedbacks,
      isPending: false,
      error,
    },
  };
};

export const createClientFeedbackRequest = state => {
  return {
    ...state,
    feedbacks: {
      ...state.feedbacks,
      isPending: true,
    },
  };
};

export const getFoodOrdersRequest = state => {
  return {
    ...state,
    foodOrders: {
      ...state.foodOrders,
      isPending: true,
    },
  };
};

export const getFoodOrdersSuccess = (state, { data }) => {
  return {
    ...state,
    foodOrders: {
      ...state.foodOrders,
      data,
      isPending: false,
    },
  };
};

export const getFoodOrdersFailure = (state, { error }) => {
  return {
    ...state,
    foodOrders: {
      ...state.foodOrders,
      isPending: false,
      error,
    },
  };
};

export const getClientDiscountsRequest = state => {
  return {
    ...state,
    discounts: {
      ...state.discounts,
      isPending: true,
    },
  };
};

export const getClientDiscountsSuccess = (state, { data }) => {
  return {
    ...state,
    discounts: {
      ...state.discounts,
      data,
      isPending: false,
    },
  };
};

export const getClientDiscountsFailure = (state, { error }) => {
  return {
    ...state,
    discounts: {
      ...state.discounts,
      isPending: false,
      error,
    },
  };
};

export const getLocalsOrdersRequest = state => {
  return {
    ...state,
    localsOrders: {
      ...state.localsOrders,
      isPending: true,
    },
  };
};

export const getLocalsOrdersSuccess = (state, { data }) => {
  return {
    ...state,
    localsOrders: {
      ...state.localsOrders,
      data,
      isPending: false,
    },
  };
};

export const getLocalsOrdersFailure = (state, { error }) => {
  return {
    ...state,
    localsOrders: {
      ...state.localsOrders,
      isPending: false,
      error,
    },
  };
};

export const getGetirBiTaksiOrdersRequest = state => {
  return {
    ...state,
    getirBiTaksiOrders: {
      ...state.getirBiTaksiOrders,
      isPending: true,
    },
  };
};

export const getGetirBiTaksiOrdersSuccess = (state, { data }) => {
  return {
    ...state,
    getirBiTaksiOrders: {
      ...state.getirBiTaksiOrders,
      data: data?.trips,
      pagination: data?.pagination,
      isPending: false,
    },
  };
};

export const createClientFeedbackSuccess = (state, { data }) => {
  return {
    ...state,
    feedbacks: {
      ...state.feedbacks,
      data: [
        ...state.feedbacks.data,
        data,
      ],
      isPending: false,
    },
  };
};

export const getGetirBiTaksiOrdersFailure = (state, { error }) => {
  return {
    ...state,
    getirBiTaksiOrders: {
      ...state.getirBiTaksiOrders,
      isPending: false,
      error,
    },
  };
};

export const createClientFeedbackFailure = (state, { error }) => {
  return {
    ...state,
    feedbacks: {
      ...state.feedbacks,
      isPending: false,
      error,
    },
  };
};

export const updateOrdersHistoryFiltersRequest = state => {
  return {
    ...state,
    ordersHistory: {
      ...state.ordersHistory,
      filters: { ...state.ordersHistory?.filters },
    },
  };
};

export const getClientForbiddenMatchesRequest = state => {
  return {
    ...state,
    forbiddenMatches: {
      ...state.forbiddenMatches,
      isPending: true,
    },
  };
};

export const updateOrdersHistoryFiltersSuccess = (state, { data }) => {
  return {
    ...state,
    ordersHistory: {
      ...state.ordersHistory,
      filters: {
        ...state.ordersHistory.filters,
        ...data,
        isPending: false,
      },
    },
  };
};

export const getClientForbiddenMatchesSuccess = (state, { data }) => {
  return {
    ...state,
    forbiddenMatches: {
      ...state.forbiddenMatches,
      data,
      isPending: false,
    },
  };
};

export const updateOrdersHistoryFiltersFailure = (state, { error }) => {
  return {
    ...state,
    ordersHistory: {
      ...state.ordersHistory,
      filters: {
        ...state.ordersHistory.filters,
        isPending: true,
        error,
      },
    },
  };
};

export const getClientForbiddenMatchesFailure = (state, { error }) => {
  return {
    ...state,
    forbiddenMatches: {
      ...state.forbiddenMatches,
      isPending: false,
      error,
    },
  };
};

export const updateClientForbiddenMatchRequest = state => {
  return {
    ...state,
    forbiddenMatches: {
      ...state.forbiddenMatches,
      isPending: true,
    },
  };
};

export const updateClientForbiddenMatchSuccess = (state, { data }) => {
  const forbiddenMatches = state.forbiddenMatches.data.map(forbiddenMatch => {
    if (forbiddenMatch._id !== data._id) return forbiddenMatch;
    return data;
  });
  return {
    ...state,
    forbiddenMatches: {
      ...state.forbiddenMatches,
      data: forbiddenMatches,
      isPending: false,
    },
  };
};

export const updateClientForbiddenMatchFailure = (state, { error }) => {
  return {
    ...state,
    forbiddenMatches: {
      ...state.forbiddenMatches,
      isPending: false,
      error,
    },
  };
};

export const getClientEligiblePromosRequest = state => {
  return {
    ...state,
    eligiblePromos: {
      ...state.eligiblePromos,
      isPending: true,
    },
  };
};

export const getClientEligiblePromosSuccess = (state, { data }) => {
  return {
    ...state,
    eligiblePromos: {
      ...state.eligiblePromos,
      data,
      isPending: false,
    },
  };
};

export const getClientEligiblePromosFailure = (state, { error }) => {
  return {
    ...state,
    eligiblePromos: {
      ...state.eligiblePromos,
      isPending: false,
      error,
    },
  };
};

export const getClientShownPromosRequest = state => {
  return {
    ...state,
    shownPromos: {
      ...state.shownPromos,
      isPending: true,
    },
  };
};

export const getClientShownPromosSuccess = (state, { data }) => {
  return {
    ...state,
    shownPromos: {
      ...state.shownPromos,
      data,
      isPending: false,
    },
  };
};

export const getClientShownPromosFailure = (state, { error }) => {
  return {
    ...state,
    shownPromos: {
      ...state.shownPromos,
      isPending: false,
      error,
    },
  };
};

export const getClientLoyaltyStampsRequest = state => {
  return {
    ...state,
    loyaltyStamps: {
      ...state.loyaltyStamps,
      isPending: true,
    },
  };
};

export const getClientLoyaltyStampsSuccess = (state, { data }) => {
  return {
    ...state,
    loyaltyStamps: {
      ...state.loyaltyStamps,
      data,
      isPending: false,
    },
  };
};

export const getClientLoyaltyStampsFailure = (state, { error }) => {
  return {
    ...state,
    loyaltyStamps: {
      ...state.loyaltyStamps,
      isPending: false,
      error,
    },
  };
};

export const validateActiveChatTokenRequest = state => {
  return {
    ...state,
    access: {
      ...state.access,
      activeChatToken: {
        ...state.access.activeChatToken,
        isValidationPending: true,
      },
    },
  };
};

export const validateActiveChatTokenSuccess = (state, { isValid }) => {
  return {
    ...state,
    access: {
      ...state.access,
      activeChatToken: {
        ...state.access.activeChatToken,
        isValid,
        isValidationPending: false,
      },
    },
  };
};

export const validateActiveChatTokenFailure = (state, { error }) => {
  return {
    ...state,
    access: {
      ...state.access,
      activeChatToken: {
        ...state.access.activeChatToken,
        isValid: false,
        isValidationPending: false,
        error,
      },
    },
  };
};

export const getGetirWaterMarketplaceOrdersRequest = state => {
  return {
    ...state,
    getirWaterMarketplaceOrders: {
      ...state.getirWaterMarketplaceOrders,
      isPending: true,
    },
  };
};

export const getGetirWaterMarketplaceOrdersSuccess = (state, { data, pagination }) => {
  return {
    ...state,
    getirWaterMarketplaceOrders: {
      ...state.getirWaterMarketplaceOrders,
      data,
      pagination,
      isPending: false,
    },
  };
};

export const getGetirWaterMarketplaceOrdersFailure = (state, { error }) => {
  return {
    ...state,
    getirWaterMarketplaceOrders: {
      ...state.getirWaterMarketplaceOrders,
      isPending: false,
      error,
    },
  };
};

export const getPaymentMethodsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    paymentMethods: {
      ...INITIAL_STATE.paymentMethods,
      isPending: true,
    },
  };
};

export const getPaymentMethodsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    paymentMethods: {
      ...INITIAL_STATE.paymentMethods,
      data,
      isPending: false,
    },
  };
};

export const getPaymentMethodsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    paymentMethods: {
      ...INITIAL_STATE.paymentMethods,
      isPending: false,
      error,
    },
  };
};

export const getClientDiscountWarnConfigRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    discountWarnAmounts: {
      ...INITIAL_STATE.discountWarnAmounts,
      isPending: true,
    },
  };
};

export const getClientDiscountWarnConfigFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    discountWarnAmounts: {
      ...INITIAL_STATE.discountWarnAmounts,
      isPending: false,
      error,
    },
  };
};

export const getClientDiscountWarnConfigSuccess = (state = INITIAL_STATE, { data = {} }) => {
  return {
    ...state,
    discountWarnAmounts: {
      ...INITIAL_STATE.discountWarnAmounts,
      isPending: false,
      data,
    },
  };
};

export const resetFilters = (state = INITIAL_STATE) => {
  return {
    ...state,
    filters: { ...INITIAL_STATE.filters },
  };
};

export const setFilterPage = (state = INITIAL_STATE, { page }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      page,
    },
  };
};

export const setFiltersPagePerRow = (state = INITIAL_STATE, { pagePerRow }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      count: pagePerRow,
    },
  };
};

export const setOrderStatus = (state = INITIAL_STATE, { status }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      status,
    },
  };
};

export const setDeliveryTypes = (state = INITIAL_STATE, { deliveryTypes }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      deliveryTypes,
    },
  };
};

export const setPaymentMethods = (state = INITIAL_STATE, { paymentMethods }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      paymentMethods,
    },
  };
};

export const setStartDate = (state = INITIAL_STATE, { startDate }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      startDate,
    },
  };
};

export const setEndDate = (state = INITIAL_STATE, { endDate }) => {
  return {
    ...state,
    filters: {
      ...state.filters,
      endDate,
    },
  };
};

export const getSubscriptionDetailsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    subscriptionDetails: {
      ...INITIAL_STATE.subscriptionDetails,
      isPending: true,
    },
  };
};

export const getSubscriptionDetailsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    subscriptionDetails: {
      ...INITIAL_STATE.subscriptionDetails,
      data,
      isPending: false,
    },
  };
};

export const getSubscriptionDetailsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    subscriptionDetails: {
      ...INITIAL_STATE.subscriptionDetails,
      isPending: false,
      error,
    },
  };
};

export const getTransactionDetailsRequest = (state = INITIAL_STATE) => {
  return {
    ...state,
    transactionDetails: {
      ...INITIAL_STATE.transactionDetails,
      isPending: true,
    },
  };
};

export const getTransactionDetailsSuccess = (state = INITIAL_STATE, { data }) => {
  return {
    ...state,
    transactionDetails: {
      ...INITIAL_STATE.transactionDetails,
      data,
      isPending: false,
    },
  };
};

export const getTransactionDetailsFailure = (state = INITIAL_STATE, { error }) => {
  return {
    ...state,
    transactionDetails: {
      ...INITIAL_STATE.transactionDetails,
      isPending: false,
      error,
    },
  };
};

export const getClientGetirTableOrdersRequest = state => {
  return {
    ...state,
    getirTableOrders: {
      ...state.getirTableOrders,
      isPending: true,
    },
  };
};

export const getClientGetirTableOrdersSuccess = (state, { data }) => {
  return {
    ...state,
    getirTableOrders: {
      ...state.getirTableOrders,
      data,
      isPending: false,
    },
  };
};

export const getClientGetirTableOrdersFailure = (state, { error }) => {
  return {
    ...state,
    getirTableOrders: {
      ...state.getirTableOrders,
      isPending: false,
      error,
    },
  };
};

export const getClientFinanceOrdersRequest = state => {
  return {
    ...state,
    financeOrders: {
      ...state.financeOrders,
      isPending: true,
    },
  };
};

export const getClientFinanceOrdersSuccess = (state, { data, totalCount }) => {
  return {
    ...state,
    financeOrders: {
      ...state.financeOrders,
      data,
      totalCount,
      isPending: false,
    },
  };
};

export const getClientFinanceOrdersFailure = (state, { error }) => {
  return {
    ...state,
    financeOrders: {
      ...state.financeOrders,
      isPending: false,
      error,
    },
  };
};

export const getClientStatusGetirJobsRequest = state => {
  return {
    ...state,
    getirJobsClientStatus: {
      ...state.getirJobsClientStatus,
      isPending: true,
    },
  };
};

export const getClientStatusGetirJobsSuccess = (state, { data }) => {
  return {
    ...state,
    getirJobsClientStatus: {
      ...state.getirJobsClientStatus,
      data,
      isPending: false,
    },
  };
};

export const getClientStatusGetirJobsFailure = (state, { error }) => {
  return {
    ...state,
    getirJobsClientStatus: {
      ...state.getirJobsClientStatus,
      isPending: false,
      error,
    },
  };
};

export const deleteClientGetirJobsRequest = state => {
  return {
    ...state,
    getirJobsClientDelete: {
      ...state.getirJobsClientDelete,
      isPending: true,
    },
  };
};

export const deleteClientGetirJobsSuccess = (state, { data }) => {
  return {
    ...state,
    getirJobsClientDelete: {
      ...state.getirJobsClientDelete,
      data,
      isPending: false,
    },
  };
};

export const deleteClientGetirJobsFailure = (state, { error }) => {
  return {
    ...state,
    getirJobsClientDelete: {
      ...state.getirJobsClientDelete,
      isPending: false,
      error,
    },
  };
};

export const destroy = () => {
  return { ...INITIAL_STATE };
};

export const HANDLERS = {
  [Types.GET_CLIENT_DETAIL_ACCESS_TOKEN_REQUEST]: getClientDetailAccessTokenRequest,
  [Types.GET_CLIENT_DETAIL_ACCESS_TOKEN_SUCCESS]: getClientDetailAccessTokenSuccess,
  [Types.GET_CLIENT_DETAIL_ACCESS_TOKEN_FAILURE]: getClientDetailAccessTokenFailure,
  [Types.UPDATE_CLIENT_DETAIL_ACCESS_TOKEN]: updateClientDetailAccessToken,

  [Types.SEND_OTP_REQUEST]: sendOtpRequest,
  [Types.SEND_OTP_SUCCESS]: sendOtpSuccess,
  [Types.SEND_OTP_FAILURE]: sendOtpFailure,

  [Types.CHECK_OTP_REQUEST]: checkOtpRequest,
  [Types.CHECK_OTP_SUCCESS]: checkOtpSuccess,
  [Types.CHECK_OTP_FAILURE]: checkOtpFailure,

  [Types.GET_CLIENT_REQUEST]: getClientRequest,
  [Types.GET_CLIENT_SUCCESS]: getClientSuccess,
  [Types.GET_CLIENT_FAILURE]: getClientFailure,

  [Types.GET_SEGMENTS_OF_CLIENT_REQUEST]: getSegmentsOfClientRequest,
  [Types.GET_SEGMENTS_OF_CLIENT_SUCCESS]: getSegmentsOfClientSuccess,
  [Types.GET_SEGMENTS_OF_CLIENT_FAILURE]: getSegmentsOfClientFailure,

  [Types.GET_CLIENT_NOTES_REQUEST]: getClientNotesRequest,
  [Types.GET_CLIENT_NOTES_SUCCESS]: getClientNotesSuccess,
  [Types.GET_CLIENT_NOTES_FAILURE]: getClientNotesFailure,

  [Types.CREATE_CLIENT_NOTE_REQUEST]: createClientNoteRequest,
  [Types.CREATE_CLIENT_NOTE_SUCCESS]: createClientNoteSuccess,
  [Types.CREATE_CLIENT_NOTE_FAILURE]: createClientNoteFailure,

  [Types.UPDATE_CLIENT_NOTE_REQUEST]: updateClientNoteRequest,
  [Types.UPDATE_CLIENT_NOTE_SUCCESS]: updateClientNoteSuccess,
  [Types.UPDATE_CLIENT_NOTE_FAILURE]: updateClientNoteFailure,

  [Types.GET_CLIENT_MARKETING_COMMUNICATION_PREFERENCES_REQUEST]: getClientMarketingCommunicationPreferencesRequest,
  [Types.GET_CLIENT_MARKETING_COMMUNICATION_PREFERENCES_SUCCESS]: getClientMarketingCommunicationPreferencesSuccess,
  [Types.GET_CLIENT_MARKETING_COMMUNICATION_PREFERENCES_FAILURE]: getClientMarketingCommunicationPreferencesFailure,

  [Types.UPDATE_CLIENT_MARKETING_COMMUNICATION_PREFERENCES_REQUEST]: updateClientMarketingCommunicationPreferencesRequest,
  [Types.UPDATE_CLIENT_MARKETING_COMMUNICATION_PREFERENCES_SUCCESS]: updateClientMarketingCommunicationPreferencesSuccess,
  [Types.UPDATE_CLIENT_MARKETING_COMMUNICATION_PREFERENCES_FAILURE]: updateClientMarketingCommunicationPreferencesFailure,

  [Types.GET_CLIENT_NOTES_REQUEST]: getClientNotesRequest,
  [Types.GET_CLIENT_NOTES_SUCCESS]: getClientNotesSuccess,
  [Types.GET_CLIENT_NOTES_FAILURE]: getClientNotesFailure,

  [Types.GET_CLIENT_DISCOUNTS_REQUEST]: getClientDiscountsRequest,
  [Types.GET_CLIENT_DISCOUNTS_SUCCESS]: getClientDiscountsSuccess,
  [Types.GET_CLIENT_DISCOUNTS_FAILURE]: getClientDiscountsFailure,

  [Types.GET_ORDERS_HISTORY_REQUEST]: getOrdersHistoryRequest,
  [Types.GET_ORDERS_HISTORY_SUCCESS]: getOrdersHistorySuccess,
  [Types.GET_ORDERS_HISTORY_FAILURE]: getOrdersHistoryFailure,

  [Types.UPDATE_ORDERS_HISTORY_FILTERS_REQUEST]: updateOrdersHistoryFiltersRequest,
  [Types.UPDATE_ORDERS_HISTORY_FILTERS_SUCCESS]: updateOrdersHistoryFiltersSuccess,
  [Types.UPDATE_ORDERS_HISTORY_FILTERS_FAILURE]: updateOrdersHistoryFiltersFailure,

  [Types.GET_FOOD_ORDERS_REQUEST]: getFoodOrdersRequest,
  [Types.GET_FOOD_ORDERS_SUCCESS]: getFoodOrdersSuccess,
  [Types.GET_FOOD_ORDERS_FAILURE]: getFoodOrdersFailure,

  [Types.GET_LOCALS_ORDERS_REQUEST]: getLocalsOrdersRequest,
  [Types.GET_LOCALS_ORDERS_SUCCESS]: getLocalsOrdersSuccess,
  [Types.GET_LOCALS_ORDERS_FAILURE]: getLocalsOrdersFailure,

  [Types.GET_GETIR_BI_TAKSI_ORDERS_REQUEST]: getGetirBiTaksiOrdersRequest,
  [Types.GET_GETIR_BI_TAKSI_ORDERS_SUCCESS]: getGetirBiTaksiOrdersSuccess,
  [Types.GET_GETIR_BI_TAKSI_ORDERS_FAILURE]: getGetirBiTaksiOrdersFailure,

  [Types.GET_CLIENT_DEVICES_REQUEST]: getClientDevicesRequest,
  [Types.GET_CLIENT_DEVICES_SUCCESS]: getClientDevicesSuccess,
  [Types.GET_CLIENT_DEVICES_FAILURE]: getClientDevicesFailure,

  [Types.BLOCK_CLIENT_DEVICE_REQUEST]: blockClientDeviceRequest,
  [Types.BLOCK_CLIENT_DEVICE_SUCCESS]: blockClientDeviceSuccess,
  [Types.BLOCK_CLIENT_DEVICE_FAILURE]: blockClientDeviceFailure,

  [Types.UNBLOCK_CLIENT_DEVICE_REQUEST]: unblockClientDeviceRequest,
  [Types.UNBLOCK_CLIENT_DEVICE_SUCCESS]: unblockClientDeviceSuccess,
  [Types.UNBLOCK_CLIENT_DEVICE_FAILURE]: unblockClientDeviceFailure,

  [Types.LOGOUT_FROM_ALL_CLIENT_DEVICES_REQUEST]: logoutFromAllClientDevicesRequest,
  [Types.LOGOUT_FROM_ALL_CLIENT_DEVICES_SUCCESS]: logoutFromAllClientDevicesSuccess,
  [Types.LOGOUT_FROM_ALL_CLIENT_DEVICES_FAILURE]: logoutFromAllClientDevicesFailure,

  [Types.LOGOUT_CLIENT_DEVICE_REQUEST]: logoutClientDeviceRequest,
  [Types.LOGOUT_CLIENT_DEVICE_SUCCESS]: logoutClientDeviceSuccess,
  [Types.LOGOUT_CLIENT_DEVICE_FAILURE]: logoutClientDeviceFailure,

  [Types.GET_CLIENT_FEEDBACKS_REQUEST]: getClientFeedbacksRequest,
  [Types.GET_CLIENT_FEEDBACKS_SUCCESS]: getClientFeedbacksSuccess,
  [Types.GET_CLIENT_FEEDBACKS_FAILURE]: getClientFeedbacksFailure,

  [Types.CREATE_CLIENT_FEEDBACK_REQUEST]: createClientFeedbackRequest,
  [Types.CREATE_CLIENT_FEEDBACK_SUCCESS]: createClientFeedbackSuccess,
  [Types.CREATE_CLIENT_FEEDBACK_FAILURE]: createClientFeedbackFailure,

  [Types.RESOLVE_CLIENT_FEEDBACK_REQUEST]: resolveClientFeedbackRequest,
  [Types.RESOLVE_CLIENT_FEEDBACK_SUCCESS]: resolveClientFeedbackSuccess,
  [Types.RESOLVE_CLIENT_FEEDBACK_FAILURE]: resolveClientFeedbackFailure,

  [Types.GET_CLIENT_FORBIDDEN_MATCHES_REQUEST]: getClientForbiddenMatchesRequest,
  [Types.GET_CLIENT_FORBIDDEN_MATCHES_SUCCESS]: getClientForbiddenMatchesSuccess,
  [Types.GET_CLIENT_FORBIDDEN_MATCHES_FAILURE]: getClientForbiddenMatchesFailure,

  [Types.UPDATE_CLIENT_FORBIDDEN_MATCH_REQUEST]: updateClientForbiddenMatchRequest,
  [Types.UPDATE_CLIENT_FORBIDDEN_MATCH_SUCCESS]: updateClientForbiddenMatchSuccess,
  [Types.UPDATE_CLIENT_FORBIDDEN_MATCH_FAILURE]: updateClientForbiddenMatchFailure,

  [Types.UPDATE_CONTACT_NUMBER_REQUEST]: updateContactNumberRequest,
  [Types.UPDATE_CONTACT_NUMBER_SUCCESS]: updateContactNumberSuccess,
  [Types.UPDATE_CONTACT_NUMBER_FAILURE]: updateContactNumberFailure,

  [Types.CLOSE_CLIENT_ACCOUNT_REQUEST]: closeClientAccountRequest,
  [Types.CLOSE_CLIENT_ACCOUNT_SUCCESS]: closeClientAccountSuccess,
  [Types.CLOSE_CLIENT_ACCOUNT_FAILURE]: closeClientAccountFailure,

  [Types.REOPEN_CLIENT_ACCOUNT_REQUEST]: reopenClientAccountRequest,
  [Types.REOPEN_CLIENT_ACCOUNT_SUCCESS]: reopenClientAccountSuccess,
  [Types.REOPEN_CLIENT_ACCOUNT_FAILURE]: reopenClientAccountFailure,

  [Types.ANONYMISE_CLIENT_ACCOUNT_REQUEST]: anonymiseClientAccountRequest,
  [Types.ANONYMISE_CLIENT_ACCOUNT_SUCCESS]: anonymiseClientAccountSuccess,
  [Types.ANONYMISE_CLIENT_ACCOUNT_FAILURE]: anonymiseClientAccountFailure,

  [Types.UNLINK_FACEBOOK_REQUEST]: unlinkFacebookRequest,
  [Types.UNLINK_FACEBOOK_SUCCESS]: unlinkFacebookSuccess,
  [Types.UNLINK_FACEBOOK_FAILURE]: unlinkFacebookFailure,

  [Types.GET_CLIENT_ELIGIBLE_PROMOS_REQUEST]: getClientEligiblePromosRequest,
  [Types.GET_CLIENT_ELIGIBLE_PROMOS_SUCCESS]: getClientEligiblePromosSuccess,
  [Types.GET_CLIENT_ELIGIBLE_PROMOS_FAILURE]: getClientEligiblePromosFailure,

  [Types.GET_CLIENT_SHOWN_PROMOS_REQUEST]: getClientShownPromosRequest,
  [Types.GET_CLIENT_SHOWN_PROMOS_SUCCESS]: getClientShownPromosSuccess,
  [Types.GET_CLIENT_SHOWN_PROMOS_FAILURE]: getClientShownPromosFailure,

  [Types.GET_CLIENT_LOYALTY_STAMPS_REQUEST]: getClientLoyaltyStampsRequest,
  [Types.GET_CLIENT_LOYALTY_STAMPS_SUCCESS]: getClientLoyaltyStampsSuccess,
  [Types.GET_CLIENT_LOYALTY_STAMPS_FAILURE]: getClientLoyaltyStampsFailure,

  [Types.VALIDATE_ACTIVE_CHAT_TOKEN_REQUEST]: validateActiveChatTokenRequest,
  [Types.VALIDATE_ACTIVE_CHAT_TOKEN_SUCCESS]: validateActiveChatTokenSuccess,
  [Types.VALIDATE_ACTIVE_CHAT_TOKEN_SUCCESS]: validateActiveChatTokenFailure,

  [Types.GET_GETIR_WATER_MARKETPLACE_ORDERS_REQUEST]: getGetirWaterMarketplaceOrdersRequest,
  [Types.GET_GETIR_WATER_MARKETPLACE_ORDERS_SUCCESS]: getGetirWaterMarketplaceOrdersSuccess,
  [Types.GET_GETIR_WATER_MARKETPLACE_ORDERS_FAILURE]: getGetirWaterMarketplaceOrdersFailure,

  [Types.GET_PAYMENT_METHODS_REQUEST]: getPaymentMethodsRequest,
  [Types.GET_PAYMENT_METHODS_SUCCESS]: getPaymentMethodsSuccess,
  [Types.GET_PAYMENT_METHODS_FAILURE]: getPaymentMethodsFailure,

  [Types.GET_SUBSCRIPTION_DETAILS_REQUEST]: getSubscriptionDetailsRequest,
  [Types.GET_SUBSCRIPTION_DETAILS_SUCCESS]: getSubscriptionDetailsSuccess,
  [Types.GET_SUBSCRIPTION_DETAILS_FAILURE]: getSubscriptionDetailsFailure,

  [Types.GET_TRANSACTION_DETAILS_REQUEST]: getTransactionDetailsRequest,
  [Types.GET_TRANSACTION_DETAILS_SUCCESS]: getTransactionDetailsSuccess,
  [Types.GET_TRANSACTION_DETAILS_FAILURE]: getTransactionDetailsFailure,

  [Types.GET_CLIENT_DISCOUNT_WARN_CONFIG_REQUEST]: getClientDiscountWarnConfigRequest,
  [Types.GET_CLIENT_DISCOUNT_WARN_CONFIG_SUCCESS]: getClientDiscountWarnConfigSuccess,
  [Types.GET_CLIENT_DISCOUNT_WARN_CONFIG_FAILURE]: getClientDiscountWarnConfigFailure,

  // Filter setters
  [Types.RESET_FILTERS]: resetFilters,
  [Types.SET_FILTERS_PAGE]: setFilterPage,
  [Types.SET_FILTERS_PAGE_PER_ROW]: setFiltersPagePerRow,
  [Types.SET_ORDER_STATUS]: setOrderStatus,
  [Types.SET_DELIVERY_TYPES]: setDeliveryTypes,
  [Types.SET_PAYMENT_METHODS]: setPaymentMethods,
  [Types.SET_START_DATE]: setStartDate,
  [Types.SET_END_DATE]: setEndDate,

  [Types.GET_CLIENT_GETIR_TABLE_ORDERS_REQUEST]: getClientGetirTableOrdersRequest,
  [Types.GET_CLIENT_GETIR_TABLE_ORDERS_SUCCESS]: getClientGetirTableOrdersSuccess,
  [Types.GET_CLIENT_GETIR_TABLE_ORDERS_FAILURE]: getClientGetirTableOrdersFailure,

  [Types.GET_CLIENT_FINANCE_ORDERS_REQUEST]: getClientFinanceOrdersRequest,
  [Types.GET_CLIENT_FINANCE_ORDERS_SUCCESS]: getClientFinanceOrdersSuccess,
  [Types.GET_CLIENT_FINANCE_ORDERS_FAILURE]: getClientFinanceOrdersFailure,

  [Types.GET_CLIENT_STATUS_GETIR_JOBS_REQUEST]: getClientStatusGetirJobsRequest,
  [Types.GET_CLIENT_STATUS_GETIR_JOBS_SUCCESS]: getClientStatusGetirJobsSuccess,
  [Types.GET_CLIENT_STATUS_GETIR_JOBS_FAILURE]: getClientStatusGetirJobsFailure,

  [Types.DELETE_CLIENT_GETIR_JOBS_REQUEST]: deleteClientGetirJobsRequest,
  [Types.DELETE_CLIENT_GETIR_JOBS_SUCCESS]: deleteClientGetirJobsSuccess,
  [Types.DELETE_CLIENT_GETIR_JOBS_FAILURE]: deleteClientGetirJobsFailure,

  [Types.DESTROY_PAGE]: destroy,
};

export default createReducer(INITIAL_STATE, HANDLERS);
