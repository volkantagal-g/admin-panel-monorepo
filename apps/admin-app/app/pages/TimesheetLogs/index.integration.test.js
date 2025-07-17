import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen, waitFor, within } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { expectSidebarMenuToHaveV2, waitPageToRenderSomething, getAntTableHeaderTables } from '@test/publicUtils/assertions';
import PageComponent from '.';

describe('In Timesheet Logs Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_WORKFORCE_EMPLOYEE_TIMESHEET_LOGS,
        pageUrl: '/timesheetLogs',
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', [
        'Field Employee',
        'Timesheet Logs',
      ]);
    });
  });

  describe('For page features', () => {
    let table;

    it('should show filter panel', async () => {
      expect(screen.getByText('Filter')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('Employee')).toBeInTheDocument();
      expect(screen.getByText('Bring')).toBeInTheDocument();
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
      await within(table).findByText('Action');
      await within(table).findByText('When');
      await within(table).findByText('What');
      await within(table).findByText('Employee Type');
      await within(table).findByText('Username');
      await within(table).findByText('Details');
    });
  });
});
