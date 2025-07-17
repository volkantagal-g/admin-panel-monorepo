import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.FOOD.FINANCIAL_CONFIGS;

export const financialConfigsSelector = {
  getVerticals: state => state?.[reducerKey]?.financialConfigsVerticals?.data,
  getIsPendingVerticals: state => state?.[reducerKey]?.financialConfigsVerticals.isPending,
  getDomainsByVertical: state => state?.[reducerKey]?.financialConfigsDomainsByVertical?.data,
  getIsPendingDomainsByVertical: state => state?.[reducerKey]?.financialConfigsDomainsByVertical.isPending,
  getDomain: state => state?.[reducerKey]?.financialConfigsDomain?.data,
  getIsPendingDomain: state => state?.[reducerKey]?.financialConfigsDomain.isPending,
  getIsPendingUpdateFinancialConfigValues: state => state?.[reducerKey]?.updateFinancialConfigValues.isPending,
};
