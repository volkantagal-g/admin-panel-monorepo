import { set } from 'lodash';

export const applyChangesToInitialValue = (
  cardInstallmentCountsModifiedData = [],
  cardInitialInstallmentCounts = [],
) => {
  cardInstallmentCountsModifiedData.forEach(item => {
    if (item.operation) {
      const indexOfModifiedData = cardInitialInstallmentCounts.findIndex(modifiedData => modifiedData.id === item.id);

      if (item.operation === 'added') {
        cardInitialInstallmentCounts.push(item);
      }
      if (item.operation === 'deleted') {
        cardInitialInstallmentCounts.splice(indexOfModifiedData, 1);
      }
      if (item.operation === 'updated') {
        set(cardInitialInstallmentCounts[indexOfModifiedData], 'commission', item.commission);
        set(cardInitialInstallmentCounts[indexOfModifiedData], 'isEnabled', item.isEnabled);
      }
    }
  });

  return cardInitialInstallmentCounts;
};

export const prepareRequestBody = (cardInstallCountsVersion, cardUserType, installments) => {
  const cleanInstallments = installments.map(item => {
    return {
      posIca: item.posIca,
      installment: item.installment,
      commission: item.commission,
      isEnabled: item.isEnabled,
    };
  });
  return {
    version: cardInstallCountsVersion,
    cardUserType,
    installments: cleanInstallments,
  };
};
