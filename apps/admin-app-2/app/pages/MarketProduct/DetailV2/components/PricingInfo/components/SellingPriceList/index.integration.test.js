import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen, waitFor } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import renderComponent from '@test/publicUtils/renderComponent';
import {
  getMarketProductAllPriceSelector,
  getSellingPriceListSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { SellingPriceList } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceList/index';
import { expectTableToHaveColumnNames } from '@test/publicUtils/assertions';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';

import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;
const SellingPriceListWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return <SellingPriceList />;
};
describe('Market Product/Detail/Pricing Info/Bonuses Component Table', () => {
  beforeAll(() => {
    const getMarketProductAllPricePending = jest.spyOn(getMarketProductAllPriceSelector, 'getIsPending');
    const getMarketProductAllPriceData = jest.spyOn(getMarketProductAllPriceSelector, 'getData');
    getMarketProductAllPricePending.mockReturnValue(false);
    getMarketProductAllPriceData.mockReturnValue([]);

    const getSellingPriceListPending = jest.spyOn(getSellingPriceListSelector, 'getIsPending');
    const getSellingPriceListData = jest.spyOn(getSellingPriceListSelector, 'getData');
    getSellingPriceListPending.mockReturnValue(false);
    getSellingPriceListData.mockReturnValue([]);
  });
  afterAll(cleanup);

  describe('SelllingPriceList', () => {
    let sellingPriceTable;
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <SellingPriceListWithSaga />
        ),
      });
    });
    it('should have table header and body', async () => {
      await waitFor(() => {
        sellingPriceTable = screen.getByTestId('selling-price-table');
        expect(sellingPriceTable).toBeInTheDocument();
      });
    });
    it('Should have columns for Selling Price List Table', () => {
      expectTableToHaveColumnNames(
        sellingPriceTable,
        ['Date Range', 'Warehouse', 'Domain', 'Price', 'Discounted', 'Price Type'],
      );
    });
  });
});
