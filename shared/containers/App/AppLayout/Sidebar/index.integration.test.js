import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup, act } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import permKey from '@shared/shared/permKey.json';

describe('Sidebar', () => {
  afterAll(cleanup);

  let addUserPermissions;
  it('should render component without error', async () => {
    ({ addUserPermissions } = await renderComponent({
      ui: (
        <span /> // Sidebar is always rendered
      ),
    }));
  });

  describe('Menu', () => {
    it('contains favorite pages if the user has access to at least one', async () => {
      act(() => {
        // NOTE: This depends on the mock data returned
        addUserPermissions([permKey.PAGE_GETIR_MARKET_DASHBOARD]);
      });
      await screen.findByText('Favorites');
    });

    it('contains links to favorite pages if the user can access them', async () => {
      act(() => {
        // NOTE: This depends on the mock data returned
        addUserPermissions([permKey.PAGE_GETIR_MARKET_COMMERCIAL_MONITORING]);
      });
      await screen.findByText('Commercial Track');
    });
  });
});
