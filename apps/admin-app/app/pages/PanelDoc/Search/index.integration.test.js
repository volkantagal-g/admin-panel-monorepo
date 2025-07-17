import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, waitFor, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import {
  mockedGetAdminGuides,
  mockedGetByFiltersGeneral,
  mockedGetHighlightedDocuments,
} from '@shared/api/panelDoc/index.mock.data';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/panelDoc/search';

describe('In PanelDoc Search Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PANEL_DOC_SEARCH,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct elements', async () => {
      await screen.findByText('Documentation Homepage');
      await screen.findByText('Admin Panel Guides');
      await screen.findByText('Highlighted Documents');
    });

    it('should show admin guides on page load', async () => {
      const adminGuides = await screen.findByTestId('admin-guides');
      expect(adminGuides).toBeInTheDocument();

      const anAdminGuide = within(adminGuides).queryByText(mockedGetAdminGuides[0].name.en);
      expect(anAdminGuide).toBeInTheDocument();
    });

    it('should show highlighted documents on page load', async () => {
      const highlightedDocuments = await screen.findByTestId('highlighted-documents');
      expect(highlightedDocuments).toBeInTheDocument();

      const ahighlightedDocument = within(highlightedDocuments).queryByText(mockedGetHighlightedDocuments[0].name.en);
      expect(ahighlightedDocument).toBeInTheDocument();
    });

    it('should show admin guides on search', async () => {
      const searchInput = await screen.findByPlaceholderText('You can search documentation name, description, file titles etc.');

      userEvent.type(searchInput, 'admin');

      let searchDropdownMenu;

      await waitFor(() => {
        // eslint-disable-next-line testing-library/no-node-access
        [searchDropdownMenu] = document.getElementsByClassName('ant-dropdown-menu');
        expect(searchDropdownMenu).toBeInTheDocument();
      });

      await waitFor(() => {
        const anAdminGuide = within(searchDropdownMenu).queryByText(mockedGetByFiltersGeneral[0].name.en);
        expect(anAdminGuide).toBeInTheDocument();
      });
    });
  });
});
