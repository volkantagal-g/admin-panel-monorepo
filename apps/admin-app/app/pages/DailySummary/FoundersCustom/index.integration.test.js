import '@test/publicUtils/configureWithoutCleanup';
// import { act, cleanup, screen } from '@testing-library/react';
import { cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

// Remember to add api mocks for initial requests sent in your page

const initialUrl = '/summaryQuick/foundersCustom';

describe('In Daily Summary Founders Custom Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_DAILY_SUMMARY_FOUNDERS_CUSTOM,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
