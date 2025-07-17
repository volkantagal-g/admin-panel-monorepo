import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { orderDetailSelector, orderRefundReasonsSelector } from '@app/pages/MarketOrder/OrderDetail/redux/selectors';

import renderComponent from '@test/publicUtils/renderComponent';

import { mockedMarketOrderDetail, mockedMarketOrderDetailWithoutPartialRefunds, mockedMarketOrderRefundReasons } from '@shared/api/marketOrder/index.mock.data';
import FeedbackFlow from './FeedbackFlow';
import { MARKET_ORDER_REFUND } from '../../../constants';

const feedbackMock = {
  source: null,
  mainReason: null,
  subReason: null,
  note: '',
  skt: null,
  isFranchiseFault: false,
  isProductsExchanged: false,
};

const handleFeedbackMock = jest.fn();

describe('[AgentActions][Flows] FeedbackFlow', () => {
  beforeAll(() => {
    const spy = jest.spyOn(orderDetailSelector, 'getData');
    const refundSpy = jest.spyOn(orderRefundReasonsSelector, 'getData');
    spy.mockReturnValue(mockedMarketOrderDetail);
    refundSpy.mockReturnValue(mockedMarketOrderRefundReasons);
  });

  afterEach(cleanup);

  it('should render FeedbackFlow', async () => {
    await renderComponent({
      ui: (
        <FeedbackFlow
          feedback={feedbackMock}
          handleFeedback={handleFeedbackMock}
          feedbackProducts={[]}
          refundType={null}
        />
      ),
    });

    const source = screen.queryByText('Source');
    const mainReason = screen.queryByText('Main Reason');
    const subReason = screen.queryByText('Sub Reason');
    const notes = screen.queryByText('Note');
    const sktDate = screen.queryByText('Best Before Date close/passed');
    const products = screen.queryByText('Products');

    expect(source).toBeInTheDocument();
    expect(mainReason).not.toBeInTheDocument();
    expect(subReason).not.toBeInTheDocument();
    expect(notes).not.toBeInTheDocument();
    expect(sktDate).not.toBeInTheDocument();
    expect(products).not.toBeInTheDocument();
  });

  it('should render FeedbackFlow and select Source and MainReason', async () => {
    const dynamicFeedback = { ...feedbackMock };

    const { rerender } = await renderComponent({
      ui: (
        <FeedbackFlow
          feedback={dynamicFeedback}
          handleFeedback={handleFeedbackMock}
          feedbackProducts={[]}
          refundType={null}
        />
      ),
    });

    const source = screen.queryByText('Source');
    expect(source).toBeInTheDocument();

    const chatSourceInput = screen.getByTestId('market-order-agent-actions-group-radio-button-chat');
    expect(chatSourceInput).toBeInTheDocument();

    userEvent.click(chatSourceInput);
    await waitFor(() => {
      dynamicFeedback.source = 5;
      expect(handleFeedbackMock).toHaveBeenCalledWith('feedback', { ...dynamicFeedback });
    });

    rerender(<FeedbackFlow
      feedback={{ ...dynamicFeedback }}
      handleFeedback={handleFeedbackMock}
      feedbackProducts={[]}
      refundType={null}
    />);

    const mainReason = screen.queryByText('Main Reason');
    expect(mainReason).toBeInTheDocument();

    const productIssueMainReasonInput = screen.getByTestId('market-order-agent-actions-group-radio-button-busy');
    expect(productIssueMainReasonInput).toBeInTheDocument();

    userEvent.click(productIssueMainReasonInput);
    await waitFor(() => {
      dynamicFeedback.mainReason = 14;
      expect(handleFeedbackMock).toHaveBeenCalledWith('feedback', { ...dynamicFeedback });
    });

    rerender(<FeedbackFlow
      feedback={{ ...dynamicFeedback }}
      handleFeedback={handleFeedbackMock}
      feedbackProducts={[]}
      refundType={null}
    />);

    const subReason = screen.queryByText('Sub Reason');
    expect(subReason).toBeInTheDocument();

    const note = screen.queryByText('Note');
    expect(note).toBeInTheDocument();

    const checkboxGroup = screen.queryByTestId('market-order-feedback-action-checkboxes-group');
    expect(checkboxGroup).toBeInTheDocument();

    const products = screen.queryByText('Products');
    expect(products).not.toBeInTheDocument();

    const skt = screen.queryByText('Best Before Date close/passed');
    expect(skt).not.toBeInTheDocument();
  });

  it('should render FeedbackFlow and select checkboxes', async () => {
    const dynamicFeedback = { ...feedbackMock, source: 2, mainReason: 1, subReason: 2 };

    await renderComponent({
      ui: (
        <FeedbackFlow
          feedback={dynamicFeedback}
          handleFeedback={handleFeedbackMock}
          feedbackProducts={[]}
          refundType={null}
        />
      ),
    });

    const checkboxGroup = screen.queryByTestId('market-order-feedback-action-checkboxes-group');
    expect(checkboxGroup).toBeInTheDocument();

    const [isFranchiseFault] = screen.getAllByRole('checkbox');

    userEvent.click(isFranchiseFault);
    await waitFor(() => {
      dynamicFeedback.isFranchiseFault = true;
      expect(handleFeedbackMock).toHaveBeenCalledWith('feedback', { ...dynamicFeedback, isFranchiseFault: true });
    });
  });

  it('should render FeedbackFlow with single products table', async () => {
    const dynamicFeedback = { ...feedbackMock, source: 2, mainReason: 1, subReason: 6 };

    await renderComponent({
      ui: (
        <FeedbackFlow
          feedback={dynamicFeedback}
          handleFeedback={handleFeedbackMock}
          feedbackProducts={[]}
          refundType={null}
        />
      ),
    });

    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('should render FeedbackFlow without single products table', async () => {
    const dynamicFeedback = { ...feedbackMock, source: 2, mainReason: 1, subReason: 6 };

    await renderComponent({
      ui: (
        <FeedbackFlow
          feedback={dynamicFeedback}
          handleFeedback={handleFeedbackMock}
          feedbackProducts={[]}
          refundType={MARKET_ORDER_REFUND}
        />
      ),
    });

    const singleProductsTable = screen.queryByText('Products');
    expect(singleProductsTable).not.toBeInTheDocument();
  });

  it('should render FeedbackFlow and choose products', async () => {
    const spy = jest.spyOn(orderDetailSelector, 'getData');
    spy.mockReturnValue(mockedMarketOrderDetailWithoutPartialRefunds);

    const dynamicFeedback = { ...feedbackMock, source: 2, mainReason: 1 };
    let feedbackProducts = [];

    const { rerender } = await renderComponent({
      ui: (
        <FeedbackFlow
          feedback={dynamicFeedback}
          handleFeedback={handleFeedbackMock}
          feedbackProducts={feedbackProducts}
        />
      ),
    });

    expect(screen.getByText('Products')).toBeInTheDocument();
    const productQuantityInput1 = screen.getByLabelText('market-order-feedback-action-products-table-quantity-input-57075944cde6070300eb5d10');
    const productQuantityInput2 = screen.getByLabelText('market-order-feedback-action-products-table-quantity-input-5cf27249130f3a00011f4d99');

    expect(productQuantityInput1).toBeInTheDocument();

    fireEvent.change(productQuantityInput1, { target: { value: 1 } });
    feedbackProducts = [{
      product: '57075944cde6070300eb5d10',
      count: 1,
    }];
    expect(handleFeedbackMock).toHaveBeenCalledWith('products', feedbackProducts);

    rerender(
      <FeedbackFlow
        feedback={dynamicFeedback}
        feedbackProducts={feedbackProducts}
        handleFeedback={handleFeedbackMock}
      />,
    );

    fireEvent.change(productQuantityInput2, { target: { value: 3 } });
    feedbackProducts = [{
      product: '57075944cde6070300eb5d10',
      count: 1,
    }, {
      product: '5cf27249130f3a00011f4d99',
      count: 3,
    }];
    expect(handleFeedbackMock).toHaveBeenCalledWith('products', feedbackProducts);

    rerender(
      <FeedbackFlow
        feedback={dynamicFeedback}
        feedbackProducts={feedbackProducts}
        handleFeedback={handleFeedbackMock}
      />,
    );

    fireEvent.change(productQuantityInput2, { target: { value: 1 } });
    feedbackProducts = [{
      product: '57075944cde6070300eb5d10',
      count: 1,
    }, {
      product: '5cf27249130f3a00011f4d99',
      count: 1,
    }];
    expect(handleFeedbackMock).toHaveBeenCalledWith('products', feedbackProducts);

    rerender(
      <FeedbackFlow
        feedback={dynamicFeedback}
        feedbackProducts={feedbackProducts}
        handleFeedback={handleFeedbackMock}
      />,
    );

    fireEvent.change(productQuantityInput1, { target: { value: 0 } });
    feedbackProducts = [{
      product: '5cf27249130f3a00011f4d99',
      count: 1,
    }];
    expect(handleFeedbackMock).toHaveBeenCalledWith('products', feedbackProducts);
  });

  it('should render FeedbackFlow with skt', async () => {
    const dynamicFeedback = { ...feedbackMock, source: 2, mainReason: 2, subReason: 9 };

    await renderComponent({
      ui: (
        <FeedbackFlow
          feedback={dynamicFeedback}
          handleFeedback={handleFeedbackMock}
          feedbackProducts={[]}
          refundType={null}
        />
      ),
    });

    expect(screen.getAllByText('Best Before Date Passed')[1]).toBeInTheDocument();
  });

  it('should render FeedbackFlow and add a note', async () => {
    const dynamicFeedback = { ...feedbackMock, source: 2, mainReason: 2, subReason: 9 };

    await renderComponent({
      ui: (
        <FeedbackFlow
          feedback={dynamicFeedback}
          handleFeedback={handleFeedbackMock}
          feedbackProducts={[]}
          refundType={null}
        />
      ),
    });

    const note = screen.queryByText('Note');
    expect(note).toBeInTheDocument();

    const noteInput = screen.queryByPlaceholderText('Add a note..');
    fireEvent.change(noteInput, { target: { value: 'some random note' } });
    expect(handleFeedbackMock).toHaveBeenCalledWith('feedback', { ...dynamicFeedback, note: 'some random note' });
  });
});
