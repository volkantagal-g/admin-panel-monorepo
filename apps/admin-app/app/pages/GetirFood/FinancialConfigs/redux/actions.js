import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.FOOD.FINANCIAL_CONFIGS}_`;

export const { Types, Creators } = createActions({
  getFinancialConfigsVerticalsRequest: { },
  getFinancialConfigsVerticalsSuccess: { data: {} },
  getFinancialConfigsVerticalsFailure: { error: null },
  getFinancialConfigsDomainsByVerticalRequest: { vertical: null },
  getFinancialConfigsDomainsByVerticalSuccess: { data: {} },
  getFinancialConfigsDomainsByVerticalFailure: { error: null },
  getFinancialConfigsDomainRequest: { vertical: null, domain: null },
  getFinancialConfigsDomainSuccess: { data: {} },
  getFinancialConfigsDomainFailure: { error: null },
  updateFinancialConfigValuesRequest: { updateConfigRequests: [] },
  updateFinancialConfigValuesSuccess: { data: null },
  updateFinancialConfigValuesFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
