import { createSelector } from 'reselect';

import { REDUX_KEY } from '@shared/shared/constants';

const reducerKey = REDUX_KEY.BANK_RECONCILIATION_REPORT.LIST;

export const reconciliationsSelector = {
  getData: createSelector(
    state => state[reducerKey]?.reconciliations.data.reconciliations,
    pageState => {
      return pageState;
    },
  ),
  getTotalPages: createSelector(
    state => state[reducerKey]?.reconciliations.data.totalPages,
    pageState => {
      return pageState || 0;
    },
  ),
  getIsPending: createSelector(
    state => state[reducerKey]?.reconciliations.isPending,
    pageState => {
      return pageState;
    },
  ),
};

export const refundsTransactionSelector = {
  getIsPending: createSelector(
    state => state[reducerKey]?.refunds.isPending,
    pageState => {
      return pageState;
    },
  ),
};

export const manualRefundSelector = {
  getIsPending: createSelector(
    state => state[reducerKey]?.manualRefunds.isPending,
    pageState => {
      return pageState;
    },
  ),
};

export const exportCsvSelector = {
  getData: createSelector(
    state => state[reducerKey]?.exportCsv.data.reconciliations,
    pageState => {
      return pageState;
    },
  ),
  getIsPending: createSelector(
    state => state[reducerKey]?.exportCsv.isPending,
    pageState => {
      return pageState;
    },
  ),
};

export const transactionReconciliationsSelector = {
  getData: createSelector(
    state => state[reducerKey]?.transactionReconciliations.data.data,
    pageState => {
      return pageState;
    },
  ),
  getTotalPages: createSelector(
    state => state[reducerKey]?.transactionReconciliations.data.totalPages,
    pageState => {
      return pageState || 0;
    },
  ),
  getIsPending: createSelector(
    state => state[reducerKey]?.transactionReconciliations.isPending,
    pageState => {
      return pageState;
    },
  ),
};

export const driveExportCsvSelector = {
  getData: createSelector(
    state => state[reducerKey]?.driveExportCsv.data?.data,
    pageState => {
      return pageState;
    },
  ),
  getIsPending: createSelector(
    state => state[reducerKey]?.driveExportCsv.isPending,
    pageState => {
      return pageState;
    },
  ),
};

export const selectedRowsSelector = {
  getSelectedRows: createSelector(
    state => state[reducerKey]?.selectedRows,
    pageState => {
      return pageState;
    },
  ),
  getSelectedBasketIds: createSelector(
    state => state[reducerKey]?.selectedRows,
    pageState => {
      const basketIds = [];
      pageState.map(rows => (rows.basketId && !rows.orderId) && basketIds.push(rows.basketId));
      return basketIds;
    },
  ),
  getSelectedOrderIds: createSelector(
    state => state[reducerKey]?.selectedRows,
    pageState => {
      const orderIds = [];
      pageState.map(rows => rows.orderId && orderIds.push(rows.orderId));
      return orderIds;
    },
  ),
};

export const getOrderPagination = {
  pagination: createSelector(
    state => state?.[reducerKey].orderPagination,
    pageSize => {
      return pageSize;
    },
  ),
  page: createSelector(
    state => state?.[reducerKey].orderPagination.page,
    page => {
      return page;
    },
  ),
  pageSize: createSelector(
    state => state?.[reducerKey].orderPagination.pageSize,
    pageSize => {
      return pageSize;
    },
  ),
};

export const getOrderFilters = createSelector(
  state => state?.[reducerKey].orderFilters,
  data => {
    return data;
  },
);

export const getTransactionPagination = {
  pagination: createSelector(
    state => state?.[reducerKey].transactionPagination,
    pageSize => {
      return pageSize;
    },
  ),
  page: createSelector(
    state => state?.[reducerKey].transactionPagination.page,
    page => {
      return page;
    },
  ),
  pageSize: createSelector(
    state => state?.[reducerKey].transactionPagination.pageSize,
    pageSize => {
      return pageSize;
    },
  ),
};

export const getTransactionFilters = createSelector(
  state => state?.[reducerKey].transactionFilters,
  data => {
    return data;
  },
);
