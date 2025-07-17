import { waterOrderCancelReasonSource } from '@shared/shared/constantValues';

export const cancelOptions = {
  OUT_OF_SERVICE: 1,
  CARRIER_NOT_AVAILABLE: 2,
  VENDOR_CLOSED: 3,
  VENDOR_BUSY: 4,
  CARRIER_CRASHED: 5,
  OUT_OF_STOCK_PRODUCT: 6,
  WEATHER: 7,
  CARRIER_VEHICLE_BROKEN: 8,
  ADDRESS_OR_PIN_NOT_MATCHED: 9,
  COULDNT_FIND_PARK_SPOT: 10,
  NO_DEPOSIT_CARBOY: 11,
  NO_CUSTOMER_AT_ADDRESS: 12,
  WRONG_OR_MISSING_ADDRESS: 13,
  COULDNT_REACH_CUSTOMER_BECAUSE_OF_ROAD: 14,
  COULDNT_REACH_CUSTOMER: 15,
  DAMAGED_DELIVERY_BECAUSE_OF_COURIER: 16,
  LATE_DELIVERY: 17,
  ABUSE_OF_CAMPAIGN: 18,
  WILL_SELECT_CAMPAIGN_AND_THEN_ORDER: 19,
  WILL_SELECT_PRODUCT_AND_THEN_ORDER: 20,
  MISSING_WRONG_DAMAGED_DELIVERY: 21,
  COULDNT_REACH_TO_VENDOR: 22,
  CUSTOMER_PICKED_WRONG_PAYMENT_TYPE: 23,
  PROBLEM_WITH_VENDOR_PANEL: 24,
  AUTO_CANCEL: 25,
};

export const cancelOptionsBySource = [
  {
    name: 'OUT_OF_SERVICE',
    source: waterOrderCancelReasonSource.GETIR,
    value: cancelOptions.OUT_OF_SERVICE,
  },
  {
    name: 'CARRIER_NOT_AVAILABLE',
    source: waterOrderCancelReasonSource.VENDOR,
    value: cancelOptions.CARRIER_NOT_AVAILABLE,
  },
  {
    name: 'VENDOR_CLOSED',
    source: waterOrderCancelReasonSource.VENDOR,
    value: cancelOptions.VENDOR_CLOSED,
  },
  {
    name: 'VENDOR_BUSY',
    source: waterOrderCancelReasonSource.VENDOR,
    value: cancelOptions.VENDOR_BUSY,
  },
  {
    name: 'OUT_OF_STOCK_PRODUCT',
    source: waterOrderCancelReasonSource.VENDOR,
    value: cancelOptions.OUT_OF_STOCK_PRODUCT,
  },
  {
    name: 'WEATHER',
    source: waterOrderCancelReasonSource.GETIR,
    value: cancelOptions.WEATHER,
  },
  {
    name: 'CARRIER_VEHICLE_BROKEN',
    source: waterOrderCancelReasonSource.VENDOR,
    value: cancelOptions.CARRIER_VEHICLE_BROKEN,
  },
  {
    name: 'ADDRESS_OR_PIN_NOT_MATCHED',
    source: waterOrderCancelReasonSource.CLIENT,
    value: cancelOptions.ADDRESS_OR_PIN_NOT_MATCHED,
  },
  {
    name: 'COULDNT_FIND_PARK_SPOT',
    source: waterOrderCancelReasonSource.VENDOR,
    value: cancelOptions.COULDNT_FIND_PARK_SPOT,
  },
  {
    name: 'NO_DEPOSIT_CARBOY',
    source: waterOrderCancelReasonSource.CLIENT,
    value: cancelOptions.NO_DEPOSIT_CARBOY,
  },
  {
    name: 'NO_CUSTOMER_AT_ADDRESS',
    source: waterOrderCancelReasonSource.CLIENT,
    value: cancelOptions.NO_CUSTOMER_AT_ADDRESS,
  },
  {
    name: 'WRONG_OR_MISSING_ADDRESS',
    source: waterOrderCancelReasonSource.CLIENT,
    value: cancelOptions.WRONG_OR_MISSING_ADDRESS,
  },
  {
    name: 'COULDNT_REACH_CUSTOMER_BECAUSE_OF_ROAD',
    source: waterOrderCancelReasonSource.VENDOR,
    value: cancelOptions.COULDNT_REACH_CUSTOMER_BECAUSE_OF_ROAD,
  },
  {
    name: 'COULDNT_REACH_CUSTOMER',
    source: waterOrderCancelReasonSource.CLIENT,
    value: cancelOptions.COULDNT_REACH_CUSTOMER,
  },
  {
    name: 'DAMAGED_DELIVERY_BECAUSE_OF_COURIER',
    source: waterOrderCancelReasonSource.VENDOR,
    value: cancelOptions.DAMAGED_DELIVERY_BECAUSE_OF_COURIER,
  },
  {
    name: 'LATE_DELIVERY',
    source: waterOrderCancelReasonSource.VENDOR,
    value: cancelOptions.LATE_DELIVERY,
  },
  {
    name: 'ABUSE_OF_CAMPAIGN',
    source: waterOrderCancelReasonSource.CLIENT,
    value: cancelOptions.ABUSE_OF_CAMPAIGN,
  },
  {
    name: 'WILL_SELECT_CAMPAIGN_AND_THEN_ORDER',
    source: waterOrderCancelReasonSource.CLIENT,
    value: cancelOptions.WILL_SELECT_CAMPAIGN_AND_THEN_ORDER,
  },
  {
    name: 'WILL_SELECT_PRODUCT_AND_THEN_ORDER',
    source: waterOrderCancelReasonSource.CLIENT,
    value: cancelOptions.WILL_SELECT_PRODUCT_AND_THEN_ORDER,
  },
  {
    name: 'MISSING_WRONG_DAMAGED_DELIVERY',
    source: waterOrderCancelReasonSource.VENDOR,
    value: cancelOptions.MISSING_WRONG_DAMAGED_DELIVERY,
  },
  {
    name: 'COULDNT_REACH_TO_VENDOR',
    source: waterOrderCancelReasonSource.VENDOR,
    value: cancelOptions.COULDNT_REACH_TO_VENDOR,
  },
  {
    name: 'CUSTOMER_PICKED_WRONG_PAYMENT_TYPE',
    source: waterOrderCancelReasonSource.CLIENT,
    value: cancelOptions.CUSTOMER_PICKED_WRONG_PAYMENT_TYPE,
  },
  {
    name: 'PROBLEM_WITH_VENDOR_PANEL',
    source: waterOrderCancelReasonSource.GETIR,
    value: cancelOptions.PROBLEM_WITH_VENDOR_PANEL,
  },
];
