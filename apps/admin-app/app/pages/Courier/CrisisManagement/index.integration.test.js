import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, screen, waitFor } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import CrisisManagement from './index';
import permKey from '@shared/shared/permKey.json';

const testId = {
  log: 'courier-crisis-log',
  mgmt: 'courier-crisis-mgmt',
  incident: 'courier-crisis-incident',
};

const courierId = '587c9e24a1a56d0014072d82';

// TODO: fix this tests, use renderPage
describe.skip('Courier Crisis Management', () => {
  afterAll(cleanup);
  describe('Blank render', () => {
    afterAll(cleanup);
    it('renders nothing when "courierId" is NOT present', async () => {
      await renderComponent({ ui: <CrisisManagement /> });
      // TODO: if there is no permission, it wouldn't render anyway, fix this part.
      expect(screen.queryByTestId(testId.mgmt)).not.toBeInTheDocument();
      expect(screen.queryByTestId(testId.log)).not.toBeInTheDocument();
      expect(screen.queryByTestId(testId.incident)).not.toBeInTheDocument();
    });
  });

  describe('Conditional render', () => {
    afterAll(cleanup);
    let renderResult;
    it('renders nothing when "courierId" is NOT present', async () => {
      renderResult = await renderComponent({ ui: <CrisisManagement courierId={courierId} /> });
      expect(screen.queryByTestId(testId.mgmt)).not.toBeInTheDocument();
      expect(screen.queryByTestId(testId.log)).not.toBeInTheDocument();
      expect(screen.queryByTestId(testId.incident)).not.toBeInTheDocument();
    });
    it('renders content when READ permissions are present', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_COURIER_DETAIL_CRISIS_MGMT]);
      });
      await waitFor(() => {
        expect(screen.getByTestId(testId.mgmt)).toBeInTheDocument();
      });

      expect(screen.getByTestId(testId.log)).toBeInTheDocument();
      expect(screen.getByTestId(testId.incident)).toBeInTheDocument();
    });
  });
});
