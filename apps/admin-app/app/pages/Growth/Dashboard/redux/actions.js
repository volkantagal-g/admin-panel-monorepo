import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

export const { Types, Creators } = createActions(
  {
    getRawDataByDateAndTypeRequest: { data: {}, requestType: null },
    getRawDataByDateAndTypeSuccess: { data: {}, requestType: null },
    getRawDataByDateAndTypeFailure: { error: null, requestType: null },

    getOrderCountsRequest: { data: {}, timestamps: null },
    getOrderCountsSuccess: { data: {} },
    getOrderCountsFailure: { error: null },

    getMissedOrderCountsRequest: { data: {}, timestamps: null },
    getMissedOrderCountsSuccess: { data: {} },
    getMissedOrderCountsFailure: { error: null },

    getNetRevenuesRequest: { data: {}, timestamps: null },
    getNetRevenuesSuccess: { data: {} },
    getNetRevenuesFailure: { error: null },

    getOrderCountsOfDeliveryTypesRequest: { data: {}, requestDomain: null, timestamps: null },
    getOrderCountsOfDeliveryTypesSuccess: { data: {}, requestDomain: null },
    getOrderCountsOfDeliveryTypesFailure: { error: null, requestDomain: null },

    getMissedOrderCountsOfDeliveryTypesRequest: { data: {}, requestDomain: null, timestamps: null },
    getMissedOrderCountsOfDeliveryTypesSuccess: { data: {}, requestDomain: null },
    getMissedOrderCountsOfDeliveryTypesFailure: { error: null, requestDomain: null },

    getNetRevenuesOfDeliveryTypesRequest: { data: {}, requestDomain: null, timestamps: null },
    getNetRevenuesOfDeliveryTypesSuccess: { data: {}, requestDomain: null },
    getNetRevenuesOfDeliveryTypesFailure: { error: null, requestDomain: null },

    getConfigWKeyRequest: { body: { key: null, type: null } },
    getConfigWKeySuccess: { data: {} },
    getConfigWKeyFailure: { error: null },

    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.GROWTH.DAILY_DASHBOARD}_` },
);
