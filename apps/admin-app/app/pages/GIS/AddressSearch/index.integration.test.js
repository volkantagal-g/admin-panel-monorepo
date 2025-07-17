import '@test/publicUtils/configureWithoutCleanup';

import { screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';

const initialUrl = '/gis/addressSearch';

describe('In Address Search Page:', () => {
  describe('Landing', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_GIS_ADDRESS_SEARCH,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
      const pageTitle = screen.getByText('Address Search');
      expect(pageTitle).toBeInTheDocument();
    });
    it('should has search bar', () => {
      const searchBar = screen.getByPlaceholderText('Search');
      expect(searchBar).toBeInTheDocument();
    });
  });
});
