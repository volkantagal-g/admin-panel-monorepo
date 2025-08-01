import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.INSTALLMENT_COMMISSIONS;

export const cardInstallmentCountsSelector = {
  getIsPending: state => state[reduxKey]?.cardInstallmentCounts?.isPending,
  getFilteredInstallments: state => {
    const installments = state[reduxKey]?.cardInstallmentCounts?.data?.installments;
    return installments?.filter(item => item?.operation !== 'deleted');
  },
  getPosBankList: state => state[reduxKey]?.cardInstallmentCounts?.data?.posBankList,
  getVersion: state => state[reduxKey]?.cardInstallmentCounts?.data?.version,
  getData: state => state[reduxKey]?.cardInstallmentCounts?.data,
  getCardUserType: state => state[reduxKey]?.cardInstallmentCounts?.data?.cardUserType,
  getModifiedInstallments: state => {
    const installments = state[reduxKey]?.cardInstallmentCounts?.data?.installments;
    return installments?.filter(item => item?.operation);
  },
  getInstallments: state => state[reduxKey]?.cardInstallmentCounts?.data?.installments,
  getInitialInstallments: state => state[reduxKey]?.initialCardInstallmentCounts?.data?.installments,
};

export const updateCardInstallmentCountsSelector = { getIsPending: state => state[reduxKey]?.updateCardInstallmentCounts?.isPending };

export const filtersSelector = { getFilters: state => state[reduxKey]?.filters };

export const getPagination = createSelector(
  state => state?.[reduxKey].pagination,
  data => {
    return data;
  },
);

export const cardUserTypeSelector = { getCardUserType: state => state[reduxKey]?.cardUserType?.data };
