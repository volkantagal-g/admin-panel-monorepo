import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { orderDetailSelector } from '@app/pages/MarketOrder/OrderDetail/redux/selectors';

import renderComponent from '@test/publicUtils/renderComponent';

import { mockedMarketOrderDetail as mockOrderDetail } from '@shared/api/marketOrder/index.mock.data';

import DiscountFlow from './DiscountFlow';

const mockedMarketOrderDetail = {
  ...mockOrderDetail,
  basket: {
    ...mockOrderDetail.basket,
    calculation: { totalAmount: 45.8 },
  },

};

const feedbackMock = {
  source: null,
  mainReason: null,
  subReason: null,
  note: '',
  skt: null,
  isFranchiseFault: false,
  isProductsExchanged: false,
  hasDiscount: false,
  discount: {
    client: '123',
    title: {
      tr: 'Size özel ₺10 indirim!',
      en: '₺10 discount for you!',
    },
    createdBy: '',
    discountAmount: 2,
    isBalanceEnabled: false,
    countryCode: 'TR',
    deliveryFee: {
      doNotCharge: true,
      amount: null,
    },
    validDayAmount: 180,
    doNotApplyMinimumBasketSize: true,
    domainTypes: [1],
  },
};

const handleDiscountFormMock = jest.fn();

describe('[AgentActions][Flows] DiscountFlow', () => {
  beforeAll(() => {
    const spy = jest.spyOn(orderDetailSelector, 'getData');
    spy.mockReturnValue(mockedMarketOrderDetail);
  });

  afterEach(cleanup);

  it('should render DiscountFlow', async () => {
    await renderComponent({
      ui: (
        <DiscountFlow
          feedbackFormValues={feedbackMock}
          handleDiscountForm={handleDiscountFormMock}
          orderDetail={mockedMarketOrderDetail}
        />
      ),
    });

    const discount = screen.queryByText('Discount');
    const discountButton = screen.getByTestId('market-order-agent-actions-group-radio-button-add_discount');

    expect(discount).toBeInTheDocument();
    expect(discountButton).toBeInTheDocument();
  });

  it('should render DiscountFlow and select Discount option to render discount form', async () => {
    const { rerender } = await renderComponent({
      ui: (
        <DiscountFlow
          feedbackFormValues={feedbackMock}
          handleDiscountForm={handleDiscountFormMock}
          orderDetail={mockedMarketOrderDetail}
        />
      ),
    });

    const discount = screen.queryByText('Discount');
    expect(discount).toBeInTheDocument();

    const discountRadioButton = screen.getByTestId('market-order-agent-actions-group-radio-button-add_discount');
    expect(discountRadioButton).toBeInTheDocument();

    userEvent.click(discountRadioButton);
    await waitFor(() => {
      feedbackMock.hasDiscount = true;
      expect(handleDiscountFormMock).toHaveBeenCalledWith('hasDiscount', true);
    });

    rerender(<DiscountFlow
      feedbackFormValues={feedbackMock}
      handleDiscountForm={handleDiscountFormMock}
      orderDetail={mockedMarketOrderDetail}
    />);

    expect(screen.getByTestId('discount-form-container')).toBeInTheDocument();

    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByTestId('discount-country-input')).toHaveValue('🇹🇷\tTurkey');
    expect(screen.getByTestId('discount-country-input')).toBeInTheDocument();

    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByTestId('discount-amount')).toHaveValue(feedbackMock.discount.amount);
    expect(screen.getByText(`Amount should be less than Total Price ₺${mockedMarketOrderDetail.basket.calculation.totalAmount}`)).toBeInTheDocument();

    expect(screen.getByText('Expiry')).toBeInTheDocument();
    expect(screen.getByTestId('discount-expiry-days')).toHaveValue(feedbackMock.discount.validDayAmount);

    expect(screen.getByText('Delivery Fee')).toBeInTheDocument();
    expect(screen.getByTestId('discount-delivery-fee-amount')).toBeDisabled();
    expect(screen.getByText('No Delivery Fee charged for this order')).toBeInTheDocument();

    expect(screen.getByText('Title - English')).toBeInTheDocument();
    expect(screen.getByTestId('discount-amount-title-en')).toHaveValue(feedbackMock.discount.title.en);

    expect(screen.getByText('Title - Turkish')).toBeInTheDocument();
    expect(screen.getByTestId('discount-amount-title-tr')).toHaveValue(feedbackMock.discount.title.tr);
  });

  it('should render DiscountFlow and Discount Form with Delivery Fee selection', async () => {
    const { rerender } = await renderComponent({
      ui: (
        <DiscountFlow
          feedbackFormValues={feedbackMock}
          handleDiscountForm={handleDiscountFormMock}
          orderDetail={mockedMarketOrderDetail}
        />
      ),
    });

    const discount = screen.queryByText('Discount');
    expect(discount).toBeInTheDocument();

    const discountRadioButton = screen.getByTestId('market-order-agent-actions-group-radio-button-add_discount');
    expect(discountRadioButton).toBeInTheDocument();

    userEvent.click(discountRadioButton);
    await waitFor(() => {
      feedbackMock.hasDiscount = true;
      expect(handleDiscountFormMock).toHaveBeenCalledWith('hasDiscount', true);
    });

    rerender(<DiscountFlow
      feedbackFormValues={feedbackMock}
      handleDiscountForm={handleDiscountFormMock}
      orderDetail={mockedMarketOrderDetail}
    />);

    expect(screen.getByTestId('discount-delivery-fee-amount')).toBeDisabled();

    const deliveryFeeCheckBox = screen.getByTestId('discount-delivery-fee');
    expect(deliveryFeeCheckBox).toBeChecked();
    expect(screen.getByTestId('discount-do-not-apply-minimum-basket-size')).toBeInTheDocument();

    userEvent.click(deliveryFeeCheckBox);
    await waitFor(() => {
      feedbackMock.discount = {
        ...feedbackMock.discount,
        deliveryFee: {
          amount: 0,
          doNotCharge: false,
        },
      };
      expect(handleDiscountFormMock).toHaveBeenCalledWith('discount', feedbackMock.discount);
    });

    rerender(<DiscountFlow
      feedbackFormValues={feedbackMock}
      handleDiscountForm={handleDiscountFormMock}
      orderDetail={mockedMarketOrderDetail}
    />);
    expect(deliveryFeeCheckBox).not.toBeChecked();
    expect(screen.getByTestId('discount-delivery-fee-amount')).toBeEnabled();
    expect(screen.getByTestId('discount-delivery-fee-amount')).toHaveValue(`${feedbackMock.discount.deliveryFee.amount.toFixed(2)}`);
  });
});
