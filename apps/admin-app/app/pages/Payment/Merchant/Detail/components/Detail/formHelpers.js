export const preparePaymentMethodsFormData = data => {
  const preparedData = [];
  data.forEach(item => {
    preparedData.push({
      name: item.name,
      key: item.key,
      enabled: item.settings.enabled,
      availableChannels: item.settings.availableChannels,
      displayOrder: item.settings.displayOrder,
    });
  });
  return preparedData;
};

export const preparePaymentProvidersFormData = data => {
  const preparedData = [];
  data.forEach(item => {
    preparedData.push({
      id: item.id,
      name: item.name,
      key: item.key,
      enabled: item.settings?.enabled,
      displayOrder: item.settings?.displayOrder,
      maxPurchaseAmount: item.settings?.maxPurchaseAmount,
      minPurchaseAmount: item.settings?.minPurchaseAmount,
      merchantId: item.configuration?.merchantId,
      paymentMethods: preparePaymentMethodsFormData(item.paymentMethods),
    });
  });
  return preparedData;
};

export const prepareUpdateMerchantPayload = updatedMerchantDetailSelectorData => {
  const { id, key, settings, customIdentifiers } = updatedMerchantDetailSelectorData;
  const { displayName, enabled, countryCode, timeZone, captureType, maxPurchaseAmount, minPurchaseAmount } = settings;

  const updateMerchantPayload = {
    key,
    settings: {
      displayName,
      enabled,
      countryCode,
      timeZone,
      captureType,
      maxPurchaseAmount,
      minPurchaseAmount,
    },
    customIdentifiers,
    id,
  };
  return updateMerchantPayload;
};

export const addTypeInfoToCustomIdentifiers = (customIdentifiers = []) => {
  const customIdentifiersWithTypes = customIdentifiers.map(customIdentifier => {
    const { value, key } = customIdentifier;
    if (typeof value === 'number') {
      return {
        key,
        type: 'number',
        value: parseInt(value, 10),
      };
    }
    if (typeof value === 'string') {
      return {
        key,
        type: 'text',
        value,
      };
    }
    if (typeof value === 'object') {
      return {
        key,
        type: 'textarea',
        value: JSON.stringify(value),
      };
    }
    return customIdentifier;
  });
  return customIdentifiersWithTypes;
};
