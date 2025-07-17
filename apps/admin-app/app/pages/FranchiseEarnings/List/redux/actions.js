import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.FRANCHISE_EARNINGS.LIST}_`;
export const { Types, Creators } = createActions({
  getEarningsRequest: { financialMonths: [], franchises: [], warehouses: [] },
  getEarningsSuccess: { data: [], warehouses: [] },
  getEarningsFailure: { error: null },
  getVoyagerEarningsRequest: { financialMonths: [], franchises: [], warehouses: [] },
  getVoyagerEarningsSuccess: { data: [], warehouses: [] },
  getVoyagerEarningsFailure: { error: null },
  changeTaxType: { taxType: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
