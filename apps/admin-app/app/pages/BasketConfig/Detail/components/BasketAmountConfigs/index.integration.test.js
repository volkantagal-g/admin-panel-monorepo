import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import BasketAmountConfigs from '.';
import { basketAmountDetailsSelector } from '../../redux/selectors';

describe('BasketAmountConfigs Component', () => {
  beforeAll(() => {
    const basketConfig = jest.spyOn(basketAmountDetailsSelector, 'getData');
    basketConfig.mockReturnValue({
      basketAmounts: {
        minDiscountedAmount: 10,
        maxDiscountedAmount: 40,
      },
    });
  });

  it('should render BasketAmountConfigs Component with no error', async () => {
    await renderComponent({ ui: <BasketAmountConfigs /> });
    const component = screen.getByTestId('basket-amount-configs');
    expect(component).toBeInTheDocument();
  });
});
