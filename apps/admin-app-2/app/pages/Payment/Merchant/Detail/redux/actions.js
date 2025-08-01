import { createActions } from 'reduxsauce';

import { REDUX_KEY } from '@shared/shared/constants';

const prefix = `${REDUX_KEY.MERCHANTS.DETAIL}_`;

export const { Types, Creators } = createActions({
  getMerchantDetailRequest: { id: null },
  getMerchantDetailSuccess: { data: null },
  getMerchantDetailFailure: { error: null },

  updateMerchantRequest: { key: null, settings: null, customIdentifiers: null, id: null },
  updateMerchantSuccess: { data: null },
  updateMerchantFailure: { error: null },

  getMerchantWebhooksRequest: { id: null },
  getMerchantWebhooksSuccess: { data: null },
  getMerchantWebhooksFailure: { error: null },

  updateMerchantWebhooksRequest: { merchantId: null, webhookId: null, url: null, updatedType: null, enabled: null },
  updateMerchantWebhooksSuccess: { data: null },
  updateMerchantWebhooksFailure: { error: null },

  createMerchantWebhooksRequest: { merchantId: null, url: null, updatedType: null, enabled: null },
  createMerchantWebhooksSuccess: { data: null },
  createMerchantWebhooksFailure: { error: null },

  addPaymentMethodToPaymentProviderRequest: { addMerchantPaymentMethodRequestPayloads: [] },
  addPaymentMethodToPaymentProviderSuccess: {},
  addPaymentMethodToPaymentProviderFailure: { error: null },

  createMerchantPaymentProviderRequest: { createMerchantPaymentProviderRequestPayloads: [] },
  createMerchantPaymentProviderSuccess: {},
  createMerchantPaymentProviderFailure: { error: null },

  initPage: null,
  destroyPage: null,
}, { prefix });
