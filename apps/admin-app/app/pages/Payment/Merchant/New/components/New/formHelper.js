export const addSettingsToCreateMerchantRequest = (values, countryTimeZone, countryCode) => {
  const { displayName, captureType, enabled, maxPurchaseAmount, minPurchaseAmount, webhooks } = values;
  const createMerchantSettings = {
    displayName,
    enabled,
    countryCode,
    timeZone: {
      id: countryTimeZone,
      name: countryTimeZone,
      offset: 2,
    },
    captureType,
    maxPurchaseAmount,
    minPurchaseAmount,
    webhooks,
  };
  return createMerchantSettings;
};

export const addSettingsToPaymentProvider = (paymentProvider, paymentMethodsSettings, merchantId) => {
  const { id, key, name, enabled, maxPurchaseAmount, minPurchaseAmount } = paymentProvider;
  const paymentProviderWithSettings = {
    settings: { enabled: !!enabled, maxPurchaseAmount, minPurchaseAmount },
    configuration: { merchantId },
    id,
    name,
    key,
    merchantId,
    paymentMethods: paymentMethodsSettings,
  };
  return paymentProviderWithSettings;
};

export const addSettingsToPaymentMethod = paymentMethod => {
  const paymentMethodWithSettings = {
    id: paymentMethod.id,
    key: paymentMethod.key,
    name: paymentMethod.name,
    settings: {
      enabled: !!paymentMethod.enabled,
      availableChannels: paymentMethod.availableChannels,
      displayOrder: paymentMethod.displayOrder,
    },
  };
  return paymentMethodWithSettings;
};

export const addSettingsToPaymentMethods = (paymentMethods = []) => {
  const paymentMethodsSettings = paymentMethods?.map(paymentMethod => {
    const paymentMethodWithSettings = addSettingsToPaymentMethod(paymentMethod);
    return paymentMethodWithSettings;
  });
  return paymentMethodsSettings;
};

export const addSettingsToCreateMerchantPaymentProviderRequest = (paymentProviders = [], merchantId) => {
  const createMerchantPaymentProviderRequestPayloads = paymentProviders.map(paymentProvider => {
    const { paymentMethods } = paymentProvider;
    const paymentMethodsSettings = addSettingsToPaymentMethods(paymentMethods);
    const paymentProviderWithSettings = addSettingsToPaymentProvider(paymentProvider, paymentMethodsSettings, merchantId);
    return paymentProviderWithSettings;
  });
  return createMerchantPaymentProviderRequestPayloads;
};
