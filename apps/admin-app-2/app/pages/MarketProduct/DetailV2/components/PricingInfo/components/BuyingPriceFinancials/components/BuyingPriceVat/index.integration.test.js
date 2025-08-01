import { cleanup } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import renderComponent from '@test/publicUtils/renderComponent';

import { BuyingPriceVat } from './index';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';

import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { getMarketProductAllPriceSelector, updateMarketProductPricingSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { mockedGetMarketProductAllPrice } from '@shared/api/marketProductPrice/index.mock.data';

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;
const BuyingPriceVatWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return <BuyingPriceVat />;
};
describe('Market Product/Detail/Pricing Info/BuyingPriceFinancials', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it('should render without errors', async () => {
    const getMarketProductAllPriceData = jest.spyOn(getMarketProductAllPriceSelector, 'getData');
    getMarketProductAllPriceData.mockReturnValue(mockedGetMarketProductAllPrice);
    const updateMarketProductPricingPending = jest.spyOn(updateMarketProductPricingSelector, 'getIsPending');
    const updateMarketProductPricingError = jest.spyOn(updateMarketProductPricingSelector, 'getError');
    const updateMarketProductPricingData = jest.spyOn(updateMarketProductPricingSelector, 'getData');
    updateMarketProductPricingPending.mockReturnValue(false);
    updateMarketProductPricingError.mockReturnValue(false);
    updateMarketProductPricingData.mockReturnValue({});
    await renderComponent({ ui: <BuyingPriceVatWithSaga /> });
  });
});
