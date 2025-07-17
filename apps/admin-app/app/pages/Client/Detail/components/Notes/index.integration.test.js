import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import { t } from '@shared/i18n';
import renderComponent from '@test/publicUtils/renderComponent';
import Notes from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('Notes', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <Notes t={t} />
        ),
      });
      await screen.findByText('Note');
      await screen.findByText('Post');
    });
  });
});
