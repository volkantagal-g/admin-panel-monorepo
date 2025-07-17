import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { orderDetailSelector } from '../../redux/selectors';
import renderComponent from '@test/publicUtils/renderComponent';
import TagStatuses from '.';
import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';

describe('order TagStatuses component', () => {
  beforeAll(() => {
    const spyOrderDetail = jest.spyOn(orderDetailSelector, 'getData');
    spyOrderDetail.mockReturnValue(mockedMarketOrderDetail);
  });

  it('should render order TagStatuses component without error', async () => {
    await renderComponent({ ui: <TagStatuses /> });
    const container = screen.getByTestId('statuses');
    expect(container).toBeInTheDocument();
    const statusTag = screen.getByTestId('status');
    expect(statusTag).toBeInTheDocument();
  });
});
