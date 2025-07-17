import '@test/publicUtils/configureWithoutCleanup';

import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

describe('In the StaffPlanPublication Page', () => {
  describe('For app level Features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_STAFF_PLAN_PUBLICATION,
        pageUrl: '/staffPlanPublication',
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should have correct page content', () => {
      expect(screen.getByText('Courier')).toBeInTheDocument();
      expect(screen.getByText('Store Assistant')).toBeInTheDocument();
      expect(screen.getByText('Standard Plan Publication')).toBeInTheDocument();
      expect(screen.getByText('Scheduled Plan Publication')).toBeInTheDocument();
      expect(screen.getByText('Courier Slot Capacity Publication')).toBeInTheDocument();
    });

    it('should show the correct content for the tab', async () => {
      // When store assistant tab is clicked Scheduled Plan Publication should not be visible
      fireEvent.click(screen.getByTestId('storeAssistantTab'));
      expect(await screen.findByText('sa_plan')).toBeInTheDocument();
      expect(screen.queryByText('Scheduled Plan Publication')).not.toBeInTheDocument();

      // When courier tab is clicked Scheduled Plan Publication should be visible
      fireEvent.click(screen.getByTestId('courierTab'));
      expect(await screen.findByText('courier_plan')).toBeInTheDocument();
      expect(await screen.findByText('Standard Plan Publication')).toBeInTheDocument();
      expect(await screen.findByText('Scheduled Plan Publication')).toBeInTheDocument();
      expect(await screen.findByText('Courier Slot Capacity Publication')).toBeInTheDocument();
    });

    it('should not throw when uploading a csv file', async () => {
      // select file input
      const fileInput = screen.getByTestId('fileInput');

      // example csv file
      const file = new File(['test'], 'test.csv', { type: 'text/csv' });

      // upload file should not throw error
      expect(() => {
        userEvent.upload(fileInput, file);
      }).not.toThrow();
    });
  });
});
