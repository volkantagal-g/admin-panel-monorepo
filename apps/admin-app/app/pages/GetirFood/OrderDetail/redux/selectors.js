import { createSelector } from 'reselect';
import { find } from 'lodash';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FOOD_ORDER.DETAIL;

export const basketDetailSelector = {
  getData: state => state?.[reducerKey]?.basketDetail?.data,
  getIsPending: state => state?.[reducerKey]?.basketDetail?.isPending,
};

export const orderDetailSelector = {
  getData: state => state?.[reducerKey]?.orderDetail?.data,
  getIsPending: state => state?.[reducerKey]?.orderDetail?.isPending,
};

export const courierRouteSelector = {
  getData: state => state?.[reducerKey]?.courierRoute?.data,
  getIsPending: state => state?.[reducerKey]?.courierRoute?.isPending,
  getError: state => state?.[reducerKey]?.courierRoute?.error,
};

export const orderCancelOptionSelector = {
  getData: state => state?.[reducerKey]?.orderCancelOption?.data,
  getIsPending: state => state?.[reducerKey]?.orderCancelOption?.isPending,
};

export const orderCancelSelector = { getIsPending: state => state?.[reducerKey]?.orderCancel?.isPending };

export const financialInfoSelector = {
  getData: state => state?.[reducerKey]?.financial?.data,
  getIsPending: state => state?.[reducerKey]?.financial?.isPending,
};

export const orderChangeOptionsSelector = {
  getData: state => state?.[reducerKey]?.orderChangeOptions?.data,
  getIsPending: state => state?.[reducerKey]?.orderChangeOptions?.getIsPending,
};

export const availableChangeTypesSelector = {
  getData: createSelector(
    state => state?.[reducerKey],
    ({ availableChangeTypes, orderChangeOptions }) => {
      const modifiedAvailableChangeTypes = { ...availableChangeTypes.data };
      if (modifiedAvailableChangeTypes) {
        const getChainOption = find(orderChangeOptions.data, { id: modifiedAvailableChangeTypes.changeTypeId });

        if (getChainOption) {
          modifiedAvailableChangeTypes.changeReason = `(${getChainOption.title}) ${getChainOption.message}`;
        }
      }
      return modifiedAvailableChangeTypes;
    },
  ),
  getIsPending: state => state?.[reducerKey]?.availableChangeTypes?.getIsPending,
};

export const addChangeReasonAtOrderSelector = { getIsPending: state => state?.[reducerKey]?.addChangeReasonAtOrder?.getIsPending };

export const updateChangeReasonAtOrderSelector = { getIsPending: state => state?.[reducerKey]?.updateChangeReasonAtOrder?.getIsPending };

export const getMainReasonsSelector = {
  getData: state => state?.[reducerKey]?.getMainReasons?.data,
  getIsPending: state => state?.[reducerKey]?.getMainReasons?.isPending,
};

export const getSubReasonsSelector = {
  getData: state => state?.[reducerKey]?.getSubReasons?.data,
  getIsPending: state => state?.[reducerKey]?.getSubReasons?.isPending,
};

export const getSubReasonSelector = {
  getData: state => state?.[reducerKey]?.getSubReason?.data,
  getIsPending: state => state?.[reducerKey]?.getSubReason?.isPending,
};

export const getRefundSourcesSelector = { getData: state => state?.[reducerKey]?.getRefundSources?.data };

export const getClientTrustScoreSelector = {
  getData: state => state?.[reducerKey]?.getClientTrustScore?.data,
  getIsPending: state => state?.[reducerKey]?.getClientTrustScore?.isPending,
};

export const productsSelector = {
  getData: createSelector(
    state => state?.[reducerKey]?.orderDetail?.data,
    orderDetail => {
      const result = orderDetail?.products?.reduce((prev, curr) => {
        const products = [];
        for (let i = 0; i < curr.count; i++) {
          products.push({ ...curr, index: i });
        }
        return [...prev, ...products];
      }, []);
      return result;
    },
  ),
};

export const setInquirySelector = { getIsPending: state => state?.[reducerKey]?.setInquiry?.isPending };

export const getUserByIdSelector = {
  getData: state => state?.[reducerKey]?.getUserById?.data,
  getIsPending: state => state?.[reducerKey]?.getUserById?.isPending,
};

export const getOrderInsightInquirySelector = {
  getData: state => state?.[reducerKey]?.orderInsightInquiry?.data,
  getIsPending: state => state?.[reducerKey]?.orderInsightInquiry?.isPending,
};

export const getOrderNoteSelector = {
  getData: state => state?.[reducerKey]?.orderNotes?.data,
  getIsPending: state => state?.[reducerKey]?.orderNotes?.isPending,
};

export const createOrderNoteSelector = {
  getData: state => state?.[reducerKey]?.createOrderNote?.data,
  getIsPending: state => state?.[reducerKey]?.createOrderNote?.isPending,
};

export const createForbiddenMatchSelector = {
  getData: state => state?.[reducerKey]?.forbiddenMatch?.data,
  getIsPending: state => state?.[reducerKey]?.forbiddenMatch?.isPending,
};

export const orderCourierJsonSelector = {
  getData: state => state?.[reducerKey]?.orderCourierJson?.data,
  getIsPending: state => state?.[reducerKey]?.orderCourierJson?.isPending,
};

export const orderFinancialsSelector = {
  getData: state => state?.[reducerKey]?.orderFinancials?.data,
  getIsPending: state => state?.[reducerKey]?.orderFinancials?.isPending,
};

export const agreementDataSelector = {
  getData: state => state?.[reducerKey]?.agreementData?.data,
  getIsPending: state => state?.[reducerKey]?.agreementData?.isPending,
};
