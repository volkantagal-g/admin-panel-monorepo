import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import ImportCsv from '.';
import renderComponent from '@test/publicUtils/renderComponent';
import { FEE_LAYER_TYPE } from '@shared/shared/constants';

describe('', () => {
  afterAll(cleanup);

  describe('Warehouse Detail Page', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <ImportCsv
            title="my title"
            mode={FEE_LAYER_TYPE.PEAK_HOURS}
            exampleCsvUrl="http://example.com"
          />
        ),
      });
      await screen.findByText('my title');
    });
  });
});
