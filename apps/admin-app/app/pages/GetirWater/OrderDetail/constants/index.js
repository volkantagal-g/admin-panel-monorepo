export const PAYMENT_STATUS = Object.freeze({
  NOT_PAID: 1,
  PENDING_PAYMENT: 2,
  PAID: 3,
  PAYMENT_ERROR: 4,
  PENDING_REFUND: 5,
  REFUNDED: 6,
  PARTIAL_REFUND_SUCCEDED: 7,
  PENDING_PARTIAL_REFUND: 8,
  ON_DELIVERY_PAYMENT: 9,
});

export const ORDER_STATUS = Object.freeze({
  INCOMPLETE: 100,
  ABORTED: 200,
  BROWSING: 300,
  SCHEDULED_VERIFYING: 325,
  SCHEDULED: 350,
  VERIFYING: 400,
  PREPARING: 500,
  ONWAY: 700,
  REACHED: 800,
  DELIVERED: 900,
  RATED: 1000,
  CANCELED_ADMIN: 1500,
  CANCELED_VENDOR: 1600,
});

export const POST_MESSAGE_TYPE = Object.freeze({ partialRefund: 'partialRefund', cancelOrder: 'cancelOrder', refund: 'refund' });

export const ACTION_TYPE = Object.freeze({ cancel: 'cancel', refund: 'refund', partialRefund: 'partialRefund' });

export const POST_MESSAGE_ACTION_STATUS = Object.freeze({ success: 'success', error: 'error' });
