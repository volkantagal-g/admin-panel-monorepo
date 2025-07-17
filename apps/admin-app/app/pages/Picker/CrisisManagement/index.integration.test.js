import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, screen, waitFor } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import CrisisManagement from './index';
import permKey from '@shared/shared/permKey.json';

const testId = {
  log: 'picker-crisis-log',
  mgmt: 'picker-crisis-mgmt',
  incident: 'picker-crisis-incident',
};

const pickerId = '587c9e24a1a56d0014072d82';

// TODO: fix this tests, use renderPage
describe.skip('Picker Crisis Management', () => {
  afterAll(cleanup);
  describe('Blank render', () => {
    afterAll(cleanup);
    it('renders nothing when "pickerId" is NOT present', async () => {
      await renderComponent({ ui: <CrisisManagement /> });
      expect(screen.queryByTestId(testId.mgmt)).not.toBeInTheDocument();
      expect(screen.queryByTestId(testId.log)).not.toBeInTheDocument();
      expect(screen.queryByTestId(testId.incident)).not.toBeInTheDocument();
    });
  });

  describe('Conditional render', () => {
    afterAll(cleanup);
    let renderResult;
    it('renders nothing when "pickerId" is NOT present', async () => {
      renderResult = await renderComponent({ ui: <CrisisManagement pickerId={pickerId} /> });
      expect(screen.queryByTestId(testId.mgmt)).not.toBeInTheDocument();
      expect(screen.queryByTestId(testId.log)).not.toBeInTheDocument();
      expect(screen.queryByTestId(testId.incident)).not.toBeInTheDocument();
    });
    it('renders content when READ permissions are present', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_PICKER_DETAIL_COMPONENT_CRISIS_MANAGEMENT_READ]);
      });
      await waitFor(() => {
        expect(screen.getByTestId(testId.mgmt)).toBeInTheDocument();
      });

      expect(screen.getByTestId(testId.log)).toBeInTheDocument();
      expect(screen.getByTestId(testId.incident)).toBeInTheDocument();
    });
  });
});
