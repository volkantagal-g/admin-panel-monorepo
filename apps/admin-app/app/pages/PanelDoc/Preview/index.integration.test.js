import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import { mockedGetById } from '@shared/api/panelDoc/index.mock.data';
import PageComponent from '.';

const initialUrl = '/panelDoc/detail/test_id/preview';

describe('In Panel Doc Preview Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PANEL_DOC_PREVIEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show panel doc details', async () => {
      await screen.findByText(mockedGetById.name.en);
      await screen.findByText(mockedGetById.description.en);
      await screen.findByText(mockedGetById.page.name.en);
    });
    it('should show titles of cards', async () => {
      await screen.findByText('Files');
      await screen.findByText('Frequently Asked Questions');
    });
  });
});
