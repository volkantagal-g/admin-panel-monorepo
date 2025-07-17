import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import {
  expectSidebarMenuToHaveV2,
  waitPageToRenderSomething,
  expectSelectItemAndWaitForToBeSelected,
} from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/slotPlanManagement';

describe('In Slot Plan Management Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_WORKFORCE_SLOT_PLAN_MANAGEMENT,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', [
        'Field Employee',
        'Slot Plan Management',
      ]);
    });
  });

  describe('For page features', () => {
    it('renders properly', () => {
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Worker Type')).toBeInTheDocument();
      expect(screen.getByText('Cities')).toBeInTheDocument();
      expect(screen.getByText('Warehouse')).toBeInTheDocument();
    });

    it('should select date', async () => {
      const first = screen.getByPlaceholderText('Start date');
      const second = screen.getByPlaceholderText('End date');
      const start = '2024-02-09';
      const end = '2024-02-10';
      userEvent.click(first);
      userEvent.clear(first);
      userEvent.type(first, `${start}{enter}`);

      userEvent.click(second);
      userEvent.clear(second);
      userEvent.type(second, `${end}{enter}`);

      userEvent.click(document.body);

      expect(first).toHaveValue(start);
      expect(second).toHaveValue(end);
    });

    it('should select worker type', async () => {
      const [workerType] = screen.getAllByRole('combobox');
      await expectSelectItemAndWaitForToBeSelected(workerType, 'Courier', /Courier/i);
    });

    it('should click delete button', async () => {
      const deleteSlotsButton = await screen.findByText('Delete Slot Plans');
      expect(deleteSlotsButton).toBeEnabled();
      userEvent.click(deleteSlotsButton);
    });
  });
});
