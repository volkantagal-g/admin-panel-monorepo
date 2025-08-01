import { useTranslation } from 'react-i18next';

import { mockedFeeDetails } from '@shared/api/fee/index.mock.data';
import {
  extractDynamicFees,
  formatDynamicFeeBeforeSubmit,
  getDynamicFeeValues,
  getMinAndFeeValues,
  validateMinAndFeeValue,
} from '.';

jest.mock('react-i18next', () => ({ useTranslation: jest.fn() }));

const mockDynamicFees = { levelOne: [{ min: 0, fee: 200, _id: '123' }] };
describe('market fees details util functions', () => {
  describe('#formatDynamicFeeBeforeSubmit', () => {
    it('should return fees with correct keys', () => {
      const formattedFees = formatDynamicFeeBeforeSubmit(mockDynamicFees);
      expect(formattedFees).toEqual({ 1: [{ min: 0, fee: 200, _id: '123' }] });
    });
  });

  describe('#extractDynamicFees', () => {
    it('should return object values from given fees', () => {
      const extractedFees = extractDynamicFees(mockDynamicFees);
      expect(extractedFees).toEqual([[{ min: 0, fee: 200, _id: '123' }]]);
    });
  });

  describe('#getMinAndFeeValues', () => {
    it('should return fee and min from given fees', () => {
      const extractedFees = getMinAndFeeValues(mockDynamicFees);
      expect(extractedFees).toEqual({ levelOne: [{ min: 0, fee: 200 }] });
    });
  });

  describe('#getSelectedDomainType', () => {
    it('should return dynamic fees values', () => {
      const dynamicFees = getDynamicFeeValues(
        mockedFeeDetails.fee.domainSpecificDetails[0].feeDetails.deliveryFee
          .dynamicDeliveryFee,
      );
      expect(dynamicFees).toHaveProperty('levelOne');
      expect(dynamicFees).toHaveProperty('levelTwo');
    });
  });

  describe('#validateMinAndFeeValue', () => {
    const useTranslationSpy = useTranslation;
    const t = jest.fn(str => str);
    useTranslationSpy.mockReturnValue({ t });
    const fees = [
      { min: 10, fee: 10, key: 'fee-1' },
      { min: 12, fee: 12, key: 'fee-2' },
    ];
    const record = { key: 'record1' };

    it('should pass when value is not empty and dataIndex is "min"', async () => {
      const result = await validateMinAndFeeValue({
        t,
        record,
        fees,
        value: 11,
        dataIndex: 'min',
      });
      expect(result).toBe(true);
    });

    it('should reject when value is equal and dataIndex is "min"', async () => {
      await expect(
        validateMinAndFeeValue({
          t,
          record,
          fees,
          value: 10,
          dataIndex: 'min',
        }),
      ).rejects.toMatch(t('error:DIFFERENT_VALUE'));
    });
    it('should reject when value is less and dataIndex is "min"', async () => {
      await expect(
        validateMinAndFeeValue({
          t,
          record: { min: 12, fee: 12, key: 'fee-2' },
          fees,
          value: 5,
          dataIndex: 'min',
        }),
      ).rejects.toMatch(t('error:ERR_MIN_VALUE'));
    });
    it('should reject when value is more and dataIndex is "fee"', async () => {
      await expect(
        validateMinAndFeeValue({
          t,
          record: { min: 12, fee: 12, key: 'fee-2' },
          fees,
          value: 15,
          dataIndex: 'fee',
        }),
      ).rejects.toMatch(t('error:ERR_FEE_VALUE'));
    });
  });
});
