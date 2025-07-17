import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.USER.EXTERNAL_CUSTOMER_SERVICES_PANEL_ACCOUNT_MANAGEMENT}_`;

export const { Types, Creators } = createActions({
  bulkInactivateExternalCustomerServicesAccountsRequest: { mailAddressList: null },
  bulkInactivateExternalCustomerServicesAccountsSuccess: { data: [] },
  bulkInactivateExternalCustomerServicesAccountsFailure: { error: null },
  bulkCreateTeleperformanceUsersRequest: { t: {}, users: [] },
  bulkCreateTeleperformanceUsersSuccess: { data: [] },
  bulkCreateTeleperformanceUsersFailure: { error: null },
  bulkCreateConcentrixUsersTurkeyRequest: { t: {}, users: [] },
  bulkCreateConcentrixUsersTurkeySuccess: { data: [] },
  bulkCreateConcentrixUsersTurkeyFailure: { error: null },
  bulkCreateAssisttUsersRequest: { t: {}, users: [] },
  bulkCreateAssisttUsersSuccess: { data: [] },
  bulkCreateAssisttUsersFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
