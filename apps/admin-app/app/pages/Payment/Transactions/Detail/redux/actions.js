import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';
import { REFUND_REASONS } from '@app/pages/Payment/constants';

const prefix = `${REDUX_KEY.TRANSACTIONS.DETAIL}_`;

export const { Types, Creators } = createActions({
  getTransactionDetailRequest: { id: null },
  getTransactionDetailSuccess: { data: null },
  getTransactionDetailFailure: { error: null },

  userRefundRequest: { merchantId: null, transactionId: null, refundReferenceId: null, description: null, refunds: [] },
  userRefundSuccess: { data: [] },
  userRefundFailure: { error: null },

  refundTable: { data: [] },
  refundDetailForm: { isConfirmed: false, refundReason: REFUND_REASONS[0].value, otherRefundReason: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
