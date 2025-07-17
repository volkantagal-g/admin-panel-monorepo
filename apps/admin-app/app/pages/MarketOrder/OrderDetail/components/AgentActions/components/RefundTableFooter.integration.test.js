import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { orderDetailSelector } from '@app/pages/MarketOrder/OrderDetail/redux/selectors';

import renderComponent from '@test/publicUtils/renderComponent';
import RefundTableFooter from './RefundTableFooter';
import { mockedMarketOrderDetail, mockedMarketOrderDetailFullRefunded, mockedMarketOrderDetailWithFees } from '@shared/api/marketOrder/index.mock.data';

const formikMock = {
  values: {
    partialRefundList: [],
    wholeRefundList: [],
    bagFee: false,
    deliveryFee: false,
  },
};

describe('RefundTableFooter', () => {
  let handleCheckboxMock;
  let handleWholeRefundListMock;
  let handleIsWholeRefundMock;

  beforeEach(() => {
    const spy = jest.spyOn(orderDetailSelector, 'getData');
    spy.mockReturnValue(mockedMarketOrderDetail);

    handleCheckboxMock = jest.fn();
    handleWholeRefundListMock = jest.fn();
    handleIsWholeRefundMock = jest.fn();
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it('should set right disabled property to checkbox fee', async () => {
    await renderComponent({
      ui: (
        <RefundTableFooter
          formValues={formikMock.values}
          handleCheckbox={handleCheckboxMock}
          handleWholeRefundList={handleWholeRefundListMock}
          isWholeRefund={false}
          setIsWholeRefund={handleIsWholeRefundMock}
        />
      ),
    });

    const checkboxBagFee = screen.queryByRole('checkbox', { name: /Refund Bag Fee/ });
    const checkboxDeliveryFee = screen.queryByRole('checkbox', { name: /Delivery Fee/ });
    const checkboxServiceFee = screen.queryByRole('checkbox', { name: /Service Fee/ });

    expect(checkboxBagFee).toBeInTheDocument();
    expect(checkboxDeliveryFee).toBeInTheDocument();

    expect(checkboxBagFee).toBeDisabled();
    expect(checkboxDeliveryFee).toBeDisabled();
    expect(checkboxServiceFee).toBeEnabled();
  });

  it('should check full refund option', async () => {
    await renderComponent({
      ui: (
        <RefundTableFooter
          formValues={formikMock.values}
          handleCheckbox={handleCheckboxMock}
          handleWholeRefundList={handleWholeRefundListMock}
          isWholeRefund={false}
          setIsWholeRefund={handleIsWholeRefundMock}
        />
      ),
    });

    const wholeRefundCheckbox = screen.queryByRole('checkbox', { name: 'Full Refund' });
    expect(wholeRefundCheckbox).toBeInTheDocument();

    userEvent.click(wholeRefundCheckbox);
    expect(handleCheckboxMock).toHaveBeenCalledWith({ target: { name: 'bagFee', checked: false } });
    expect(handleWholeRefundListMock).toHaveBeenCalledWith([{ count: 1, productId: '57075944cde6070300eb5d10' }]);
    expect(handleIsWholeRefundMock).toHaveBeenCalledWith(true);
  });

  it('should check full refund option at footer with all fees', async () => {
    const spy = jest.spyOn(orderDetailSelector, 'getData');
    spy.mockReturnValue(mockedMarketOrderDetailWithFees);

    await renderComponent({
      ui: (
        <RefundTableFooter
          formValues={formikMock.values}
          handleCheckbox={handleCheckboxMock}
          handleWholeRefundList={handleWholeRefundListMock}
          isWholeRefund={false}
          setIsWholeRefund={handleIsWholeRefundMock}
        />
      ),
    });

    const wholeRefundCheckbox = screen.getByRole('checkbox', { name: 'Full Refund' });
    userEvent.click(wholeRefundCheckbox);
    expect(handleCheckboxMock).toHaveBeenNthCalledWith(1, { target: { name: 'bagFee', checked: true } });
    expect(handleCheckboxMock).toHaveBeenNthCalledWith(2, { target: { name: 'deliveryFee', checked: true } });
    expect(handleCheckboxMock).toHaveBeenNthCalledWith(3, { target: { name: 'serviceFee', checked: true } });
  });

  it('should uncheck full refund option at footer', async () => {
    await renderComponent({
      ui: (
        <RefundTableFooter
          formValues={formikMock.values}
          handleCheckbox={handleCheckboxMock}
          handleWholeRefundList={handleWholeRefundListMock}
          isWholeRefund={false}
          setIsWholeRefund={handleIsWholeRefundMock}
        />
      ),
    });

    const wholeRefundCheckbox = screen.getByRole('checkbox', { name: 'Full Refund' });

    userEvent.click(wholeRefundCheckbox);
    expect(wholeRefundCheckbox).toBeChecked();

    userEvent.click(wholeRefundCheckbox);
    expect(wholeRefundCheckbox).not.toBeChecked();

    expect(handleCheckboxMock).toHaveBeenNthCalledWith(3, { target: { name: 'serviceFee', checked: true } });
    expect(handleWholeRefundListMock).toHaveBeenNthCalledWith(2, []);
  });

  it('should have full refund option disabled', async () => {
    const spy = jest.spyOn(orderDetailSelector, 'getData');
    spy.mockReturnValue(mockedMarketOrderDetailFullRefunded);

    await renderComponent({
      ui: (
        <RefundTableFooter
          formValues={formikMock.values}
          handleCheckbox={handleCheckboxMock}
          handleWholeRefundList={handleWholeRefundListMock}
          isWholeRefund={false}
          setIsWholeRefund={handleIsWholeRefundMock}
        />
      ),
    });

    const wholeRefundCheckbox = screen.getByRole('checkbox', { name: 'Full Refund' });
    expect(wholeRefundCheckbox).toBeDisabled();
  });

  it('should render right financial order details', async () => {
    await renderComponent({
      ui: (
        <RefundTableFooter
          formValues={formikMock.values}
          handleCheckbox={handleCheckboxMock}
          handleWholeRefundList={handleWholeRefundListMock}
          isWholeRefund={false}
          setIsWholeRefund={handleIsWholeRefundMock}
        />
      ),
    });

    const [basketAmount, totalRefundAmount] = screen.queryAllByText('TRY 15.90');
    const bagPrice = screen.queryByText('Bag Price');
    const deliveryFee = screen.queryByText('Delivery Fee');
    const serviceFee = screen.queryByText('Service Fee');
    const promo = screen.queryByText('Promo');
    const promoCode = screen.queryByText('RELMOQKIT');

    expect(basketAmount).toBeInTheDocument();
    expect(totalRefundAmount).toBeInTheDocument();
    expect(bagPrice).not.toBeInTheDocument();
    expect(deliveryFee).not.toBeInTheDocument();
    expect(serviceFee).not.toBeInTheDocument();
    expect(promo).toBeInTheDocument();
    expect(promoCode).toBeInTheDocument();
  });

  it('should render right fee financial order details', async () => {
    const spy = jest.spyOn(orderDetailSelector, 'getData');
    spy.mockReturnValue({
      ...mockedMarketOrderDetail,
      bagFeeRefundStatus: { isRefunded: true },
      deliveryFeeRefundStatus: { isRefunded: true },
      serviceFeeRefundStatus: { isRefunded: true },
    });

    await renderComponent({
      ui: (
        <RefundTableFooter
          formValues={formikMock.values}
          handleCheckbox={handleCheckboxMock}
          handleWholeRefundList={handleWholeRefundListMock}
          isWholeRefund={false}
          setIsWholeRefund={handleIsWholeRefundMock}
        />
      ),
    });

    const bagPrice = screen.queryByText('Bag Price');
    const deliveryFee = screen.queryByText('Delivery Fee');
    const serviceFee = screen.queryByText('Service Fee');

    expect(bagPrice).toBeInTheDocument();
    expect(deliveryFee).toBeInTheDocument();
    expect(serviceFee).toBeInTheDocument();
  });

  it('should disabled checkbox fee and refund fee checkboxes when isFeedbackDetails is true', async () => {
    await renderComponent({
      ui: (
        <RefundTableFooter
          formValues={formikMock.values}
          handleCheckbox={handleCheckboxMock}
          handleWholeRefundList={handleWholeRefundListMock}
          isWholeRefund={false}
          setIsWholeRefund={handleIsWholeRefundMock}
          isFeedbackDetails
        />
      ),
    });

    const checkboxBagFee = screen.queryByRole('checkbox', { name: /Refund Bag Fee/ });
    const checkboxDeliveryFee = screen.queryByRole('checkbox', { name: /Delivery Fee/ });

    expect(checkboxBagFee).toBeDisabled();
    expect(checkboxDeliveryFee).toBeDisabled();
  });
});
