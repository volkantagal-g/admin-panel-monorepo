import { GETIR_10_DOMAIN_TYPE, REDUX_KEY } from '@shared/shared/constants';

const REDUCER_KEY = REDUX_KEY.MARKET_ORDER_ANALYTICS.FRAUD_SUSPICION_ORDERS;
export const DOMAIN_TYPE_LOCAL_STORAGE_KEY = `${REDUCER_KEY}_selectedDomainType`;

export const getSelectedDomainTypeFromLocalStorage = () => {
  const result = JSON.parse(localStorage.getItem(DOMAIN_TYPE_LOCAL_STORAGE_KEY));
  return result || GETIR_10_DOMAIN_TYPE;
};

export const setSelectedDomainTypeToLocalStorage = domainType => {
  localStorage.setItem(DOMAIN_TYPE_LOCAL_STORAGE_KEY, JSON.stringify(domainType));
};
