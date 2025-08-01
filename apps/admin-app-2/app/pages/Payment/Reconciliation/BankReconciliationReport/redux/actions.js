import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { INIT_FILTERS_ORDER, INIT_FILTERS_TRANSACTION } from '../constants';

export const { Types, Creators } = createActions(
  {
    getReconciliationsRequest: {},
    getReconciliationsSuccess: { data: [] },
    getReconciliationsFailure: { error: null },

    setSelectedRows: { selectedRows: [] },
    setOrderPagination: { page: INIT_FILTERS_ORDER.page, pageSize: INIT_FILTERS_ORDER.pageSize },
    submitOrderFilters: { filters: INIT_FILTERS_ORDER },

    refundsTransactionRequest: { filters: null, orderIds: [], basketIds: [] },
    refundsTransactionSuccess: { data: [] },
    refundsTransactionFailure: { error: null },

    manualRefundRequest: { eventDetailsToSend: [] },
    manualRefundSuccess: { data: [] },
    manualRefundFailure: { error: null },

    exportCsvRequest: {
      orderIds: null,
      transactionIds: null,
      checkoutStartDate: null,
      externalPaymentTokens: null,
      checkoutEndDate: null,
      reconciliationCheckStartDate: null,
      reconciliationCheckEndDate: null,
      domainTypes: null,
      sourceOfStatements: null,
      isRefundable: false,
      refundStatus: null,
      orderStatus: null,
      basketIds: null,
      t: null, // needs for excel columns translation
    },
    exportCsvSuccess: { data: [] },
    exportCsvFailure: { error: null },

    getTransactionReconciliationsRequest: {},
    getTransactionReconciliationsSuccess: { data: [] },
    getTransactionReconciliationsFailure: { error: null },

    setTransactionPagination: { page: INIT_FILTERS_TRANSACTION.page, pageSize: INIT_FILTERS_TRANSACTION.pageSize },
    submitTransactionFilters: { filters: INIT_FILTERS_TRANSACTION },

    driveExportCsvRequest: {
      rentId: null,
      originalTransactionId: null,
      isReconciled: null,
      transactionStartDate: null,
      transactionEndDate: null,
      checkStartDate: null,
      checkEndDate: null,
      t: null, // needs for excel columns translation
    },
    driveExportCsvSuccess: { data: [] },
    driveExportCsvFailure: { error: null },

    initPage: null,
    destroyPage: null,
  },
  { prefix: `${REDUX_KEY.BANK_RECONCILIATION_REPORT.LIST}_` },
);
