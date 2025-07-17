import '@test/publicUtils/configureWithoutCleanup';
import userEvent from '@testing-library/user-event';

import { cleanup, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import AddFeedbackModal from './index';

describe('Client/Detail', () => {
  afterAll(cleanup);

  describe('AddFeedbackModal', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <AddFeedbackModal
            isModalVisible
            setIsModalVisible={() => {}}
            clientId="58f07b6036fbbf000473626f"
          />
        ),
      });
      await screen.findByText('Add Client Feedback/Discount');
    });

    it('should contain core elements', async () => {
      await screen.findByText('Gsm');
      await screen.findByText('Email');
      await screen.findByText('Other');
      await screen.findByText('Warehouse');
      await screen.findByText('Chat');
      await screen.findByText('Social Media');

      await screen.findByText('Cancel');
      await screen.findByText('Save');
    });

    it('should show further options after selecting an element', async () => {
      const gsmCategory = await screen.findByText('Gsm');
      userEvent.click(gsmCategory);

      await screen.findByText('Can\'t add payment method');
      await screen.findByText('Can\'t use promo');
      await screen.findByText('Can\'t find courier');
      await screen.findByText('Checkout error');
      await screen.findByText('Food Order Error');
    });

    it('should show further options after selecting a feedback reason', async () => {
      const gsmCategory = await screen.findByText('Gsm');
      userEvent.click(gsmCategory);

      const paymentMethodButton = await screen.findByText('Can\'t add payment method');
      userEvent.click(paymentMethodButton);

      await screen.findByText('Note');
      await screen.findByText('Discount');
    });
  });
});
