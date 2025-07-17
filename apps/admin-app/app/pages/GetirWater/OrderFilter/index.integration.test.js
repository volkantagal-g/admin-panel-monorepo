import { screen } from '@testing-library/react';

import { ENVIRONMENT } from '@shared/config';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectTableToHaveColumnNames, expectToHavePageHeaderText } from '@test/publicUtils/assertions';

import { getOrderStatus, generateColumns } from './components/DataTable/config';
import PageComponent from '.';

const pageUrl = '/getirWater/orderFilter';

describe('Order Filter', () => {
  it('should render page without error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_GETIR_WATER_ORDER_FILTER,
      pageUrl,
      pageComponent: PageComponent,
    });

    expectToHavePageHeaderText('Getir Water Order Filter');
    await waitPageToRenderSomething();

    const orderInformationTableContainer = screen.getByTestId('orderDataTable');

    const filterSummaryTableContainer = screen.getByTestId('orderFilter');

    expect(orderInformationTableContainer).toBeInTheDocument();
    expect(filterSummaryTableContainer).toBeInTheDocument();
    expectTableToHaveColumnNames(orderInformationTableContainer, [
      'Order',
      'Confirmation Code',
      'Price',
      'Customer Name',
      'Brand',
      'Vendor',
      'City',
      'Cart Date',
      'Order Date',
      'Status',
      'Action',
      'Cancel Reason',
    ]);
  });

  it('should get order status working', () => {
    const inCompleteOrderStatus = getOrderStatus(100);

    expect(inCompleteOrderStatus).toEqual('incomplete');

    const successOrderStatus = getOrderStatus(900);

    expect(successOrderStatus).toEqual('success');

    const activeOrderStatus = getOrderStatus(500);

    expect(activeOrderStatus).toEqual('active');

    const cancelledOrderStatus = getOrderStatus(1600);
    expect(cancelledOrderStatus).toEqual('cancelled');
  });

  it('should generate columns', () => {
    const tSpy = jest.fn(str => str);

    const columns = generateColumns(1, tSpy, 1290);

    expect(columns).toHaveLength(13);
    expect(tSpy).toHaveBeenCalledTimes(13);
  });

  it('should render columns without an error', () => {
    const { REACT_APP_WATER_PANEL_URL: WATER_URL } = ENVIRONMENT;

    const tSpy = jest.fn(str => str);
    const columns = generateColumns(1, tSpy, 1290);

    expect(columns[7].render('2021-12-10')).toEqual('10 12 2021, 00:00:00');
    expect(columns[2].render(10)).toEqual('10.00 ₺');

    expect(columns[3].render({ customerId: '9898', customerName: 'Kadir Osman' }).props.href).toBe('/client/detail/9898');
    expect(columns[3].render({ customerId: '9898', customerName: 'Kadir Osman' }).props.target).toBe('_blank');

    expect(columns[5].render({ vendorId: '9898', vendorName: 'Kadir Osman Bayi' }).props.href).toBe(`${WATER_URL}/9898`);
    expect(columns[5].render({ vendorId: '9898', vendorName: 'Kadir Osman Bayi' }).props.target).toBe('_blank');
    expect(columns[8].render('2021-10-10')).toEqual('10 10 2021, 00:00:00');
  });
});

// describe('Order Filter Page DateRange Select', () => {
//   it('should select date range', async () => {
//     await renderPage({
//       pagePermKey: permKey.PAGE_GETIR_WATER_ORDER_FILTER,
//       pageUrl,
//       pageComponent: PageComponent,
//     });

//     const inputs = screen.getByTestId('dateRangePicker');
//     const startDateInput = within(inputs).getByPlaceholderText('Start date');
//     const endDateInput = within(inputs).getByPlaceholderText('End date');

//     userEvent.click(startDateInput);
//     userEvent.clear(startDateInput);
//     userEvent.type(startDateInput, '1998-12-10{enter}');

//     userEvent.click(endDateInput);
//     userEvent.clear(endDateInput);
//     userEvent.type(endDateInput, '2021-12-10{enter}');

//     userEvent.click(document.body);

//     expect(startDateInput).toHaveValue('1998-12-10');
//     expect(endDateInput).toHaveValue('2021-12-10');
//   });
// });

// describe('Order Filter Clear Filter', () => {
//   it('should clear filter', async () => {
//     await renderPage({
//       pagePermKey: permKey.PAGE_GETIR_WATER_ORDER_FILTER,
//       pageUrl,
//       pageComponent: PageComponent,
//     });
//     const inputs = screen.getByTestId('dateRangePicker');
//     const startDateInput = within(inputs).getByPlaceholderText('Start date');
//     const endDateInput = within(inputs).getByPlaceholderText('End date');

//     userEvent.click(startDateInput);
//     userEvent.clear(startDateInput);
//     userEvent.type(startDateInput, '1998-12-10{enter}');

//     userEvent.click(endDateInput);
//     userEvent.clear(endDateInput);
//     userEvent.type(endDateInput, '2021-12-10{enter}');

//     userEvent.click(document.body);

//     expect(startDateInput).toHaveValue('1998-12-10');
//     expect(endDateInput).toHaveValue('2021-12-10');
//     // Click to reset filter
//     userEvent.click(screen.getByText('Clear'));
//     await waitFor(() => {
//       expect(startDateInput).not.toHaveValue('1998-12-10');
//     });
//     await waitFor(() => {
//       expect(endDateInput).not.toHaveValue('2021-12-10');
//     });
//   });
// });
