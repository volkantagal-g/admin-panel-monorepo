import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, waitFor, act } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { orderDetailSelector, orderRefundReasonsSelector } from '@app/pages/MarketOrder/OrderDetail/redux/selectors';

import renderComponent from '@test/publicUtils/renderComponent';

import { mockedMarketOrderDetail, mockedMarketOrderRefundReasons } from '@shared/api/marketOrder/index.mock.data';
import AgentActions from '.';
import permKey from '@shared/shared/permKey.json';

const mockFeedback = {
  _id: '6335ae99a99a576915ead166',
  type: 5,
  status: 2,
  isProductsExchanged: true,
  isProductsRefund: true,
  isFranchiseFault: true,
  isCancelled: false,
  unableToReachToCustomer: false,
  products: [
    { count: 2, product: '559831ecb1dc700c006a71b4' },
    { count: 2, product: '5d035563d9bfee00019b2899' },
  ],
  items: [],
  intent: 0,
  deactivateItems: [],
  isBagFeeRefunded: true,
  isDeliveryFeeRefunded: false,
  source: 1,
  feedback: 37,
  mainReason: 10,
  order: '63359107ebc04cb5b62a2a93',
  domainType: 1,
  client: '5fcf1f4d04ee190009b78bac',
  warehouse: '61aa3642cb539001ad799f7c',
  courier: '616ed09e4c025059787497f0',
  franchise: '5f3f71fb777c3b35bdb7b3ea',
  interestedUser: {
    _id: '5fcf1f4d04ee190009b78bac',
    name: '5fcf1f4d04ee190009b78bac',
  },
  note: 'testing max expiry for discount',
  discountCode: '6335ae9983b4c517fd8fe0b5',
  resolvedUser: {
    _id: '5fcf1f4d04ee190009b78bac',
    name: '5fcf1f4d04ee190009b78bac',
  },
  resolvedAt: '2022-09-29T14:41:29.400Z',
  createdAt: '2022-09-29T14:41:29.401Z',
  updatedAt: '2022-09-29T14:41:29.401Z',
  updatedAtL: '2022-09-29T14:41:29.401Z',
  __v: 0,
};

describe('AgentActions', () => {
  beforeAll(() => {
    const spy = jest.spyOn(orderDetailSelector, 'getData');
    const refundSpy = jest.spyOn(orderRefundReasonsSelector, 'getData');
    spy.mockReturnValue(mockedMarketOrderDetail);
    refundSpy.mockReturnValue(mockedMarketOrderRefundReasons);
  });

  afterEach(cleanup);

  it('should render AgentAction component with modal closed', async () => {
    const { addUserPermissions } = await renderComponent({
      ui: (
        <AgentActions />
      ),
    });

    act(() => {
      addUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_CS_ACTIONS]);
    });
    const agentActionsButton = screen.getByLabelText('market-order-detail-agent-actions-button');
    expect(agentActionsButton).toBeInTheDocument();

    const modal = screen.queryByTestId('market-order-detail-agent-actions-modal');
    expect(modal).not.toBeInTheDocument();
  });

  it('should render AgentAction component and open the modal', async () => {
    const { addUserPermissions } = await renderComponent({
      ui: (
        <AgentActions />
      ),
    });

    act(() => {
      addUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_CS_ACTIONS]);
    });
    const agentActionsButton = screen.getByLabelText('market-order-detail-agent-actions-button');
    userEvent.click(agentActionsButton);

    await waitFor(() => {
      const modal = screen.queryByTestId('market-order-detail-agent-actions-modal');
      expect(modal).toBeInTheDocument();
    });
  });

  it('should render AgentAction component and display createdBy details', async () => {
    const { addUserPermissions } = await renderComponent({
      ui: (
        <AgentActions isFeedbackDetails feedback={mockFeedback} />
      ),
    });

    act(() => {
      addUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_CS_ACTIONS]);
    });
    const agentActionsButton = screen.getByTestId('market-order-feedback-detail');
    userEvent.click(agentActionsButton);

    await waitFor(() => {
      const feedbackCreatedBy = screen.getByTestId('market-order-detail-agent-actions-modal-feedback-createdBy');
      expect(feedbackCreatedBy).toBeInTheDocument();
    });
  });

  it('should render AgentAction and modal with discount flow + refund flow + feedback flow', async () => {
    const { addUserPermissions } = await renderComponent({
      ui: (
        <AgentActions />
      ),
    });

    act(() => {
      addUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_CS_ACTIONS]);
    });
    const agentActionsButton = screen.getByLabelText('market-order-detail-agent-actions-button');
    userEvent.click(agentActionsButton);

    await waitFor(() => {
      const discountSection = screen.queryByText('Discount');
      expect(discountSection).toBeInTheDocument();
    });

    await waitFor(() => {
      const refundFlow = screen.queryByText('Refund Type');
      expect(refundFlow).toBeInTheDocument();
    });

    await waitFor(() => {
      const feedbackFlow = screen.queryByText('Source');
      expect(feedbackFlow).toBeInTheDocument();
    });
  });

  it('should render AgentAction and modal with just Discount flow', async () => {
    const { addUserPermissions } = await renderComponent({
      ui: (
        <AgentActions />
      ),
    });

    act(() => {
      addUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_CS_ACTIONS]);
    });
    const agentActionsButton = screen.getByLabelText('market-order-detail-agent-actions-button');
    userEvent.click(agentActionsButton);

    let discountButton;
    await waitFor(() => {
      discountButton = screen.getByTestId('market-order-agent-actions-group-radio-button-add_discount');
    });
    userEvent.click(discountButton);

    await waitFor(() => {
      expect(screen.getByTestId('discount-form-container')).toBeInTheDocument();
    });
  });

  it('should render AgentAction component and close the modal', async () => {
    const { addUserPermissions } = await renderComponent({
      ui: (
        <AgentActions />
      ),
    });

    act(() => {
      addUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_CS_ACTIONS]);
    });
    const agentActionsButton = screen.getByLabelText('market-order-detail-agent-actions-button');
    userEvent.click(agentActionsButton);

    let modal;
    await waitFor(() => {
      modal = screen.queryByTestId('market-order-detail-agent-actions-modal');
      expect(modal).toBeInTheDocument();
    });

    const cancelButton = screen.getByLabelText('market-order-detail-agent-actions-modal-cancel');
    userEvent.click(cancelButton);
    await waitFor(() => expect(modal).not.toBeInTheDocument());
  });

  it('should render AgentAction component and have save button disabled', async () => {
    const { addUserPermissions } = await renderComponent({
      ui: (
        <AgentActions />
      ),
    });

    act(() => {
      addUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_CS_ACTIONS]);
    });
    const agentActionsButton = screen.getByLabelText('market-order-detail-agent-actions-button');
    userEvent.click(agentActionsButton);

    await waitFor(() => {
      const modal = screen.queryByTestId('market-order-detail-agent-actions-modal');
      expect(modal).toBeInTheDocument();
    });

    const submitButton = screen.getByLabelText('market-order-detail-agent-actions-modal-submit');
    expect(submitButton).toBeDisabled();
  });

  it('should render Feedback Detail button when isFeedbackDetails = true', async () => {
    const { addUserPermissions } = await renderComponent({
      ui: (
        <AgentActions isFeedbackDetails feedback={mockFeedback} />
      ),
    });

    act(() => {
      addUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_CS_ACTIONS]);
    });
    const feedbackDetailButton = screen.queryByTestId('market-order-feedback-detail');
    userEvent.click(feedbackDetailButton);

    const modal = await screen.findByTestId('market-order-detail-agent-actions-modal');
    expect(modal).toBeInTheDocument();

    const refundRadioButton = screen.getByTestId('market-order-agent-actions-group-radio-button-refund');
    const discountRadioButton = screen.getByTestId('market-order-agent-actions-group-radio-button-add_discount');

    expect(refundRadioButton).toBeDisabled();
    expect(discountRadioButton).toBeDisabled();

    expect(screen.getByTestId('discount-expiry-days-info')).toBeInTheDocument();

    const selectedSource = screen.getByLabelText('Telephone');
    expect(selectedSource).toBeDisabled();
    expect(selectedSource).toBeChecked();

    const selectedMainReason = screen.getByLabelText('Customer Service Issue');
    expect(selectedMainReason).toBeDisabled();
    expect(selectedMainReason).toBeChecked();

    const selectedSubReason = screen.getByLabelText('Attitude');
    expect(selectedSubReason).toBeDisabled();
    expect(selectedSubReason).toBeChecked();

    const noteInput = screen.queryByPlaceholderText('Add a note..');
    expect(noteInput).toHaveTextContent(mockFeedback.note);
    expect(noteInput).toBeDisabled();

    const franchiseChargeRadio = screen.getByLabelText('Do not Charge on Franchise');
    expect(franchiseChargeRadio).toBeChecked();
    expect(franchiseChargeRadio).toBeDisabled();

    const exchangeRadio = screen.getByLabelText('Exchange');
    expect(exchangeRadio).toBeChecked();
    expect(exchangeRadio).toBeDisabled();

    const cancelButton = screen.getByLabelText('market-order-detail-agent-actions-modal-cancel');
    userEvent.click(cancelButton);
    await waitFor(() => expect(modal).not.toBeInTheDocument());
  });
});
