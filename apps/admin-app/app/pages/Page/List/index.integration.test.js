import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor } from '@testing-library/react';

import { mockedPage } from '@shared/api/page/index.mock.data';
import renderPage from '@test/publicUtils/renderPage';
import { expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import PageComponent from '.';

import permKey from '@shared/shared/permKey.json';

const initialUrl = '/page/list';

describe('In Page List Page:', () => {
  let renderResult;
  describe('For page list', () => {
    it('should render successfully', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_PAGE_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Pages');
    });
    it('should show name and description', async () => {
      await waitFor(() => {
        screen.getByText(mockedPage.name.en);
        screen.getByText(mockedPage.description.en);
      });
    });
  });
  describe('For permission specific actions', () => {
    it('shouldn\'t show role addition button when not permitted', async () => {
      expect(screen.queryByText('New Page')).not.toBeInTheDocument();
      expect(screen.queryByText('New Component')).not.toBeInTheDocument();
    });
    it('should show and use role addition button/modal when permitted', async () => {
      const { addUserPermissions } = renderResult;

      addUserPermissions([permKey.PAGE_PAGE_NEW, permKey.PAGE_COMPONENT_NEW]);
      expect(screen.getByText('New Page')).toBeInTheDocument();
      expect(screen.getByText('New Component')).toBeInTheDocument();
    });
  });
});
