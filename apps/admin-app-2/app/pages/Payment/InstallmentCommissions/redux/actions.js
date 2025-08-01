import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { INIT_FILTERS } from '../constants';

const prefix = `${REDUX_KEY.INSTALLMENT_COMMISSIONS}_`;

export const { Types, Creators } = createActions({
  getCardInstallmentCountsRequest: {
    installmentCount: null,
    posIca: null,
    status: null,
  },
  getCardInstallmentCountsSuccess: { data: null },
  getCardInstallmentCountsFailure: { error: null },

  updateLocalInstallmentDataRequest: { updatedInstallments: null },

  setInitialCardInstallmentCounts: { data: null },

  updateCardInstallmentCountsRequest: {
    version: null,
    cardUserType: null,
    installments: null,
  },
  updateCardInstallmentCountsSuccess: { data: null },
  updateCardInstallmentCountsFailure: { error: null },

  setFilters: { filters: {} },
  resetFilters: {},

  setPagination: { currentPage: INIT_FILTERS.currentPage, rowsPerPage: INIT_FILTERS.rowsPerPage },

  updateCardUserTypeTabRequest: { cardUserType: 'PERSONAL' },
  updateCardUserTypeTabSuccess: { data: 'PERSONAL' },

  initPage: null,
  destroyPage: null,
}, { prefix });
