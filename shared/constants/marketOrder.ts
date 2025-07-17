import { MARKET_ORDER_STATUS } from '@shared/shared/constants';

export const MARKET_ORDER_ACTIVE_STATUS_TO_DATE_FIELD = {
  [MARKET_ORDER_STATUS.WAITING_FOR_PICKER]: 'checkout.date',
  [MARKET_ORDER_STATUS.VERIFYING]: 'picking.date',
  [MARKET_ORDER_STATUS.PREPARING]: 'verify.0.date',
  [MARKET_ORDER_STATUS.PREPARED]: 'prepare.date',
  [MARKET_ORDER_STATUS.HANDOVER]: 'handover.date',
  [MARKET_ORDER_STATUS.ONWAY]: 'onway.date',
  [MARKET_ORDER_STATUS.REACHED]: 'reach.date',
} as const;

export const MARKET_ORDER_SUCCESS_DATE_FIELD = 'deliver.date';
