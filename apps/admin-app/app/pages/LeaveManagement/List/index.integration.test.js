import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, waitFor, within } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import {
  expectSidebarMenuToHaveV2,
  getAntTableBodies,
  getAntTableHeaderTables,
  waitPageToRenderSomething,
} from '@test/publicUtils/assertions';
import PageComponent from '.';
import { leaveRequests } from '@shared/api/leaveManagement/index.mock.data';

const initialUrl = '/leaveRequest/list';

const statusNames = [
  'Pending for approval',
  'Pending for document',
  'Approved',
  'Rejected',
  'Canceled',
];

describe('In Employee Leave Request List Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_WORKFORCE_EMPLOYEE_LEAVE_MANAGEMENT_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', async () => {
      await expectSidebarMenuToHaveV2('Field', [
        'Field Employee',
        'Leave Management',
      ]);
    });
  });
  describe('For page features', () => {
    let table;
    let tab;

    it('should show filter panel', async () => {
      expect(screen.getByText('Filter')).toBeInTheDocument();
      expect(screen.getByText('Franchise')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Start date')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('End date')).toBeInTheDocument();
    });

    it('should have first panel expanded', async () => {
      await waitFor(() => {
        tab = screen.getByRole('tab', { expanded: true });
        expect(tab).toHaveTextContent(statusNames[0]);
      });
    });

    it('should have panel for each status', async () => {
      await waitFor(() => {
        tab = screen.getAllByRole('tab');
        expect(tab.length).toEqual(statusNames.length);
      });
    });

    it('should have table header and body', async () => {
      await waitFor(() => {
        table = screen.getAllByRole('table').shift();
        expect(table).toBeInTheDocument();
      });
    });

    it('should show column names in table headers', async () => {
      await waitFor(() => {
        const tables = getAntTableHeaderTables();
        expect(tables.length).toBeGreaterThan(0);
        [table] = tables;
      });
      await within(table).findByText('Picture');
      await within(table).findByText('Name');
      await within(table).findByText('Leave Type');
      await within(table).findByText('Dates Requested');
      await within(table).findByText('Number of Days Requested');
    });

    it('should show approve/reject buttons in panel', async () => {
      const panel = screen.getAllByRole('tabpanel').shift();
      const [approve, reject] = await within(panel).findAllByRole('button');
      expect(approve).toHaveTextContent('Approve');
      expect(reject).toHaveTextContent('Reject');
    });

    it('should show information in table', async () => {
      await waitFor(() => {
        const tables = getAntTableBodies();
        expect(tables.length).toBeGreaterThan(0);
        [table] = tables;
      });

      await within(table).findAllByText(leaveRequests.leaves[0].person.name);
      await within(table).findAllByRole('button', { name: 'delete' });
    });
  });
});
