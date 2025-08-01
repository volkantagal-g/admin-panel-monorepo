import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import ImportCsv from '.';
import renderComponent from '@test/publicUtils/renderComponent';
import { FEE_SOURCE } from '@shared/shared/constants';

describe('', () => {
  afterAll(cleanup);

  describe('Service Fee Bulk Upload Card', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <ImportCsv
            title="my title"
            mode={FEE_SOURCE.DYNAMIC_SERVICE_FEE}
            exampleCsvUrl="http://example.com"
          />
        ),
      });
      await screen.findByText('my title');
    });
  });
});
