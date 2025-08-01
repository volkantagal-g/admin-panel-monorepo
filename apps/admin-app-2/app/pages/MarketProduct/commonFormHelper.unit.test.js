import { getModifiedValues } from '@app/pages/MarketProduct/commonFormHelper';

describe('WarehousePrice/Detail/StruckPrice and WastePrice/Detail/StruckPrice', () => {
  const values = {
    struckPrice: {
      price: 300,
      financial: {
        supplierSupportRate: 0,
        thirdPartySupportRate: 1,
        isFreeProduct: false,
      },
      isEnabled: true,
      isShownUnderSpecialOffers: false,
    },
    struckPriceSupportType: '1',
  };
  describe('#getModifiedValues', () => {
    it('should return supllier fields as null when isForm is false and changed thirdParty Support Rate', () => {
      expect(getModifiedValues(values, false)).toStrictEqual({
        struckPrice: {
          price: 300,
          financial: {
            supplierSupportRate: null,
            thirdPartySupportRate: 1,
            isFreeProduct: false,
          },
          isEnabled: true,
          isShownUnderSpecialOffers: false,
        },
        struckPriceSupportType: '1',
      });
    });
    it('should return supllier fields as 0 when isForm is true and changed thirdParty Support Rate', () => {
      expect(getModifiedValues(values, true)).toStrictEqual({
        struckPrice: {
          price: 300,
          financial: {
            supplierSupportRate: 0,
            thirdPartySupportRate: 1,
            isFreeProduct: false,
          },
          isEnabled: true,
          isShownUnderSpecialOffers: false,
        },
        struckPriceSupportType: '1',
      });
    });
  });
});
