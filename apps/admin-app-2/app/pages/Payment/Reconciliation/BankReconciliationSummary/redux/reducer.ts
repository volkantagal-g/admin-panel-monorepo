import { createReducer } from 'reduxsauce';

import { Types } from './actions';

export type DataType = {
  message: string;
  currency: string;
  domainSummary: {
    title: string;
    orderCount: number;
    paymentAmount: number;
    refundAmount: number;
    netAmount: number;
  };
  posSummary: {
    title: string;
    orderCount: number;
    paymentAmount: number;
    refundAmount: number;
    netAmount: number;
  };
};

export type State = {
  bankReconciliationSummary: {
    isPending: boolean;
    data: DataType | null;
  };
};

export const INITIAL_STATE: State = {
  bankReconciliationSummary: {
    isPending: false,
    data: null,
  },
};

const bankReconciliationSummaryRequest = (state: State): State => ({
  ...state,
  bankReconciliationSummary: {
    ...state.bankReconciliationSummary,
    isPending: true,
    data: null,
  },
});
const bankReconciliationSummarySuccess = (
  state: State,
  { data }: { data: DataType },
): State => ({
  ...state,
  bankReconciliationSummary: {
    ...state.bankReconciliationSummary,
    isPending: false,
    data,
  },
});
const bankReconciliationSummaryFailure = (state: State): State => ({
  ...state,
  bankReconciliationSummary: {
    ...state.bankReconciliationSummary,
    isPending: false,
  },
});

const destroyPage = () => ({ ...INITIAL_STATE });

export const HANDLERS = {
  [Types.GET_BANK_RECONCILIATION_SUMMARY_REQUEST]:
    bankReconciliationSummaryRequest,
  [Types.GET_BANK_RECONCILIATION_SUMMARY_SUCCESS]:
    bankReconciliationSummarySuccess,
  [Types.GET_BANK_RECONCILIATION_SUMMARY_FAILURE]:
    bankReconciliationSummaryFailure,
  [Types.DESTROY_PAGE]: destroyPage,
};

export default createReducer(INITIAL_STATE, HANDLERS);
