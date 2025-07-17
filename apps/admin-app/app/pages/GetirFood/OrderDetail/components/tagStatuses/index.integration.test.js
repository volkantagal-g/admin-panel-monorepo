import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import TagStatuses from '.';

describe('In Food Order Detail Page:', () => {
  describe('Tag Statuses', () => {
    it('should render without an error', async () => {
      const { unmount } = await renderComponent({ ui: (<TagStatuses />) });
      expect(screen.getByText('Order-JSON')).toBeInTheDocument();
      expect(screen.getByText('Basket-JSON')).toBeInTheDocument();
      expect(screen.getByText('Courier-JSON')).toBeInTheDocument();
      expect(screen.getByText('Finance-JSON')).toBeInTheDocument();
      expect(screen.queryByText('Not Paid')).not.toBeInTheDocument();
      expect(screen.queryByText('Getir Delivery')).not.toBeInTheDocument();
      expect(screen.queryByText('Free')).not.toBeInTheDocument();
      expect(screen.queryByText('Verifing')).not.toBeInTheDocument();
      unmount();
    });

    it('should show the Order Detail JSON modal when Order-JSON clicked', async () => {
      const { unmount } = await renderComponent({ ui: (<TagStatuses />) });
      await fireEvent.click(screen.getByTestId('FOOD_ORDER_DETAIL__ORDER_DETAIL_JSON_BUTTON'));
      expect(screen.getByText('Order Detail JSON')).toBeInTheDocument();
      await fireEvent.click(screen.getByLabelText('Close'));
      unmount();
    });

    it('should show the Basket Detail JSON modal when Basket-JSON clicked', async () => {
      const { unmount } = await renderComponent({ ui: (<TagStatuses />) });
      await fireEvent.click(screen.getByTestId('FOOD_ORDER_DETAIL__BASKET_DETAIL_JSON_BUTTON'));
      expect(screen.getByText('Basket Detail JSON')).toBeInTheDocument();
      await fireEvent.click(screen.getByLabelText('Close'));
      unmount();
    });

    it('should show the Courier JSON modal when Courier-JSON clicked', async () => {
      const { unmount } = await renderComponent({ ui: (<TagStatuses />) });
      await fireEvent.click(screen.getByTestId('FOOD_ORDER_DETAIL__COURIER_JSON_BUTTON'));
      expect(screen.getByText('Courier JSON')).toBeInTheDocument();
      await fireEvent.click(screen.getByLabelText('Close'));
      unmount();
    });

    it('should show the Finance JSON modal when Finance-JSON clicked', async () => {
      const { unmount } = await renderComponent({ ui: (<TagStatuses />) });
      await fireEvent.click(screen.getByTestId('FOOD_ORDER_DETAIL__FINANCE_JSON_BUTTON'));
      expect(screen.getByText('Finance JSON')).toBeInTheDocument();
      await fireEvent.click(screen.getByLabelText('Close'));
      unmount();
    });
  });
});
