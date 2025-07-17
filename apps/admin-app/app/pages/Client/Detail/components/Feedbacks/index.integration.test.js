import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import Feedbacks from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('Feedbacks', () => {
    it('should render component without error', async () => {
      const { container } = await renderComponent({
        ui: (
          <Feedbacks isAddFeedbackModalVisible setIsAddFeedbackModalVisible={() => {}} client={{ _id: '58f07b6036fbbf000473626f' }} />
        ),
      });

      // the feedback container is collapsed by default, we need to open it to be able to test it
      // eslint-disable-next-line testing-library/no-node-access,testing-library/no-container
      const [collapseArrow] = container.getElementsByClassName('ant-collapse-arrow');
      collapseArrow.click();

      await screen.findByText('Feedbacks');
    });

    it('should contain core elements', async () => {
      await screen.findByText('Date');
      await screen.findByText('Source');
      await screen.findByText('Feedback');
      await screen.findByText('Note');
      await screen.findByText('Status');
      await screen.findByText('Order');
      await screen.findByText('Discount');
      await screen.findByText('Action');
    });
  });
});
