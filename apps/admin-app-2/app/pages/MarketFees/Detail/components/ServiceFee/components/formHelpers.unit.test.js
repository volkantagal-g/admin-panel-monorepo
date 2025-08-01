import { useTranslation } from 'react-i18next';

import { formatServiceFeeValuesBeforeSubmit, validateServiceFees } from './formHelpers';

jest.mock('react-i18next', () => ({ useTranslation: jest.fn() }));
const mockedFeeValues = {
  serviceFeeSource: 'DynamicServiceFee',
  fixedServiceFeeAmount: 10,
  dynamicServiceFee: { 1: [{ id: '123', min: 10, fee: 20 }] },
  layeredServiceFee: { peak: [{ id: '123', min: 10, fee: 20 }] },
};
describe('Feedback Modal form helpers', () => {
  describe('#formatServiceFeeValuesBeforeSubmit', () => {
    it('should get initial values', () => {
      const formattedValues =
        formatServiceFeeValuesBeforeSubmit(mockedFeeValues);
      expect(formattedValues).toEqual({
        serviceFeeSource: 'DynamicServiceFee',
        fixedServiceFeeAmount: 10,
        dynamicServiceFee: { 1: [{ min: 10, fee: 20 }] },
        layeredServiceFee: { peak: [{ min: 10, fee: 20 }] },
      });
    });
  });
  describe('#validateServiceFees', () => {
    const useTranslationSpy = useTranslation;
    const t = jest.fn(str => str);

    useTranslationSpy.mockReturnValue({ t });
    it('should should fail if serviceFeeSource is missing', () => {
      const error = validateServiceFees({ t });
      expect(error).toMatch(t('INVALID_SERVICE_FEE_SOURCE'));
    });
    it('should should fail if serviceFeeSource is FixedServiceFee and fixedServiceFeeAmount is missing ', () => {
      const error = validateServiceFees({ serviceFeeSource: 'FixedServiceFee', t });
      expect(error).toMatch(t('INVALID_SERVICE_FIXED_AMOUNT'));
    });
    it('should should fail if serviceFeeSource is DynamicServiceFee and dynamicServiceFee is missing ', () => {
      const error = validateServiceFees({ serviceFeeSource: 'DynamicServiceFee', t, dynamicServiceFee: { 1: [{ min: 10, fee: 20 }] } });
      expect(error).toMatch(t('INVALID_DYNAMIC_SERVICE_FEE'));
    });
    it('should should fail if serviceFeeSource is LayeredServiceFee and layeredServiceFee is missing ', () => {
      const error = validateServiceFees({ serviceFeeSource: 'LayeredServiceFee', t, layeredServiceFee: {} });
      expect(error).toMatch(t('INVALID_LAYERED_SERVICE_FEE'));
    });
  });
});
