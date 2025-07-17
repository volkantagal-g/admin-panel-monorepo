import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import KpiFilters from './index';

describe('Create Segment', () => {
  afterAll(cleanup);

  describe('KPI Filters', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <KpiFilters
            getFilters={() => {}}
            prevData=""
          />
        ),
      });

      const pageHeader = screen.getByTestId('total-count-main-container');
      expect(pageHeader).toBeInTheDocument();
    });
  });
});
