import '@test/publicUtils/configureWithoutCleanup';
import { screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { wait } from '@testing-library/user-event/dist/utils';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';

const orderTestId = '5de969573aed804787ca0b43';
const initialUrl = `/foodOrder/detail/${orderTestId}`;

describe('In Food Order Detail Page:', () => {
  let renderResult;
  describe('For Page Details', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_GETIR_FOOD_ORDER_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show Order Notes input card', async () => {
      expect(screen.getByText('Order Notes')).toBeInTheDocument();
      const editButton = screen.getByTestId('food-order-detail-order-note-edit-btn');
      userEvent.click(editButton);
      let cancelButton;
      await waitFor(() => {
        cancelButton = screen.getByTestId('food-order-detail-order-note-cancel-btn');
      });
      userEvent.click(cancelButton);
    });
    it('should show IVR Actions table', async () => {
      expect(screen.getByText('IVR Actions')).toBeInTheDocument();
    });
    it('should show Restaurant Users table', async () => {
      expect(screen.getByText('Restaurant Users')).toBeInTheDocument();
    });
    it('should show Order List table', async () => {
      expect(screen.getByText('Order List')).toBeInTheDocument();
    });
    it('shouldn\'t show Actions button when not permitted', async () => {
      expect(screen.queryByText('Actions')).not.toBeInTheDocument();
    });
    it('should show and use actions button/modal when permitted', async () => {
      const { addUserPermissions } = renderResult;

      act(() => {
        addUserPermissions([permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_ACTION_MENU]);
      });

      const actionsButton = await screen.findByText('Actions');
      userEvent.click(actionsButton);

      const cancelOrderButton = screen.queryByText('Cancel the Order');
      await waitFor(() => {
        expect(cancelOrderButton).not.toBeInTheDocument();
      });
    });
    it('shouldn\'t show order cancel button when permitted', async () => {
      expect(screen.queryByText('Cancel the Order')).not.toBeInTheDocument();
    });
    it('should show Cancel the Order Button', async () => {
      const { addUserPermissions } = renderResult;

      act(() => {
        addUserPermissions([permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_CANCEL_RESTAURANT_ORDER_MODAL]);
      });

      const cancelOrderButton = await screen.findByText('Cancel the Order');
      userEvent.click(cancelOrderButton);

      const modal = screen.getByTestId('food-order-detail-cancel-order-modal');

      expect(modal).toBeInTheDocument();
      expect(screen.getByText('Is Prepared?')).toBeInTheDocument();

      userEvent.click(screen.getByLabelText('Prepared'));
      expect(screen.getByLabelText('Prepared')).toBeChecked();

      const cancelModalButton = screen.getByRole('button', { name: 'Cancel' });
      userEvent.click(cancelModalButton);
      expect(cancelModalButton).not.toBeVisible();
    });
    it('shouldn\'t show Print Contract button when not permitted', async () => {
      expect(screen.queryByText('Print Contract')).not.toBeInTheDocument();
    });
    it('should show and use Print Contract button when permitted', async () => {
      const { addUserPermissions } = renderResult;

      act(() => {
        addUserPermissions([permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_PRINT_CONTRACT]);
      });

      const printContractButton = await screen.findByText('Print Contract');
      userEvent.click(printContractButton);
      await waitFor(() => {
        expect(window.open).toBeCalled();
      });
    });
    it('shouldn\'t show Order Refund button when permitted', async () => {
      expect(screen.queryByText('Complaint / Refund')).not.toBeInTheDocument();
    });
    it('should show Order Refund Button', async () => {
      const { addUserPermissions } = renderResult;

      act(() => {
        addUserPermissions([permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_COMPLAINT_REFUND_MODAL]);
      });

      const complaintRefundButton = await screen.findByText('Refund the Order');
      userEvent.click(complaintRefundButton);

      await wait(() => {
        const modal = screen.getByTestId('food-order-detail-complaint-refund-modal');

        expect(modal).toBeInTheDocument();
        expect(screen.getByText('Order Refund')).toBeInTheDocument();
        expect(screen.getByText('Save')).toBeInTheDocument();

        const cancelModalButton = screen.getByRole('button', { name: 'Cancel' });
        userEvent.click(cancelModalButton);
        expect(cancelModalButton).not.toBeVisible();
      });
    });
    it('should show Order Refund Modal Channel Explanation Text Field', async () => {
      const { addUserPermissions } = renderResult;

      act(() => {
        addUserPermissions([permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_COMPLAINT_REFUND_MODAL]);
      });

      const complaintRefundButton = await screen.findByText('Refund the Order');
      userEvent.click(complaintRefundButton);

      await wait(() => {
        const modal = screen.getByTestId('food-order-detail-complaint-refund-modal');

        expect(modal).toBeInTheDocument();
        const otherChannelOption = screen.getByText('Other');
        expect(otherChannelOption).toBeInTheDocument();
        userEvent.click(otherChannelOption);

        expect(screen.getByTestId('channelOptionText')).toBeVisible();

        const cancelModalButton = screen.getByRole('button', { name: 'Cancel' });
        userEvent.click(cancelModalButton);
        expect(cancelModalButton).not.toBeVisible();
      });
    });
    it('shouldn\'t show financial button when permitted', async () => {
      expect(screen.queryByText('Export Financial Info to Excel')).not.toBeInTheDocument();
    });
    it('should show and use financial button when permitted', async () => {
      const { addUserPermissions } = renderResult;

      act(() => {
        addUserPermissions([permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_FINANCIAL_ORDER_MODAL]);
      });

      await screen.findByText('Export Financial Info to Excel');
    });
  });
});
