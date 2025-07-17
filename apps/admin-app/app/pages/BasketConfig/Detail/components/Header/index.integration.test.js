import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import Header from '.';
import { basketAmountDetailsSelector } from '../../redux/selectors';

describe('Header Component', () => {
  beforeAll(() => {
    const basketConfig = jest.spyOn(basketAmountDetailsSelector, 'getData');
    basketConfig.mockReturnValue({
      basketAmounts: {
        minDiscountedAmount: 10,
        maxDiscountedAmount: 40,
      },
    });
  });

  it('should render Header Component with no error', async () => {
    await renderComponent({ ui: <Header /> });
    const component = screen.getByTestId('basket-configs-header');
    expect(component).toBeInTheDocument();
  });
});
