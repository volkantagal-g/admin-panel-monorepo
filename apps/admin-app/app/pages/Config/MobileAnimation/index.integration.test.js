import '@test/publicUtils/configureWithoutCleanup';
import { cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const configMobileAnimationPath = '/config/mobileAnimation';

describe('In Config MobileAnimation Page:', () => {
  afterAll(cleanup);
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_CONFIG_MOBILE_ANIMATION,
        pageUrl: configMobileAnimationPath,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
