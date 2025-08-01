import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.MERCHANTS.NEW}_`;

export const { Types, Creators } = createActions({
  createMerchantRequest: {
    key: null,
    settings: null,
    customIdentifiers: null,
    createMerchantWebhookPayloads: null,
  },
  createMerchantSuccess: { data: [] },
  createMerchantFailure: { error: null },

  // TODO: duplicated
  createMerchantPaymentProviderRequest: { createMerchantPaymentProviderRequestPayloads: [] },
  createMerchantPaymentProviderSuccess: { data: [] },
  createMerchantPaymentProviderFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
