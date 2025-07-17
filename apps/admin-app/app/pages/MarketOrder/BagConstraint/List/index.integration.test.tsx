import '@test/publicUtils/configureWithoutCleanup';

import BagConstraints from '.';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';

const pageUrl = '/marketOrder/bagConstraint';

describe('bag constraints page', () => {
  it('should render bag constraints page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_GETIR_MARKET_BAG_CONSTRAINTS,
      pageUrl,
      pageComponent: BagConstraints,
    });
    await waitPageToRenderSomething();
  });
});
