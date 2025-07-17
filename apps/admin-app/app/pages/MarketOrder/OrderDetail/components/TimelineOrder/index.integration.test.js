import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { orderDetailSelector } from '../../redux/selectors';
import renderComponent from '@test/publicUtils/renderComponent';
import { mockedMarketOrderDetailWithAllUniqueTypesOfOrders } from '@shared/api/marketOrder/index.mock.data';
import TimelineOrder from '.';

describe('order detail timeline', () => {
  let timeline;
  let basketList;
  beforeAll(async () => {
    const spyOrderDetail = jest.spyOn(orderDetailSelector, 'getData');
    spyOrderDetail.mockReturnValue(mockedMarketOrderDetailWithAllUniqueTypesOfOrders);

    await renderComponent({ ui: <TimelineOrder data={mockedMarketOrderDetailWithAllUniqueTypesOfOrders} /> });
    timeline = screen.getByTestId('timeline');
    basketList = screen.getByTestId('basket-list');
  });

  it('should render timeline', async () => {
    expect(timeline).toBeInTheDocument();
  });

  it('should render basket list', async () => {
    expect(timeline).toContainElement(basketList);
  });

  it('should render normal basket item', async () => {
    screen.getAllByTestId('normal-basket-item').forEach(basketItem => expect(basketList).toContainElement(basketItem));
  });

  it('should render bundled basket items', async () => {
    screen.getAllByTestId('parent-basket-item').forEach(basketItem => expect(basketList).toContainElement(basketItem));
    screen.getAllByTestId('child-basket-item').forEach(basketItem => expect(basketList).toContainElement(basketItem));
  });

  it('should render provisioned basket items', async () => {
    screen.getAllByTestId('provisioned-basket-item-pre').forEach(basketItem => expect(basketList).toContainElement(basketItem));
    screen.getAllByTestId('provisioned-basket-item-post').forEach(basketItem => expect(basketList).toContainElement(basketItem));
  });
});
