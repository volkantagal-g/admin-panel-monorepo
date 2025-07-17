import '@test/publicUtils/configureWithoutCleanup';

import { screen, waitFor, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { expectItemToBeSelected, waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/fleet/vehicleConstraint/detail/5daa2daa51cb0b0c4c22fcef';

describe('In the Vehicle Constraint Detail Page', () => {
  describe('For app level Features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_VEHICLE_CONSTRAINT_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should allow edit flow without any errors', async () => {
      const editButton = screen.getByRole('button', { name: /edit/i });
      await waitFor(() => {
        expect(within(editButton).queryByLabelText('loading')).not.toBeInTheDocument();
      });

      userEvent.click(editButton);

      const select = screen.getByRole('combobox');
      await waitFor(() => {
        expect(select).toBeEnabled();
      });

      userEvent.click(select);

      const option = screen.getByText(/fragile/i);
      userEvent.click(option);

      expectItemToBeSelected(/fragile/i);

      const saveButton = screen.getByRole('button', { name: 'Save' });
      userEvent.click(saveButton);

      const okButton = screen.getByRole('button', { name: /ok/i });
      userEvent.click(okButton);
    });
  });
});
