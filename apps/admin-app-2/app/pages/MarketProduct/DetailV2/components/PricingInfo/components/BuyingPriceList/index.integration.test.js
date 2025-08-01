import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen, waitFor } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import renderComponent from '@test/publicUtils/renderComponent';
import { getSuppliersSelector } from '@shared/redux/selectors/common';
import { getMarketProductAllPriceSelector, updateBuyingPriceFinancialsSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { BuyingPriceList } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BuyingPriceList/index';
import { expectTableToHaveColumnNames } from '@test/publicUtils/assertions';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;
const BuyingPriceListWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return <BuyingPriceList />;
};
describe('Market Product/Detail/Pricing Info/Buying Price Table', () => {
  beforeAll(() => {
    const getMarketProductAllPricePending = jest.spyOn(getMarketProductAllPriceSelector, 'getIsPending');
    const getMarketProductAllPriceData = jest.spyOn(getMarketProductAllPriceSelector, 'getData');
    getMarketProductAllPricePending.mockReturnValue(false);
    getMarketProductAllPriceData.mockReturnValue([]);

    const getSuppliersPending = jest.spyOn(getSuppliersSelector, 'getIsPending');
    const getSuppliersData = jest.spyOn(getSuppliersSelector, 'getData');
    getSuppliersPending.mockReturnValue(false);
    getSuppliersData.mockReturnValue([{ _id: '1', name: 'Supplier 1' }]);

    const updateBuyingPriceFinancialsPending = jest.spyOn(updateBuyingPriceFinancialsSelector, 'getIsPending');
    const updateBuyingPriceFinancialsData = jest.spyOn(updateBuyingPriceFinancialsSelector, 'getData');
    updateBuyingPriceFinancialsPending.mockReturnValue(false);
    updateBuyingPriceFinancialsData.mockReturnValue([]);
  });
  afterAll(cleanup);

  describe('BuyingPriceList', () => {
    let buyingPriceTable;
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <BuyingPriceListWithSaga />
        ),
      });
    });
    it('should have table header and body', async () => {
      await waitFor(() => {
        buyingPriceTable = screen.getByTestId('buying-price-table');
        expect(buyingPriceTable).toBeInTheDocument();
      });
    });
    it('Should have columns for Selling Price List Table', () => {
      expectTableToHaveColumnNames(
        buyingPriceTable,
        ['Manufacturer', 'Supplier', "VAT's", 'List Price', 'Net Invoice Price(with VAT)', 'Net Buying Price(with VAT)', 'Payment Due Day', 'Actions'],
      );
    });
  });
});
