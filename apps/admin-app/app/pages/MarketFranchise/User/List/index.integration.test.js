import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething, waitForToastElementToAppear } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const initialUrl = '/marketFranchise/user/list';

describe('In Franchise User List Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_MARKET_FRANCHISE_USER_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should have correct header', async () => {
      screen.getByText('Franchise User List');

      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_MARKET_FRANCHISE_USER_EXPORT]);
      });
      await waitFor(() => {
        const exportButton = screen.getByTestId('EXPORT_FRANCHISE_USERS_BUTTON');
        expect(exportButton).toBeInTheDocument();
      });

      expect(screen.getByText('New Franchise User')).toBeInTheDocument();
    });

    it('should be able to work correctly export franchise users button', async () => {
      const exportButton = screen.getByTestId('EXPORT_FRANCHISE_USERS_BUTTON');
      userEvent.click(exportButton);

      await waitForToastElementToAppear();
      expect(screen.getByText('Success')).toBeInTheDocument();
    });
  });
});
