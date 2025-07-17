import { Select } from 'antd';

export const getLoyaltyTypes = (loyaltyStamps, langKey) => {
  if (loyaltyStamps?.length) {
    return loyaltyStamps?.map(loyaltyProgram => {
      const { loyalty: { id, name, totalStampCount } } = loyaltyProgram;

      return {
        value: id,
        label: name[langKey],
        totalStampCount,
      };
    });
  }

  return [];
};

export const FILTER_FORM = ({ t, langKey, loyaltyStamps }) => ({
  LOYALTY_TYPE: {
    name: 'loyaltyType',
    placeholder: t('LOYALTY.LOYALTY_TYPE'),
    colSpan: 8,
    component: Select,
    options: getLoyaltyTypes(loyaltyStamps, langKey),
  },
});
