import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/algorithm/config/domain/locals/detail/123';

describe('In Algorithm Locals Domain Config Detail Page Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_ALGORITHM_LOCALS_DOMAIN_CONFIG_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
      await screen.findByText('Config Value');
      await screen.findByText('Linked Configs');
      await screen.findByText('Parents');
    });
  });
});
