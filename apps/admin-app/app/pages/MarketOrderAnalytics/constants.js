import { MARKET_ACTIVE_ORDER_STATUS, MARKET_ORDER_STATUS } from '@shared/shared/constants';

export const SLOTTED_STATE = {
  SCHEDULED: 'SCHEDULED',
  ON_DEMAND: 'ON_DEMAND',
};

export const ORDER_STATUS_FOR_ACTIVE_ORDERS_PAGES = {
  RESERVED: MARKET_ORDER_STATUS.RESERVED,
  ...MARKET_ACTIVE_ORDER_STATUS,
};

export const OrderProductType = {
  PIECE: 1,
  WEIGHT: 2,
};

export const OrderProductSubType = {
  PRE_PACKAGED: 1,
  FRESH_MEAT_AND_CHEESE: 2,
  FRESH_FRUIT_AND_VEGETABLES: 3,
};

export const OrderProductWeightUnit = {
  PIECE: 1,
  KG: 2,
  G: 3,
};
