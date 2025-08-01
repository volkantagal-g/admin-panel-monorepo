import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import { SelectItems } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BuyingPriceFinancials/components/SelectItems/index';
import { getSuppliersSelector } from '@shared/redux/selectors/common';
import { createBuyingPriceFinancialsSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';

describe('Market Product/Detail/Pricing Info/Buying Price Financial/SellectItems', () => {
  beforeAll(() => {
    const createBuyingPriceFinancialPending = jest.spyOn(createBuyingPriceFinancialsSelector, 'getIsPending');
    const createBuyingPriceFinancialError = jest.spyOn(createBuyingPriceFinancialsSelector, 'getError');

    const getSuppliersPending = jest.spyOn(getSuppliersSelector, 'getIsPending');
    const getSuppliersData = jest.spyOn(getSuppliersSelector, 'getData');

    createBuyingPriceFinancialPending.mockReturnValue(false);
    createBuyingPriceFinancialError.mockReturnValue(false);
    getSuppliersPending.mockReturnValue(false);
    getSuppliersData.mockReturnValue([{
      _id: '559de04a5dc7a20c001662ba',
      name: 'EMRE GIDA DAĞITIM VE PAZ. SAN. TİC. LTD. ŞTİ.',
      types: [
        'supplier',
      ],
      accounts: [
        {
          name: 'EMRE GIDA DAĞITIM VE PAZARLAMA LTD.ŞTİ.',
          code: '320.01.00068',
          _id: '57add27fbd033d0300380048',
          newName: 'EMRE GIDA DAĞITIM VE PAZARLAMA LTD.ŞTİ.',
          newCode: '320.01.00068',
          oldCode: '320.02.0024',
          oldName: 'EMRE GIDA DAĞITIM VE PAZARLAMA LTD.ŞTİ.',
        },
        {
          name: 'account 1',
          code: '1',
          dcBonus: 1,
          _id: '63da39706e09aafbec132ee1',
        },
      ],
    }]);
  });
  afterAll(cleanup);
  describe('SelectItems', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <SelectItems />
        ),
      });
    });
    it('should have correct select form contents', async () => {
      expect(screen.getByText('Supplier Account')).toBeInTheDocument();
      expect(screen.getByText('Supplier')).toBeInTheDocument();
    });
  });
});
