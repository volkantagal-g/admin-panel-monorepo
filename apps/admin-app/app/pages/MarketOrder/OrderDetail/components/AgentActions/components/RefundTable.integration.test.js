import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import { orderDetailSelector } from '@app/pages/MarketOrder/OrderDetail/redux/selectors';

import renderComponent from '@test/publicUtils/renderComponent';

import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';
import RefundTable from './RefundTable';

const formikMock = {
  values: {
    partialRefundList: [],
    wholeRefundList: [],
    bagFee: false,
    deliveryFee: false,
  },
};

describe('[AgentActions][Components] RefundTable', () => {
  beforeAll(() => {
    const spy = jest.spyOn(orderDetailSelector, 'getData');
    spy.mockReturnValue(mockedMarketOrderDetail);
  });

  describe('Partial refund - isFeedbackDetails (From feedback list)', () => {
    afterEach(cleanup);

    it('should render RefundTable with read only mode when isFeedbackDetails is true', async () => {
      await renderComponent({
        ui: (
          <RefundTable
            formValues={formikMock.values}
            onInputChange={jest.fn()}
            handleCheckbox={jest.fn()}
            handleWholeRefundList={jest.fn()}
            isFeedbackDetails
          />
        ),
      });

      const table = screen.getByTestId('refund-market-order-modal-products-list');
      expect(table).toBeInTheDocument();

      const refundInput = screen.getByTestId('refund-market-order-table-quantity-to-refund-input');
      expect(refundInput).toBeDisabled();
    });
  });

  describe('Partial refund', () => {
    afterAll(cleanup);

    it('should render RefundTable with not an error', async () => {
      await renderComponent({
        ui: (
          <RefundTable
            formValues={formikMock.values}
            onInputChange={jest.fn()}
            handleCheckbox={jest.fn()}
            handleWholeRefundList={jest.fn()}
          />
        ),
      });

      const table = screen.getByTestId('refund-market-order-modal-products-list');
      expect(table).toBeInTheDocument();
    });

    it('should render right quantity ordered', () => {
      const [quantityOrderedFirst, quantityOrderedSecond, quantityOrderedThird] = screen.getAllByTestId('refund-market-order-table-quantity-ordered');
      expect(quantityOrderedFirst).toBeInTheDocument();
      expect(quantityOrderedSecond).toBeInTheDocument();
      expect(quantityOrderedThird).toBeInTheDocument();

      expect(quantityOrderedFirst.innerHTML).toBe('1');
      expect(quantityOrderedSecond.innerHTML).toBe('1');
      expect(quantityOrderedThird.innerHTML).toBe('1');
    });

    it('should render right quantity refunded', () => {
      const [quantityRefundedFirst, quantityRefundedSecond, quantityRefundedThird] = screen.getAllByTestId('refund-market-order-table-quantity-refunded');
      expect(quantityRefundedFirst).toBeInTheDocument();
      expect(quantityRefundedSecond).toBeInTheDocument();
      expect(quantityRefundedThird).toBeInTheDocument();

      expect(quantityRefundedFirst.innerHTML).toBe('1');
      expect(quantityRefundedSecond.innerHTML).toBe('0');
      expect(quantityRefundedThird.innerHTML).toBe('1');
    });

    it('should render right component in to refund column', () => {
      const quantityToRefundInput = screen.getByTestId('refund-market-order-table-quantity-to-refund-input');
      const [quantityToRefundAlertFirst, quantityToRefundAlertSecond] = screen.getAllByTestId('refund-market-order-table-quantity-to-refund-alert');
      expect(quantityToRefundInput).toBeInTheDocument();
      expect(quantityToRefundAlertFirst).toBeInTheDocument();
      expect(quantityToRefundAlertSecond).toBeInTheDocument();

      expect(quantityToRefundInput.tagName).toBe('INPUT');
      expect(quantityToRefundAlertFirst.innerHTML).toContain('Fully refunded');
      expect(quantityToRefundAlertSecond.innerHTML).toContain('Fully refunded');
    });

    it('should render right amount refunded', () => {
      const [firstProductAmount, secondProductAmount, thirdProductAmount] = screen.getAllByTestId('refund-market-order-table-amount');
      expect(firstProductAmount).toBeInTheDocument();
      expect(secondProductAmount).toBeInTheDocument();
      expect(thirdProductAmount).toBeInTheDocument();

      expect(firstProductAmount.innerHTML).toContain('5.45');
      expect(secondProductAmount.innerHTML).toContain('0.00');
      expect(thirdProductAmount.innerHTML).toContain('10.45');
    });
  });
});
