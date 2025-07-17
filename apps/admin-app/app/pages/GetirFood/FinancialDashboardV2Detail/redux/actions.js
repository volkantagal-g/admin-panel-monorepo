import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { TAB_ITEMS } from '../constants';

const prefix = `${REDUX_KEY.FOOD.FINANCIAL_DASHBOARD_V2_DETAIL}_`;

export const { Types, Creators } = createActions({
  getPaymentDetailsRequest: {
    activeTab: TAB_ITEMS.SINGLE,
    deferredPaymentDate: undefined,
    currentPage: 1,
    rowsPerPage: 10,
    id: undefined,
    isChain: undefined,
  },
  getPaymentDetailsSuccess: { data: {} },
  getPaymentDetailsFailure: { error: null },
  exportPaymentDetailExcelRequest: { deferredPaymentDate: null, isChain: null, id: null },
  exportPaymentDetailExcelSuccess: { data: {} },
  exportPaymentDetailExcelFailure: { error: null },
  initPage: null,
  destroyPage: null,
}, { prefix });
