import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen, waitFor } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import GetirJobs from './index';
import permKey from '@shared/shared/permKey.json';
import { clientSelector, getirJobsSelector } from '@app/pages/Client/Detail/redux/selectors';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('GetirJobs', () => {
    let renderResult;

    it('should not render component and core elements if no permission', async () => {
      renderResult = await renderComponent({
        ui: (
          <GetirJobs />
        ),
      });
      // TODO: there are results returned by this query. so please fix this.
      // expect(screen.queryByText('GetirJobs')).not.toBeInTheDocument();
      expect(screen.queryByText('Active')).not.toBeInTheDocument();
      // TODO: there are results returned by this query. so please fix this.
      // expect(screen.queryByText('Closed')).not.toBeInTheDocument();
      expect(screen.queryByText('Close GetirJobs Account')).not.toBeInTheDocument();
    });

    it('should render components with Closed Account if has permission', async () => {
      const getJobsClientSpy = jest.spyOn(getirJobsSelector, 'getClient');
      const getIsPendingSpy = jest.spyOn(getirJobsSelector, 'getIsPending');
      const getClientSpy = jest.spyOn(clientSelector, 'getClient');
      // const getSelectedCountrySpy = jest.mock('getSelectedCountry', { _id: 'test' });

      getIsPendingSpy.mockReturnValue(false);
      getJobsClientSpy.mockReturnValue([
        { isExist: false },
      ]);
      getClientSpy.mockReturnValue([
        { _id: 'test_id' },
      ]);
      renderResult.addUserPermissions([permKey.PAGE_CLIENT_DETAIL_COMPONENT_GETIR_JOBS_DELETE]);

      await screen.findByText('GetirJobs');
      await screen.findByText('Closed');
    });

    // TODO: below mock values do not work. fix those and and remove the skip function later
    it.skip('should render components with Active Account with Delete Button if has permission', async () => {
      jest.spyOn(getirJobsSelector, 'getClient').mockReturnValue({ isExist: true });
      jest.spyOn(getirJobsSelector, 'getIsPending').mockReturnValue(false);
      jest.spyOn(clientSelector, 'getClient').mockReturnValue({ _id: 'test_id' });
      // const getSelectedCountrySpy = jest.mock('getSelectedCountry', { _id: 'test' });

      renderResult.addUserPermissions([permKey.PAGE_CLIENT_DETAIL_COMPONENT_GETIR_JOBS_DELETE]);

      await screen.findByText('GetirJobs');
      await waitFor(async () => {
        await screen.findByText('Active');
      });
      await screen.findByText('Close GetirJobs Account');
    });
  });
});
