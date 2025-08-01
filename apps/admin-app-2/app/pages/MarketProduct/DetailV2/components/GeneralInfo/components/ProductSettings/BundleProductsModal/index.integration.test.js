import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup, within } from '@testing-library/react';

import { get } from 'lodash';

import BundleProductsModal from './index';

import renderComponent from '@test/publicUtils/renderComponent';

import { mockedBundles } from '@shared/api/marketProductBundles/index.mock.data';
import { getMarketProductBundlesDataSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { marketProductStatuses } from '@shared/shared/constantValues';

describe('MarketProduct/Detail/BundleProductsModal', () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it('should render component without error', async () => {
    await renderComponent({
      ui: (
        <BundleProductsModal />
      ),
    });
  });

  it('should show bundle products from state correctly', async () => {
    const spy = jest.spyOn(getMarketProductBundlesDataSelector, 'getData');
    spy.mockReturnValue(mockedBundles.products);

    await renderComponent({
      ui: (
        <BundleProductsModal />
      ),
    });

    mockedBundles.products.forEach(bundleProduct => {
      const name = screen.getByText(bundleProduct.name.en);

      // this is the easiest way to get the table row
      // eslint-disable-next-line testing-library/no-node-access
      const tr = name.closest('tr');
      const statusText = get(marketProductStatuses, [bundleProduct.status, 'en'], '');

      within(tr).getByText(statusText);
    });
  });
});
