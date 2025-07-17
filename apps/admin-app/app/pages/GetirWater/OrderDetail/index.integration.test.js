import { cleanup, screen } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import PageComponent from '.';
import renderComponent from '@test/publicUtils/renderComponent';

import ShopRefundModal from './components/actionsMenu/modals/shopRefundModal';
import CancelShopOrderModal from './components/actionsMenu/modals/cancelShopOrderModal';
import PartialRefundModal from './components/actionsMenu/modals/partialRefundModal';

const orderTestId = '6332f652bba6554939cc3f18';
const initialUrl = `/getirWater/orderDetail/${orderTestId}`;

describe('Order Detail Page', () => {
  afterAll(cleanup);

  it('should render without an error', async () => {
    await renderPage({
      pagePermKey: permKey.PAGE_GETIR_WATER_ORDER_DETAIL,
      pageUrl: initialUrl,
      pageComponent: PageComponent,
    });

    await waitPageToRenderSomething();
  });

  it('should render refund modal', async () => {
    await renderComponent({ ui: <ShopRefundModal /> });
    const modalTitle = await screen.findByText('Refund Order');

    expect(modalTitle).toBeInTheDocument();
  });

  it('should render cancel modal', async () => {
    await renderComponent({ ui: <CancelShopOrderModal /> });
    const modalTitle = await screen.findByText('Cancel Order');

    expect(modalTitle).toBeInTheDocument();
  });

  it('should render partial refund modal', async () => {
    await renderComponent({ ui: <PartialRefundModal /> });
    const modalTitle = await screen.findByText('Return Item');

    expect(modalTitle).toBeInTheDocument();
  });
});
