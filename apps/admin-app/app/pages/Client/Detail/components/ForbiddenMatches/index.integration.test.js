import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import ForbiddenMatches from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('ForbiddenMatches', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <ForbiddenMatches />
        ),
      });
      await screen.findByText('Forbidden Matches');
    });

    it('should contain core elements', async () => {
      await screen.findByText('Date');
      await screen.findByText('Courier');
      await screen.findByText('Description');
      await screen.findByText('Created by');
      await screen.findByText('Activeness');
    });
  });
});
