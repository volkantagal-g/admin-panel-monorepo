import '@test/publicUtils/configureWithoutCleanup';
import { useTranslation } from 'react-i18next';

import {
  extractDynamicDeliveryFees,
  extractLayeredServiceFees,
  getExampleCsv,
  getParsedData,
  parseBasketAmountsFeeCSVImport,
  parseDynamicDeliveryFeeCSVImport,
  parseFixedDeliveryFeeCSVImport,
  parseFixedServiceFeeCSVImport,
} from '.';
import {
  basketAmountSourceCsv,
  fixedDeliveryFeeSourceCsv,
  fixedServiceFeeSourceCsv,
} from '../feeSourceConfig';
import {
  mockedDynamicFees,
  mockedLayeredDeliveryFees,
  mockedLayeredServiceFees,
} from '../../../../api/fee/index.mock.data';

jest.mock('react-i18next', () => ({ useTranslation: jest.fn() }));

describe('bulk delivery fee update utils', () => {
  const useTranslationSpy = useTranslation;
  const t = jest.fn(str => str);
  useTranslationSpy.mockReturnValue({ t });
  it('should return correct csv file based on the selected mode', () => {
    const csv = getExampleCsv('fixed_delivery_fee');
    expect(csv).toMatchObject({
      warehouse_id: '559831e0b1dc700c006a71b0',
      city_name: 'Adiyaman',
      warehouse_name: 'AdıyamanAltınşehir SC',
      service: 'G10',
      del_fee_source: 'Fixed',
      fixed_del_fee: 50,
    });
  });

  it('should parsed correct csv based on the selected mode', () => {
    const parsedData = getParsedData(
      mockedLayeredDeliveryFees,
      'layered_delivery_fee',
      t,
    );
    const parsedDelServiceData = getParsedData(
      mockedLayeredServiceFees,
      'layered_service_fee',
      t,
    );
    expect(parsedData[0].deliveryFee.deliveryFeeSource).toBe(
      'LayeredDeliveryFee',
    );
    expect(parsedDelServiceData[0].serviceFee.serviceFeeSource).toBe(
      'LayeredServiceFee',
    );
  });

  it('should parsed fixed fees', () => {
    const fixedDeliveryFees = parseFixedDeliveryFeeCSVImport(
      [fixedDeliveryFeeSourceCsv],
      t,
    );
    const fixedServiceFees = parseFixedServiceFeeCSVImport(
      [fixedServiceFeeSourceCsv],
      t,
    );
    expect(fixedDeliveryFees[0].deliveryFee.deliveryFeeSource).toBe(
      'FixedDeliveryFee',
    );
    expect(fixedServiceFees[0].serviceFee.serviceFeeSource).toBe(
      'FixedServiceFee',
    );
  });

  it('should parsed dynamic fees', () => {
    const dynamicDeliveryFees = parseDynamicDeliveryFeeCSVImport(
      mockedDynamicFees,
      t,
    );

    expect(dynamicDeliveryFees[0].deliveryFee.deliveryFeeSource).toBe(
      'DynamicDeliveryFee',
    );
  });

  it('should parsed basket amounts', () => {
    const basketAmounts = parseBasketAmountsFeeCSVImport(
      [basketAmountSourceCsv],
      t,
    );
    expect(basketAmounts[0]).toHaveProperty('minDiscountedAmount');
    expect(basketAmounts[0]).toHaveProperty('maxDiscountedAmount');
  });

  it('should extract dynamic fees', () => {
    const extractedDeliveryFees = extractDynamicDeliveryFees(
      mockedDynamicFees,
      t,
    );
    expect(extractedDeliveryFees).toHaveProperty('1');
    expect(extractedDeliveryFees).toHaveProperty('2');
  });

  it('should correct csv source', () => {
    const feeSource = getExampleCsv('fixed_delivery_fee');
    expect(feeSource).toBe(fixedDeliveryFeeSourceCsv);
  });

  it('should return correct source url', () => {
    const extractedFees = extractLayeredServiceFees(
      mockedLayeredServiceFees,
      t,
    );
    expect(extractedFees).toHaveProperty('regular');
    expect(extractedFees).toHaveProperty('peak');
  });
});
