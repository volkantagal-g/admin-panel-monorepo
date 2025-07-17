import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, fireEvent, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { orderDetailSelector } from '@app/pages/MarketOrder/OrderDetail/redux/selectors';

import renderComponent from '@test/publicUtils/renderComponent';

import { mockedMarketOrderDetail, mockedMarketOrderDetailWithFees } from '@shared/api/marketOrder/index.mock.data';
import RefundFlow from './RefundFlow';

const handleFormikValue = jest.fn();

const formikMock = {
  values: {
    refundType: null,
    partialRefundList: [],
    wholeRefundList: [],
    bagFee: false,
    deliveryFee: false,
    wholeRefundReason: null,
  },
  setFieldValue: handleFormikValue,
};

describe('[AgentActions][Flows] RefundFlow', () => {
  beforeAll(() => {
    const spy = jest.spyOn(orderDetailSelector, 'getData');
    spy.mockReturnValue(mockedMarketOrderDetail);
  });

  afterEach(() => {
    handleFormikValue.mockClear();
    cleanup();
  });

  it('should render RefundFlow', async () => {
    await renderComponent({
      ui: (
        <RefundFlow
          formValues={formikMock.values}
          handleFormValue={formikMock.setFieldValue}
        />
      ),
    });

    const refund = screen.queryByText('Refund');
    const noneRefund = screen.queryByText('None');

    expect(refund).toBeInTheDocument();
    expect(noneRefund).toBeInTheDocument();
  });

  it('should render RefundFlow and select refund', async () => {
    await renderComponent({
      ui: (
        <RefundFlow
          formValues={formikMock.values}
          handleFormValue={formikMock.setFieldValue}
        />
      ),
    });

    const refundButton = screen.getByTestId('market-order-agent-actions-group-radio-button-refund');

    userEvent.click(refundButton);
    expect(handleFormikValue).toHaveBeenCalledWith('refundType', 'refund');
  });

  it('should render RefundFlow and show refund table', async () => {
    await renderComponent({
      ui: (
        <RefundFlow
          formValues={{
            ...formikMock.values,
            refundType: 'refund',
          }}
          handleFormValue={formikMock.setFieldValue}
        />
      ),
    });

    const refundTable = screen.getByTestId('refund-market-order-modal-products-list');
    expect(refundTable).toBeInTheDocument();

    const checkboxServiceFee = screen.queryByRole('checkbox', { name: /Refund Service Fee/ });
    userEvent.click(checkboxServiceFee);
    expect(handleFormikValue).toHaveBeenCalledWith('serviceFee', true);
  });

  it('should call handleRefund properly', async () => {
    const spy = jest.spyOn(orderDetailSelector, 'getData');
    spy.mockReturnValue(mockedMarketOrderDetailWithFees);

    await renderComponent({
      ui: (
        <RefundFlow
          formValues={{
            ...formikMock.values,
            refundType: 'refund',
          }}
          handleFormValue={formikMock.setFieldValue}
        />
      ),
    });

    const input = screen.getByLabelText('refund-market-order-table-quantity-to-refund-input-5cf27249130f3a00011f4d99');
    fireEvent.change(input, { target: { value: 1 } });
    expect(handleFormikValue).toHaveBeenNthCalledWith(1, 'partialRefundList', [{
      count: 1,
      orderCount: 1,
      productId: '5cf27249130f3a00011f4d99',
    }]);
    expect(handleFormikValue).toHaveBeenNthCalledWith(2, 'products', [{
      count: 1,
      product: '5cf27249130f3a00011f4d99',
    }]);
  });

  it('should call handleWholeRefund properly', async () => {
    const spy = jest.spyOn(orderDetailSelector, 'getData');
    spy.mockReturnValue(mockedMarketOrderDetailWithFees);

    await renderComponent({
      ui: (
        <RefundFlow
          formValues={{
            ...formikMock.values,
            refundType: 'refund',
          }}
          handleFormValue={formikMock.setFieldValue}
        />
      ),
    });

    const wholeRefundCheckbox = screen.getByRole('checkbox', { name: 'Full Refund' });
    userEvent.click(wholeRefundCheckbox);

    expect(handleFormikValue).toHaveBeenNthCalledWith(1, 'partialRefundList', [{
      count: 1,
      productId: '5cf27249130f3a00011f4d99',
    }, {
      count: 1,
      productId: '57075944cde6070300eb5d10',
    }, {
      count: 1,
      productId: '5ce65817fd9b330001c4a834',
    }]);
    expect(handleFormikValue).toHaveBeenNthCalledWith(2, 'products', [{
      count: 1,
      product: '5cf27249130f3a00011f4d99',
    }, {
      count: 1,
      product: '57075944cde6070300eb5d10',
    }, {
      count: 1,
      product: '5ce65817fd9b330001c4a834',
    }]);
  });
});
