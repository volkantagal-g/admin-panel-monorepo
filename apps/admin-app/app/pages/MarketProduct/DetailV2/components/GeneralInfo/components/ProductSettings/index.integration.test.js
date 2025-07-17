import '@test/publicUtils/configureWithoutCleanup';
import { useEffect } from 'react';
import { screen, cleanup, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useDispatch } from 'react-redux';

import ProductSettings from './index';

import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import renderComponent from '@test/publicUtils/renderComponent';

import { mockedBundles } from '@shared/api/marketProductBundles/index.mock.data';
import { getMarketProductBundleProductsMock } from '@shared/api/marketProductBundles/index.mock.handler';
import { getBundleProductMock, getPieceTypeProductMock } from '@shared/api/marketProduct/index.mock.handler';
import { useInjectReducer } from '@shared/utils/injectReducer';
import reducer from '@app/pages/MarketProduct/DetailV2/redux/reducer';
import { useInjectSaga } from '@shared/utils/injectSaga';
import saga from '@app/pages/MarketProduct/DetailV2/redux/saga';
import { REDUX_KEY } from '@shared/shared/constants';
import { Creators } from '@app/pages/MarketProduct/DetailV2/redux/actions';
import { getMarketProductSlugProductsMock } from '@shared/api/marketProductSlug/index.mock.handler';
import { getMarketProductByIdSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { mockedBundleProduct, mockedSlugProduct } from '@shared/api/marketProduct/index.mock.data';

const DETAIL_REDUX_KEY = REDUX_KEY.MARKET_PRODUCT.DETAIL;

const ProductSettingsWithSaga = () => {
  const dispatch = useDispatch();
  useInjectReducer({ key: DETAIL_REDUX_KEY, reducer });
  useInjectSaga({ key: DETAIL_REDUX_KEY, saga });

  useEffect(() => {
    dispatch(Creators.initPage());

    return () => {
      dispatch(Creators.destroyPage());
    };
  });

  return <ProductSettings />;
};

describe('MarketProduct/Detail/ProductSettings', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render component without error', async () => {
    await renderComponent({
      ui: (
        <ProductSettings />
      ),
    });
  });

  it('should show bundle products modal if bundle button is clicked', async () => {
    mockApiPerTestCase(getMarketProductBundleProductsMock);
    mockApiPerTestCase(getPieceTypeProductMock);

    await renderComponent({
      ui: (
        <ProductSettingsWithSaga />
      ),
    });

    const bundlesButton = screen.getByText('Bundles');

    userEvent.click(bundlesButton);

    await Promise.all(
      mockedBundles.products.map(bundle => {
        return screen.findByText(bundle.name.en);
      }),
    );
  });

  it('should handle slugs button without error', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedSlugProduct.marketProduct);
    mockApiPerTestCase(getMarketProductSlugProductsMock);
    await renderComponent({
      ui: (
        <ProductSettingsWithSaga />
      ),
    });
    const slugsBtn = await screen.findByRole('button', { name: /slugs/i });
    userEvent.click(slugsBtn);

    const slugsModalText = await screen.findByText(/product slugs/i);
    expect(slugsModalText).toBeInTheDocument();
    const slugsModal = await screen.findByRole('document');
    const cancelBtn = await within(slugsModal).findByRole('button', { name: /cancel/i });
    userEvent.click(cancelBtn);
  });

  it('should handle bundles button without error', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedBundleProduct.marketProduct);
    mockApiPerTestCase(getMarketProductBundleProductsMock);
    mockApiPerTestCase(getBundleProductMock);
    await renderComponent({
      ui: (
        <ProductSettingsWithSaga />
      ),
    });
    const bundlesBtn = await screen.findByRole('button', { name: /bundles/i });
    userEvent.click(bundlesBtn);

    const bundlesModalText = await screen.findByText(/bundle list/i);
    expect(bundlesModalText).toBeInTheDocument();
    const bundlesModal = await screen.findByRole('document');
    const [, closeBtn] = await within(bundlesModal).findAllByRole('button', { name: /close/i });
    userEvent.click(closeBtn);
  });

  it('should check all switches without error', async () => {
    const marketProductSpy = jest.spyOn(getMarketProductByIdSelector, 'getData');
    marketProductSpy.mockReturnValue(mockedBundleProduct.marketProduct);
    mockApiPerTestCase(getMarketProductBundleProductsMock);
    mockApiPerTestCase(getBundleProductMock);
    await renderComponent({
      ui: (
        <ProductSettingsWithSaga />
      ),
    });

    const switches = [
      'showBundleProductsSwitch',
      'onlyPromoSwitch',
      'minimumBasketSwitch',
      'minimumBasketCalculationSwitch',
      'deliveryFeeDiscountSwitch',
      'locationFeeSwitch',
      'showOutOfStockSwitch',
    ];

    const clickSwitchAndCancel = async switchTestId => {
      const switchElement = await screen.findByTestId(switchTestId);
      userEvent.click(switchElement);

      const modalText = await screen.findByText(/confirm/i);
      expect(modalText).toBeInTheDocument();

      const modal = await screen.findByRole('document');
      const cancelBtn = await within(modal).findByRole('button', { name: /cancel/i });
      userEvent.click(cancelBtn);
    };

    await switches.reduce(
      (acc, switchTestId) => acc.then(() => clickSwitchAndCancel(switchTestId)),
      Promise.resolve(),
    );
  });
});
