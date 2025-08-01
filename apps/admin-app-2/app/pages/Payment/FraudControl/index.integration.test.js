import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/payment/fraudControl';

describe('In FraudControlList Page:', () => {
  afterAll(cleanup);
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PAYMENT_FRAUD_CONTROL_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
