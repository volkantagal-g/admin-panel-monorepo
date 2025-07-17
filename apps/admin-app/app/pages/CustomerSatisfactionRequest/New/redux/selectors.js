import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.CUSTOMER_SATISFACTION_REQUEST.NEW;

export const createCustomerSatisfactionRequestSelector = {
  getIsPending: state => state[reduxKey]?.createCustomerSatisfactionRequest?.isPending,
  getData: state => state[reduxKey]?.createCustomerSatisfactionRequest?.data,
  getIsFilterProductsPending: state => state[reduxKey]?.filterProducts?.isPending,
  getProductsData: state => state[reduxKey]?.filterProducts?.data,
  getProductsTotal: state => state[reduxKey]?.filterProducts?.total,

  getIsSuccess: state => state[reduxKey]?.createCustomerSatisfactionRequest?.data,
};
