import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import SMSOtpModal from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('SMSOtpModal', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <SMSOtpModal isVisible />
        ),
      });
      await screen.findByText('OTP');
    });
  });
});
