import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { firstListItemMock } from '@shared/api/e2eCourierPlan/index.mock.data';
import mockApiOnce from '@test/publicUtils/mockApiOnce';

import permKey from '@shared/shared/permKey.json';
import {
  waitPageToRenderSomething,
  expectSidebarMenuToHaveV2,
} from '@test/publicUtils/assertions';
import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

const initialUrl = '/courierPlan';

describe('In E2E Courier Plan Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_E2E_COURIER_PLAN_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', async () => {
      await expectSidebarMenuToHaveV2('Field', ['Warehouse & Franchise', 'End to End Courier Plan']);
    });
  });
  describe('For page features', () => {
    let table;

    it('should have table header and body', async () => {
      await waitFor(() => {
        table = screen.getByRole('table');
        expect(table).toBeInTheDocument();
      });
    });

    it('should show filter panel', async () => {
      expect(screen.getByText('Filter')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Start date')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('End date')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Plan Name')).toBeInTheDocument();
    });

    it('should show column names in table headers', async () => {
      await within(table).findByText('Plan Name');
      await within(table).findByText('Courier Plan Date');
      await within(table).findByText('Warehouse Domain Type');
      await within(table).findByText('Current Step');
      await within(table).findByText('Reference Day 1');
    });

    it('should show information in table body', async () => {
      await within(table).findByText(firstListItemMock.name);
    });

    it('should be able to delete record when requested', async () => {
      const btnDelete = within(table).getAllByRole('button', { name: 'Delete' })[0];
      userEvent.click(btnDelete);
      const tooltip = screen.getByRole('tooltip', { name: /Are you sure\? End to end plan will be deleted completely./i });
      const btnSaveYes = within(tooltip).getByRole('button', { name: 'Yes' });
      userEvent.click(btnSaveYes);
      mockApiOnce({
        url: '/e2eCourierPlan/removePlan',
        handler: ({ body: { id } }) => {
          expect(id).toBe(firstListItemMock._id);
          return { data: {} };
        },
      });
    });
  });
});
