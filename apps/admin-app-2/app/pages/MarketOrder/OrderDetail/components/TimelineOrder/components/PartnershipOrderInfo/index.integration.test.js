import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import { useTranslation } from 'react-i18next';

import renderComponent from '@test/publicUtils/renderComponent';
import PartnershipOrderInfo from '.';
import { partnershipOrderInfo } from '@shared/api/marketOrder/index.mock.data';

jest.mock('react-i18next', () => ({ useTranslation: jest.fn() }));
describe('Partnership Order Info Component', () => {
  const useTranslationSpy = useTranslation;
  const t = jest.fn(str => str);
  useTranslationSpy.mockReturnValue({ t });
  it('should render Partnership Order info Component without errors', async () => {
    await renderComponent({
      ui: (
        <PartnershipOrderInfo
          integrations={partnershipOrderInfo}
          t={t}
          currencyFormatter={jest.fn}
          classes={jest.fn}
        />
      ),
    });
    const component = screen.getByTestId('partnership-order-info');
    expect(component).toBeInTheDocument();
  });
});
