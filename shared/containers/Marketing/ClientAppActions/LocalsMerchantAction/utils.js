import { getLangKey } from '@shared/i18n';

export const convertLocalsMerchantListOptions = (values = {}) => {
  return Object.entries(values).map(([value, label]) => {
    return {
      value: parseInt(value, 10),
      label: label[getLangKey()] || label,
    };
  });
};
