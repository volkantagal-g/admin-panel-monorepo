import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import permKey from '@shared/shared/permKey.json';

describe('AppHeader', () => {
  afterAll(cleanup);

  let addUserPermissions;
  it('should render component without error', async () => {
    ({ addUserPermissions } = await renderComponent({
      ui: (
        <span /> // AppHeader is always rendered
      ),
    }));
  });

  describe('ProfileMenu', () => {
    it('country selection', async () => {
      const countrySelectionButton = screen.getByRole('button', { name: /Turkey/ });
      userEvent.click(countrySelectionButton);

      await screen.findByText('France');
      await screen.findByText(/Old Countries/);
    });

    it('contains core elements', async () => {
      const profileButton = screen.getByRole('button', { name: 'Profile' });
      userEvent.click(profileButton);

      await screen.findByText('Test User', { exact: false });
      await screen.findByText('Change Country', { exact: false });
      await screen.findByText('Logout');

      // if use has permission to profile page, the "Test User" text will be a link

      act(() => {
        addUserPermissions([permKey.PAGE_PROFILE]);
      });

      await screen.findByRole('link', { name: 'Test User' });
    });

    it('contains documentations if permission is granted', async () => {
      expect(screen.queryByText('Documentations')).not.toBeInTheDocument();

      act(() => {
        addUserPermissions([permKey.PAGE_PANEL_DOC_SEARCH]);
      });

      // findAll since this appears twice, once in the nav bar and once in the profile menu
      await screen.findAllByRole('link', { name: 'Documentations' });
    });
  });
});
