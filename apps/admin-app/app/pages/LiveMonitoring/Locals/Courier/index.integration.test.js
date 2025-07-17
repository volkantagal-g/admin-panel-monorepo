import '@test/publicUtils/configureWithoutCleanup';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const initialUrl = 'localsLiveMonitoring/courier';

describe('In Locals Courier Page:', () => {
  describe('For courier status monitoring page table', () => {
    it('should render successfully ', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_LOCALS_LIVE_MONITORING_COURIER,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
    });
  });
});
