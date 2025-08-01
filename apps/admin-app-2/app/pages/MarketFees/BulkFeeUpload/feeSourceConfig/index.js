import { defaultWarehouseDetails } from '@shared/api/fee/index.mock.data';

const defaultDynamicDetails = {
  level_one: 35,
  level_one_fee: 35,
  level_two: 35,
  level_two_fee: 35,
  level_three: 35,
  level_three_fee: 35,
  level_four: 35,
  level_four_fee: 35,
  level_five: 35,
  level_five_fee: 35,
};

const defaultDeliveryFeeDetails = {
  delfee_segment: 'low',
  peak_delfee_segment: 'low',
};
const defaultLayeredDetails = {
  yazlik1: 0,
  yazlik1_delfee: 10.99,
  yazlik2: 0,
  yazlik2_delfee: 9.99,
  yazlik2_minbasket: 100,
  yazlik1_minbasket: 100,
  high_minbasket: 100,
  mid_minbasket: 100,
  low_minbasket: 100,
  highmid_minbasket: 100,
  peak_high: 0,
  high: 0,
  low: 0,
  mid: 0,
  highmid: 0,
  peak_mid: 0,
  peak_highmid: 0,
  peak_low: 0,
  peak_yazlik1: 0,
  peak_yazlik2: 0,
  peak_yazlik2_minbasket: 100,
  peak_yazlik1_minbasket: 100,
  peak_high_minbasket: 100,
  peak_mid_minbasket: 100,
  peak_low_minbasket: 100,
  peak_highmid_minbasket: 100,
};
const defaultServiceFeeDetails = {
  service_fee_segment: 'low',
  peak_service_fee_segment: 'peak_high',
};

export const dynamicDeliveryFeeSourceCsv = {
  ...defaultWarehouseDetails,
  ...defaultDeliveryFeeDetails,
  ...defaultDynamicDetails,
  del_fee_source: 'Dynamic',
};

export const layeredDeliveryFeeSourceCsv = {
  ...defaultWarehouseDetails,
  ...defaultLayeredDetails,
  ...defaultDeliveryFeeDetails,
  del_fee_source: 'Layered',
  high_delfee: 6.99,
  highmid_delfee: 3.99,
  mid_delfee: 3.99,
  low_delfee: 5.99,
  peak_high_delfee: 6.99,
  peak_mid_delfee: 3.99,
  peak_highmid_delfee: 3.99,
  peak_low_delfee: 5.99,
  peak_yazlik2_delfee: 9.99,
  peak_yazlik1_delfee: 10.99,
};

export const fixedDeliveryFeeSourceCsv = {
  ...defaultWarehouseDetails,
  del_fee_source: 'Fixed',
  fixed_del_fee: 50,
};
export const zoneBasedFixedDeliveryFeeSourceCsv = {
  ...defaultWarehouseDetails,
  del_fee_source: 'Zone Based Fixed',
  zone_one_fee: 50,
  zone_two_fee: 50,
  zone_three_fee: 50,
};

export const zoneBasedLayeredDeliveryFeeSourceCsv = {
  ...defaultWarehouseDetails,
  del_fee_source: 'Zone Based Fixed',
  zone_one: 0,
  zone_one_fee: 50,
  zone_two: 0,
  zone_two_fee: 50,
  zone_three: 0,
  zone_three_fee: 50,
};

export const basketAmountSourceCsv = {
  ...defaultWarehouseDetails,
  warehouse_segment: 'high',
  min_basket: 10,
  max_basket: 50,
};
export const zoneBasedBasketAmountSourceCsv = {
  ...defaultWarehouseDetails,
  warehouse_segment: 'high',
  zone_one_min_basket: 10,
  zone_one_max_basket: 50,
  zone_two_min_basket: 10,
  zone_two_max_basket: 50,
  zone_three_min_basket: 10,
  zone_three_max_basket: 50,
};
export const dynamicServiceFeeSourceCsv = {
  ...defaultWarehouseDetails,
  ...defaultServiceFeeDetails,
  ...defaultDynamicDetails,
  service_fee_source: 'Dynamic',
};

export const layeredServiceFeeSourceCsv = {
  ...defaultWarehouseDetails,
  ...defaultLayeredDetails,
  ...defaultServiceFeeDetails,
  service_fee_source: 'Layered',
  high_service_fee: 6.99,
  highmid_service_fee: 3.99,
  mid_service_fee: 3.99,
  low_service_fee: 5.99,
  yazlik1_service_fee: 10.99,
  yazlik2_service_fee: 9.99,
  peak_high_service_fee: 6.99,
  peak_mid_service_fee: 3.99,
  peak_highmid_service_fee: 3.99,
  peak_low_service_fee: 5.99,
  peak_yazlik1_service_fee: 10.99,
  peak_yazlik2_service_fee: 9.99,
};

export const fixedServiceFeeSourceCsv = {
  ...defaultWarehouseDetails,
  service_fee_source: 'Fixed',
  fixed_service_fee: 50,
};

export const dynamicServiceFeeSourceCsvURL =
  'https://docs.google.com/spreadsheets/d/1HcC7tluf07Qz4yCFQ-Hw1YJPBDh4N4l-EHUwXmAt78I/edit#gid=1260034331';
export const fixedServiceFeeSourceCsvURL =
  'https://docs.google.com/spreadsheets/d/1IhRPFBxi6v5ut3SdvwEjRR2GNy8pcqc0wSoxgunyRJk/edit#gid=610765264';
export const layeredServiceFeeSourceCsvURL =
  'https://docs.google.com/spreadsheets/d/1n5WJhSWqGFYqYiwxgxVQnxZzzOWLRdoioHndKOCx_zA/edit#gid=1167184011';
export const deliveryFeeSourceCsvURL =
  'https://docs.google.com/spreadsheets/d/198K0zqeuOuQb6iuqyfHukBugLJq2_zeZkydp8sYjSdc/edit#gid=872903643';
export const dynamicDeliveryFeeSourceCsvURL =
  'https://docs.google.com/spreadsheets/d/1lZ7s55ebmXDVa4TMWVjhSlCOZo185MqV6f8WAW-ldMw/edit#gid=2066793743';
export const fixedDeliveryFeeSourceCsvURL =
  'https://docs.google.com/spreadsheets/d/1XnfpkOuSzPS14CXyRdZThpD8NWNJkVmFpAaaIwfu5Rw/edit#gid=1594853427';
export const layeredDeliveryFeeSourceCsvURL =
  'https://docs.google.com/spreadsheets/d/1i_JZ6CnleA_WBJO0bGzWuAdIY31pVxKpAl55BBDaZw4/edit#gid=1995526761';
export const basketAmountSourceCsvURL =
  'https://docs.google.com/spreadsheets/d/1R9952j5ZesacXwDRpGXeex_Fi5CWsDEy5aaMWhqo1nU/edit#gid=22351163';
export const zoneBasedBasketAmountSourceCsvURL =
  'https://docs.google.com/spreadsheets/d/1e3RRYpFmkV-0qRUixPNHXGsla7HJLfKPxTXRaY4aPl0/edit#gid=0';
export const zoneBasedFixedDeliveryFeeSourceCsvURL =
  'https://docs.google.com/spreadsheets/d/1bdGpvE8oJtEjcBtTQ2QczB15DQVZmomEt2y0a2NGQ_k/edit#gid=0';
export const zoneBasedLayeredDeliveryFeeSourceCsvURL =
  'https://docs.google.com/spreadsheets/d/1YuSaS37c-ISNA90A4hdPs6gUWCdV7OYlw8mPuNP2TI4/edit#gid=0';

export const WAREHOUSE_LIST_MIN = 4;
