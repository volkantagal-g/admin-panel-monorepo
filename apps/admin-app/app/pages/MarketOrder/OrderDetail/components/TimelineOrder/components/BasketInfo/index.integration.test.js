import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { useTranslation } from 'react-i18next';

import renderComponent from '@test/publicUtils/renderComponent';
import MarketOrderBasketInfo from '.';
import { mockedMarketOrderDetail } from '@shared/api/marketOrder/index.mock.data';

jest.mock('react-i18next', () => ({ useTranslation: jest.fn() }));
describe('Basket Info Component', () => {
  const useTranslationSpy = useTranslation;
  const t = jest.fn(str => str);
  useTranslationSpy.mockReturnValue({ t });
  it('should render Basket info Component without error', async () => {
    await renderComponent({
      ui: (
        <MarketOrderBasketInfo
          orderDetail={mockedMarketOrderDetail}
          t={t}
          currencyFormatter={jest.fn}
          classes={jest.fn}
        />
      ),
    });
    const component = screen.getByTestId('market-order-basket-info');
    expect(component).toBeInTheDocument();
  });
});
