import { REDUX_KEY } from '@shared/shared/constants';

const reduxKey = REDUX_KEY.USER.EXTERNAL_CUSTOMER_SERVICES_PANEL_ACCOUNT_MANAGEMENT;

export const bulkInactivateExternalCustomerServicesAccountsSelector = {
  getIsPending: state => state[reduxKey]?.bulkInactivateExternalCustomerServicesAccounts?.isPending,
  getIsRequested: state => state[reduxKey]?.bulkInactivateExternalCustomerServicesAccounts?.isRequested,
  getData: state => state[reduxKey]?.bulkInactivateExternalCustomerServicesAccounts?.data,
  getError: state => state[reduxKey]?.bulkInactivateExternalCustomerServicesAccounts?.error,
};

export const bulkCreateTeleperformanceUsersSelector = {
  getIsPending: state => state[reduxKey]?.bulkCreateTeleperformanceUsers?.isPending,
  getIsRequested: state => state[reduxKey]?.bulkCreateTeleperformanceUsers?.isRequested,
  getData: state => state[reduxKey]?.bulkCreateTeleperformanceUsers?.data,
  getError: state => state[reduxKey]?.bulkCreateTeleperformanceUsers?.error,
};

export const bulkCreateConcentrixUsersTurkeySelector = {
  getIsPending: state => state[reduxKey]?.bulkCreateConcentrixUsersTurkey?.isPending,
  getIsRequested: state => state[reduxKey]?.bulkCreateConcentrixUsersTurkey?.isRequested,
  getData: state => state[reduxKey]?.bulkCreateConcentrixUsersTurkey?.data,
  getError: state => state[reduxKey]?.bulkCreateConcentrixUsersTurkey?.error,
};

export const bulkCreateAssisttUsersSelector = {
  getIsPending: state => state[reduxKey]?.bulkCreateAssisttUsers?.isPending,
  getIsRequested: state => state[reduxKey]?.bulkCreateAssisttUsers?.isRequested,
  getData: state => state[reduxKey]?.bulkCreateAssisttUsers?.data,
  getError: state => state[reduxKey]?.bulkCreateAssisttUsers?.error,
};
