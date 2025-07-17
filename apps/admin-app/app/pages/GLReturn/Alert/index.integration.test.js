import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { expectToHavePageHeaderText, waitForItemToBeSelected } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/return/alert';

describe('In GL Return Alert Page:', () => {
  describe('For alert page', () => {
    it('should render successfully ', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_GL_RETURN_ALERT,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText('Return Slot Alert');
    });
  });
  describe('For Filters', () => {
    it('should be able to select alert type filter', async () => {
      const alertTypeSelect = screen.getByText('Select Alert Type');
      await waitFor(() => {
        expect(alertTypeSelect).toBeEnabled();
      });
      userEvent.click(alertTypeSelect);
      const mockOption = 'Courier assignment failed - moto';
      const option = screen.getByText(mockOption);
      userEvent.click(option);
      await waitForItemToBeSelected(mockOption);
    });

    it('should be able to select city filter', async () => {
      const citySelect = screen.getByText('Select City');
      await waitFor(() => {
        expect(citySelect).toBeEnabled();
      });
      userEvent.click(citySelect);

      const statusOption = screen.getByText('Istanbul');
      userEvent.click(statusOption);
      await waitForItemToBeSelected('Istanbul');
    });
  });
});
