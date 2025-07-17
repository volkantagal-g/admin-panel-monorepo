import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import FeedbackModal from '.';
import { operationalCountriesSelector as countriesSelector } from '@shared/redux/selectors/common';
import { getMarketOrderSelector, getMissingProductOrdersSelector } from '../../redux/selectors';
import { mockedMarketOrderDetail, mockedMissingProductOrders } from '@shared/api/marketOrder/index.mock.data';
import { expectTableToHaveColumnNames } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';

describe('Missing Products FeedbackModal Component', () => {
  let renderResult;
  beforeAll(async () => {
    const spyCountries = jest.spyOn(countriesSelector, 'getData');
    const spyMissingProducts = jest.spyOn(getMissingProductOrdersSelector, 'getData');
    const spyMarketOrder = jest.spyOn(getMarketOrderSelector, 'getData');
    spyCountries.mockReturnValue([]);
    spyMissingProducts.mockReturnValue(mockedMissingProductOrders);
    spyMarketOrder.mockReturnValue(mockedMarketOrderDetail);
    renderResult = await renderComponent({
      ui: <FeedbackModal
        isModalOpen
        marketOrderId={mockedMissingProductOrders[0]._id}
      />,
    });
  });

  it('should render Missing Products FeedbackModal Component without error', async () => {
    const component = screen.getByTestId('missing-product-order-modal');
    expect(component).toBeInTheDocument();
  });
  it('should render modal', async () => {
    const form = screen.getByTestId('modal-form');
    expect(form).toBeInTheDocument();
  });
  it('should render radio buttons', () => {
    expect(screen.getByRole('radio', { name: 'Refund' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Unable to Reach' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Discount' })).toBeInTheDocument();
  });
  it('should render submit and cancel buttons', () => {
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });
  it('should render products table', () => {
    const table = screen.getByTestId('products-table');
    expectTableToHaveColumnNames(table, ['Product', 'Count', 'Amount']);
  });
  it('should render missing product option buttons', () => {
    expect(screen.getByRole('button', { name: 'Telephone' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mail' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Warehouse' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Other' })).toBeInTheDocument();
  });
  it('should render refund bag & delivery fee options when refund radio btn is selected', () => {
    const refundRadioButton = screen.getByRole('radio', { name: 'Refund' });
    fireEvent.click(refundRadioButton);
    expect(refundRadioButton).toBeChecked();
    const partialRefundDiv = screen.getByTestId('refund-section');
    expect(partialRefundDiv).toBeInTheDocument();
  });
  it('should not render checked discount radio if permission is missing', () => {
    const discountRadioButton = screen.getByRole('radio', { name: 'Discount' });
    fireEvent.click(discountRadioButton);
    expect(discountRadioButton).not.toBeChecked();
  });

  it('should render discount form when discount radio btn is selected', () => {
    const { addUserPermissions } = renderResult;
    addUserPermissions([permKey.PAGE_GETIR_MARKET_ORDER_DETAIL_CS_ACTIONS]);
    const discountRadioButton = screen.getByRole('radio', { name: 'Discount' });
    fireEvent.click(discountRadioButton);
    expect(discountRadioButton).toBeChecked();
    const discountDiv = screen.getByTestId('discount-section');
    expect(discountDiv).toBeInTheDocument();
  });
});
