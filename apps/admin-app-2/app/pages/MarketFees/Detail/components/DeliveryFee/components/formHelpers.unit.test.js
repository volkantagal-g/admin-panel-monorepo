import { useTranslation } from 'react-i18next';

import { formatDeliveryFeeValuesBeforeSubmit, validateDeliveryFees } from './formHelpers';

jest.mock('react-i18next', () => ({ useTranslation: jest.fn() }));

const mockedFeeValues = {
  deliveryFeeSource: 'DynamicDeliveryFee',
  fixedDeliveryFeeAmount: 10,
  dynamicDeliveryFee: { 1: [{ id: '123', min: 10, fee: 20 }] },
};
describe('Feedback Modal form helpers', () => {
  describe('#formatServiceFeeValuesBeforeSubmit', () => {
    it('should get initial values', () => {
      const formattedValues =
      formatDeliveryFeeValuesBeforeSubmit(mockedFeeValues);
      expect(formattedValues).toEqual({
        deliveryFeeSource: 'DynamicDeliveryFee',
        fixedDeliveryFeeAmount: 10,
        dynamicDeliveryFee: { 1: [{ min: 10, fee: 20 }] },
      });
    });
  });
  describe('#validateDeliveryFees', () => {
    const useTranslationSpy = useTranslation;
    const t = jest.fn(str => str);
    useTranslationSpy.mockReturnValue({ t });
    it('should should fail if deliveryFeeSource is missing', () => {
      const error = validateDeliveryFees({ t });
      expect(error).toMatch(t('INVALID_DELIVERY_FEE_SOURCE'));
    });
    it('should should fail if deliveryFeeSource is FixedDeliveryFee and fixedDeliveryFeeAmount is missing ', () => {
      const error = validateDeliveryFees({ deliveryFeeSource: 'FixedDeliveryFee', t });
      expect(error).toMatch(t('INVALID_DELIVERY_FIXED_AMOUNT'));
    });
    it('should should fail if deliveryFeeSource is DynamicDeliveryFee and dynamicDeliveryFee is missing ', () => {
      const error = validateDeliveryFees({ deliveryFeeSource: 'DynamicDeliveryFee', t, dynamicDeliveryFee: { 1: [{ min: 10, fee: 20 }] } });
      expect(error).toMatch(t('INVALID_DYNAMIC_DELIVERY_FEE'));
    });
    it('should should fail if deliveryFeeSource is LayeredDeliveryFee and layeredDeliveryFee is missing ', () => {
      const error = validateDeliveryFees({ deliveryFeeSource: 'LayeredDeliveryFee', t, layeredDeliveryFee: { peak: {} } });
      expect(error).toMatch(t('INVALID_LAYERED_DELIVERY_FEE'));
    });
  });
});
