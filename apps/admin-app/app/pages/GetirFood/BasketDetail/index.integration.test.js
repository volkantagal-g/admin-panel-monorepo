import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, screen, act } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectTableToHaveColumnNames } from '@test/publicUtils/assertions';
import PageComponent from '.';

const orderTestId = '630631d22ebf1201fb54de84';
const initialUrl = `/baskets/detail/${orderTestId}`;

describe('In Basket Order Detail Page:', () => {
  let renderResult;
  it('should render without an error', async () => {
    renderResult = await renderPage({
      pagePermKey: permKey.PAGE_GETIR_FOOD_BASKET_DETAIL,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  it('should render proper components', () => {
    expect(screen.getByTestId('client-details')).toBeInTheDocument();
    expect(screen.getByTestId('restaurant-details')).toBeInTheDocument();

    expect(screen.getByText('Client')).toBeInTheDocument();
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Restaurant Users')).toBeInTheDocument();
    expect(screen.getByText('Order List')).toBeInTheDocument();
  });

  it('shouldn\'t show cart info table when permitted', async () => {
    expect(screen.queryByText('Card Info')).not.toBeInTheDocument();
  });
  it('should show cart info table when permitted', async () => {
    const { addUserPermissions } = renderResult;

    act(() => {
      addUserPermissions([permKey.PAGE_GETIR_FOOD_ORDER_DETAIL_CART_INFO_TABLE]);
    });

    await screen.findByText('Card Info');
  });

  it('should render minimap', () => {
    expect(screen.getByTestId('basket-minimap')).toBeInTheDocument();
  });

  it('Should have proper columns for Order List', () => {
    const table = screen.getByTestId('basket-order-list');
    expectTableToHaveColumnNames(table, ['Name', 'Note', 'Price', 'Qty', 'Total Price']);
  });

  it('Should have proper columns for Restaurant users', () => {
    const table = screen.getByTestId('basket-restaurant-users');
    expectTableToHaveColumnNames(table, ['Name', 'E-mail', 'Gsm', 'Role']);
  });

  it('should show Basket Detail JSON when clicked at JSON button', () => {
    fireEvent.click(screen.getByRole('button', { name: /JSON/i }));
    expect(screen.getByText('Basket Detail JSON')).toBeInTheDocument();
  });
});
