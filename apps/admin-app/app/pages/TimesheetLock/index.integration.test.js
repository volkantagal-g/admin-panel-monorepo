import '@test/publicUtils/configureWithoutCleanup';

import { screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

describe('In Timesheet Lock Page:', () => {
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_WORKFORCE_EMPLOYEE_TIMESHEET_LOCK,
        pageUrl: '/timesheetLock',
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should not show the action buttons', async () => {
      expect(screen.queryByTestId('action-buttons')).not.toBeInTheDocument();
    });
  });
});
