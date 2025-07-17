import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import AllDetails from './index';

describe('Create Segment', () => {
  afterAll(cleanup);

  describe('All Details Component', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <AllDetails
            segmentDetails=""
            filter=""
            prevFilterData={() => {}}
          />
        ),
      });

      const pageHeader = screen.getByTestId('all-details-main-container');
      expect(pageHeader).toBeInTheDocument();
    });
  });
});
