import '@test/publicUtils/configureWithoutCleanup';

import { screen, waitFor, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/fleet/vehicleConstraint/new';

describe('In the New Vehicle Constraint Page', () => {
  describe('For app level Features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_VEHICLE_CONSTRAINT_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should allow edit flow without any errors', async () => {
      const saveButton = screen.getByRole('button', { name: /save/i });
      await waitFor(() => {
        expect(within(saveButton).queryByLabelText('loading')).not.toBeInTheDocument();
      });

      userEvent.click(saveButton);

      let okButton = screen.getByRole('button', { name: /ok/i });
      userEvent.click(okButton);

      await waitFor(() => {
        expect(screen.getAllByText(/required/i)).toHaveLength(6);
      });

      const [
        referenceSelect, tagsSelect,
      ] = screen.getAllByRole('combobox');

      await waitFor(() => {
        expect(referenceSelect).toBeEnabled();
      });

      const [
        weightInput, volumeInput, longestEdgeInput, durationInput,
      ] = screen.getAllByRole('spinbutton');

      userEvent.type(weightInput, '1000');

      userEvent.type(volumeInput, '1000');

      userEvent.type(longestEdgeInput, '1000');

      userEvent.type(durationInput, '1000');

      expect(tagsSelect).toBeEnabled();

      userEvent.click(tagsSelect);

      const fragileOption = screen.getByText(/fragile/i);

      userEvent.click(fragileOption);

      await waitFor(() => {
        expect(screen.getAllByText(/fragile/i)).toHaveLength(2);
      });

      userEvent.click(saveButton);
      okButton = screen.getByRole('button', { name: /ok/i });
      await waitFor(() => {
        // eslint-disable-next-line testing-library/no-wait-for-side-effects
        userEvent.click(okButton);
      });
    });
  });
});
