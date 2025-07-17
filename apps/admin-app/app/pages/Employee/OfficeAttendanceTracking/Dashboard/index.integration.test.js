import '@test/publicUtils/configureWithoutCleanup';
// import { act, cleanup, screen } from '@testing-library/react';
import { cleanup } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = 'employee/officeAttendanceTracking/Dashboard';

describe('In Employee Office Attendance Tracking Dashboard Page:', () => {
  afterAll(cleanup);

  // let renderResult;

  describe('For app level features', () => {
    it('should render without an error', async () => {
      // renderResult = await renderPage({
      await renderPage({
        pagePermKey: permKey.PAGE_EMPLOYEE_OFFICE_ATTENDANCE_TRACKING_DASHBOARD,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
});
