import '@test/publicUtils/configureWithoutCleanup';

import { screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitForItemToBeSelected, waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/fleet/vehicleConstraint/list';

describe('In the Vehicle Constraint List Page', () => {
  describe('For app level Features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_VEHICLE_CONSTRAINT_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should handle filters without error', async () => {
      const submitButton = screen.getByRole('button', { name: /bring/i });

      await waitFor(() => {
        expect(submitButton).toBeEnabled();
      });

      const [vehicleTypeFilter, vehicleStatusFilter] = screen.getAllByRole('combobox');

      await waitFor(() => {
        expect(vehicleTypeFilter).toBeEnabled();
      });

      userEvent.click(vehicleTypeFilter);

      const onFootOption = screen.getByText(/on foot/i);
      userEvent.click(onFootOption);
      await waitForItemToBeSelected(/on foot/i);

      await waitFor(() => {
        expect(vehicleStatusFilter).toBeEnabled();
      });

      userEvent.click(vehicleStatusFilter);

      const activeOption = screen.getByLabelText(/^active/i);
      userEvent.click(activeOption);

      await waitFor(() => {
        expect(screen.getAllByText(/^active/i)).toHaveLength(2);
      });

      userEvent.click(submitButton);
    });
  });
});
