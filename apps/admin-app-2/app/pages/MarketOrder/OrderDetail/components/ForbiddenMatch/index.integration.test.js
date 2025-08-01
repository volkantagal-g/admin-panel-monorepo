import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';
import { orderDetailSelector } from '../../redux/selectors';
import ForbiddenMatch from '.';

describe('Forbidden Match Component', () => {
  beforeAll(async () => {
    const spyMarketOrder = jest.spyOn(orderDetailSelector, 'getData');
    spyMarketOrder.mockReturnValue(mockedMarketOrderDetail);
    await renderComponent({ ui: <ForbiddenMatch /> });
    await userEvent.click(screen.getByText(/Forbidden/i));
  });

  it('should render modal', async () => {
    const form = screen.getByText('Forbidden Match');
    expect(form).toBeInTheDocument();
  });
  it('should render submit button', () => {
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });
});
