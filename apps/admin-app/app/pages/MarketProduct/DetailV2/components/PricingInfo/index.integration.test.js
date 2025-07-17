import '@test/publicUtils/configureWithoutCleanup';

import { cleanup } from '@testing-library/react';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import renderComponent from '@test/publicUtils/renderComponent';
import PricingInfo from './index';
import {
  getMarketProductAllPriceSelector,
  updateMarketProductPricingSelector,
  createBuyingPriceFinancialsSelector,
  updateBuyingPriceFinancialsSelector,
  createWastePricingSelector,
  getBundlePricingsBySubProductIdSelector,
  getWarehouseSegmentsSelector,
  getBadgesSelector,
  getSellingPriceListSelector, createSellingPriceFinancialsSelector, createSellingPriceDiscountedFinancialsSelector,
  getMarketProductsPriceListSelector,
} from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { useInjectReducer } from '@shared/utils/injectReducer';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';

import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { REDUX_KEY } from '@shared/shared/constants';

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;
const PricingInfoWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return <PricingInfo />;
};

describe('Market Product/Detail/Pricing Info', () => {
  beforeAll(() => {
    const getMarketProductAllPricePending = jest.spyOn(getMarketProductAllPriceSelector, 'getIsPending');
    const getMarketProductAllPriceData = jest.spyOn(getMarketProductAllPriceSelector, 'getData');
    getMarketProductAllPricePending.mockReturnValue(false);
    getMarketProductAllPriceData.mockReturnValue([]);

    const updateMarketProductPricingPending = jest.spyOn(updateMarketProductPricingSelector, 'getIsPending');
    const updateMarketProductPricingError = jest.spyOn(updateMarketProductPricingSelector, 'getError');
    const updateMarketProductPricingData = jest.spyOn(updateMarketProductPricingSelector, 'getData');
    updateMarketProductPricingPending.mockReturnValue(false);
    updateMarketProductPricingError.mockReturnValue(false);
    updateMarketProductPricingData.mockReturnValue({});

    const createBuyingPriceFinancialPending = jest.spyOn(createBuyingPriceFinancialsSelector, 'getIsPending');
    const createBuyingPriceFinancialError = jest.spyOn(createBuyingPriceFinancialsSelector, 'getError');
    createBuyingPriceFinancialError.mockReturnValue(false);
    createBuyingPriceFinancialPending.mockReturnValue(false);

    const updateBuyingPriceFinancialPending = jest.spyOn(updateBuyingPriceFinancialsSelector, 'getIsPending');
    const updateBuyingPriceFinancialData = jest.spyOn(updateBuyingPriceFinancialsSelector, 'getData');
    updateBuyingPriceFinancialPending.mockReturnValue(false);
    updateBuyingPriceFinancialData.mockReturnValue([]);
    const updateBuyingPriceFinancialError = jest.spyOn(updateBuyingPriceFinancialsSelector, 'getError');
    updateBuyingPriceFinancialError.mockReturnValue(false);

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

    const getBadgesPending = jest.spyOn(getBadgesSelector, 'getIsPending');
    const getBadgesData = jest.spyOn(getBadgesSelector, 'getData');
    getBadgesPending.mockReturnValue(false);
    getBadgesData.mockReturnValue([]);

    const getSellingPriceListPending = jest.spyOn(getSellingPriceListSelector, 'getIsPending');
    const getSellingPriceListData = jest.spyOn(getSellingPriceListSelector, 'getData');
    getSellingPriceListPending.mockReturnValue(false);
    getSellingPriceListData.mockReturnValue([]);
    const createSellingPriceFinancialsPending = jest.spyOn(createSellingPriceFinancialsSelector, 'getIsPending');
    const createSellingPriceFinancialsError = jest.spyOn(createSellingPriceFinancialsSelector, 'getError');
    createSellingPriceFinancialsPending.mockReturnValue(false);
    createSellingPriceFinancialsError.mockReturnValue(false);

    const createSellingDiscountedPriceFinancialsPending = jest.spyOn(createSellingPriceDiscountedFinancialsSelector, 'getIsPending');
    const createSellingDiscountedPriceFinancialsError = jest.spyOn(createSellingPriceDiscountedFinancialsSelector, 'getError');
    createSellingDiscountedPriceFinancialsPending.mockReturnValue(false);
    createSellingDiscountedPriceFinancialsError.mockReturnValue(false);

    const getMarketProductsPriceListPending = jest.spyOn(getMarketProductsPriceListSelector, 'getIsPending');
    const getMarketProductsPriceListData = jest.spyOn(getMarketProductsPriceListSelector, 'getData');
    getMarketProductsPriceListPending.mockReturnValue(false);
    getMarketProductsPriceListData.mockReturnValue([]);
  });
  afterAll(cleanup);

  describe('Pricing Info Tab', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <PricingInfoWithSaga />
        ),
      });
    });
  });
});
