import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import renderComponent from '@test/publicUtils/renderComponent';
import {
  createSellingPriceFinancialsSelector,
  createWastePricingSelector, getBundlePricingsBySubProductIdSelector,
  getMarketProductAllPriceSelector, getWarehouseSegmentsSelector,
  updateMarketProductPricingSelector, updateWarehousePricingSelector, createSellingPriceDiscountedFinancialsSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { SellingPriceFinancials } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/SellingPriceFinancials/index';
import { mockedMarketProductAllPrice } from '@shared/api/marketProductPrice/index.mock.data';
import { REDUX_KEY } from '@shared/shared/constants';
import { useInjectReducer } from '@shared/utils/injectReducer';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;
const SellingPriceFinancialsWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return <SellingPriceFinancials />;
};

describe('Market Product/Detail/Pricing Info/Selling Price Financial', () => {
  beforeAll(() => {
    const getMarketProductAllPricePending = jest.spyOn(getMarketProductAllPriceSelector, 'getIsPending');
    const getMarketProductAllPriceData = jest.spyOn(getMarketProductAllPriceSelector, 'getData');
    getMarketProductAllPricePending.mockReturnValue(false);
    getMarketProductAllPriceData.mockReturnValue(mockedMarketProductAllPrice);

    const updateMarketProductPricingPending = jest.spyOn(updateMarketProductPricingSelector, 'getIsPending');
    const updateMarketProductPricingError = jest.spyOn(updateMarketProductPricingSelector, 'getError');
    const updateMarketProductPricingData = jest.spyOn(updateMarketProductPricingSelector, 'getData');
    updateMarketProductPricingPending.mockReturnValue(false);
    updateMarketProductPricingError.mockReturnValue(false);
    updateMarketProductPricingData.mockReturnValue({});

    const createWastePricingPending = jest.spyOn(createWastePricingSelector, 'getIsPending');
    createWastePricingPending.mockReturnValue(false);

    const getBundlePricingsBySubProductIdPending = jest.spyOn(getBundlePricingsBySubProductIdSelector, 'getIsPending');
    const getBundlePricingsBySubProductIdData = jest.spyOn(getBundlePricingsBySubProductIdSelector, 'getData');
    getBundlePricingsBySubProductIdPending.mockReturnValue(false);
    getBundlePricingsBySubProductIdData.mockReturnValue([]);

    const getWarehouseSegmentsPending = jest.spyOn(getWarehouseSegmentsSelector, 'getIsPending');
    const getWarehouseSegmentsData = jest.spyOn(getWarehouseSegmentsSelector, 'getData');
    getWarehouseSegmentsPending.mockReturnValue(false);
    getWarehouseSegmentsData.mockReturnValue([]);

    const updateWarehousePricingPending = jest.spyOn(updateWarehousePricingSelector, 'getIsPending');
    const updateWarehousePricingData = jest.spyOn(updateWarehousePricingSelector, 'getData');
    updateWarehousePricingPending.mockReturnValue(false);
    updateWarehousePricingData.mockReturnValue([]);

    const createSellingPriceFinancialsPending = jest.spyOn(createSellingPriceFinancialsSelector, 'getIsPending');
    const createSellingPriceFinancialsError = jest.spyOn(createSellingPriceFinancialsSelector, 'getError');
    createSellingPriceFinancialsPending.mockReturnValue(false);
    createSellingPriceFinancialsError.mockReturnValue(false);

    const createSellingDiscountedPriceFinancialsPending = jest.spyOn(createSellingPriceDiscountedFinancialsSelector, 'getIsPending');
    const createSellingDiscountedPriceFinancialsError = jest.spyOn(createSellingPriceDiscountedFinancialsSelector, 'getError');
    createSellingDiscountedPriceFinancialsPending.mockReturnValue(false);
    createSellingDiscountedPriceFinancialsError.mockReturnValue(false);
  });
  afterAll(cleanup);

  describe('Selling Price Financial Without Bundle', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <SellingPriceFinancialsWithSaga />
        ),
      });
    });
  });
});
