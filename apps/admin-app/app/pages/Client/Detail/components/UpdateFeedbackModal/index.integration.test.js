import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import UpdateFeedbackModal from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('UpdateFeedbackModal', () => {
    it('should render component without error', async () => {
      const feedback = {
        interestedUser: {},
        source: 'source',
        feedback: 'feedback',
        note: 'note',
        resolveNote: 'resolveNote',
        resolvedUser: {},
      };
      await renderComponent({
        ui: (
          <UpdateFeedbackModal isModalVisible feedback={feedback} />
        ),
      });
      await screen.findByText('Update Client Feedback');
    });
  });
});
