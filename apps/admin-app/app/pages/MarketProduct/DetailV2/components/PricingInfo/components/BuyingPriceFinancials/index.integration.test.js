import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import renderComponent from '@test/publicUtils/renderComponent';
import {
  createBuyingPriceFinancialsSelector, getMarketProductAllPriceSelector,
  getMarketProductByIdSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { BuyingPriceFinancials } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/BuyingPriceFinancials/index';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;
const BuyingPriceFinancialsWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return <BuyingPriceFinancials />;
};
describe('Market Product/Detail/Pricing Info/Buying Price Financial', () => {
  beforeAll(() => {
    const createBuyingPriceFinancialPending = jest.spyOn(createBuyingPriceFinancialsSelector, 'getIsPending');
    const createBuyingPriceFinancialError = jest.spyOn(createBuyingPriceFinancialsSelector, 'getError');
    createBuyingPriceFinancialPending.mockReturnValue(false);
    createBuyingPriceFinancialError.mockReturnValue(false);

    const getMarketProductAllPricePending = jest.spyOn(getMarketProductAllPriceSelector, 'getIsPending');
    const getMarketProductAllPriceData = jest.spyOn(getMarketProductAllPriceSelector, 'getData');
    getMarketProductAllPricePending.mockReturnValue(false);
    getMarketProductAllPriceData.mockReturnValue([]);

    const getMarketProductByIdPending = jest.spyOn(getMarketProductByIdSelector, 'getIsPending');
    const getMarketProductByIdData = jest.spyOn(getMarketProductByIdSelector, 'getData');
    getMarketProductByIdPending.mockReturnValue(false);
    getMarketProductByIdData.mockReturnValue([]);
  });
  afterAll(cleanup);

  describe('Buying Price Financial', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <BuyingPriceFinancialsWithSaga />
        ),
      });
    });
    it('should have correct select form contents', async () => {
      expect(screen.getByText('Supplier Account')).toBeInTheDocument();
      expect(screen.getByText('Supplier')).toBeInTheDocument();
    });
    it('should have correct form items contents', async () => {
      expect(screen.getByText("VAT's")).toBeInTheDocument();
      expect(screen.getByText('List Price')).toBeInTheDocument();
      expect(screen.getByText('Price Reduction')).toBeInTheDocument();
      expect(screen.getByText('Net Invoice Price')).toBeInTheDocument();
      expect(screen.getByText('Net Buying Price')).toBeInTheDocument();
      expect(screen.getByText('Payment Due Day')).toBeInTheDocument();
    });
    // TODO: Fix the failing tests
    it.skip('should have Add Button ', async () => {
      expect(screen.getByRole('button', { name: 'plus Add' })).toBeInTheDocument();
    });
  });
});
