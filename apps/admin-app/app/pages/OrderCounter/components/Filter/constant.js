import { convertConstantValueTranslationsToSelectOptions } from '@shared/utils/common';

export const ORDER_COUNT_TYPES = {
  COUNTRY: { value: 'country' },
  GLOBAL: { value: 'global' },
};

export const useTypeOfOrderCountsOptions = () => convertConstantValueTranslationsToSelectOptions({
  constants: ORDER_COUNT_TYPES,
  translationBaseKey: 'orderCounter:ORDER_COUNT_TYPES',
});
