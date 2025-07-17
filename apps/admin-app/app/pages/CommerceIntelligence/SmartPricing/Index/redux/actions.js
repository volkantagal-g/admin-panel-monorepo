import { createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  fetchSmartPricingIndexRequest: null,
  fetchSmartPricingIndexSuccess: ['smartPricingIndex'],
  fetchSmartPricingIndexFailure: ['error'],

  clearSmartPricingState: null,
});

export { Creators, Types };
