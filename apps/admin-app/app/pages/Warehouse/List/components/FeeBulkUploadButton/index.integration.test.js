import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import FeeBulkUploadButton from '.';

describe('Fee bulk upload in waherouse detail page', () => {
  afterAll(cleanup);
  describe('Feel bulk upload button', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <FeeBulkUploadButton
            title="my title"
            to="my/path"
          />
        ),
      });
      await screen.findByText('my title');
    });
  });
});
