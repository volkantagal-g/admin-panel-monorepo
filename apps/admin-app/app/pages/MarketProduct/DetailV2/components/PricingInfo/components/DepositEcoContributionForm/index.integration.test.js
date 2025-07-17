import '@test/publicUtils/configureWithoutCleanup';

import { cleanup, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';

import { getMarketProductAllPriceSelector, updateMarketProductPricingSelector } from '@app/pages/MarketProduct/DetailV2/redux/selectors';
import { DepositEcoContributionForm } from '@app/pages/MarketProduct/DetailV2/components/PricingInfo/components/DepositEcoContributionForm/index';

describe('Market Product/Detail/Pricing Info/Deposit Eco Cont Info', () => {
  beforeAll(() => {
    const getMarketProductAllPricePending = jest.spyOn(getMarketProductAllPriceSelector, 'getIsPending');
    const getMarketProductAllPriceData = jest.spyOn(getMarketProductAllPriceSelector, 'getData');
    getMarketProductAllPricePending.mockReturnValue(false);
    getMarketProductAllPriceData.mockReturnValue([]);

    const updateMarketProductPricingPending = jest.spyOn(updateMarketProductPricingSelector, 'getIsPending');
    const updateMarketProductPricingError = jest.spyOn(updateMarketProductPricingSelector, 'getError');
    const updateMarketProductPricingData = jest.spyOn(updateMarketProductPricingSelector, 'getData');
    updateMarketProductPricingPending.mockReturnValue(false);
    updateMarketProductPricingError.mockReturnValue(false);
    updateMarketProductPricingData.mockReturnValue({});
  });
  afterAll(cleanup);

  describe('Unit Price Info', () => {
    it('should render component without error', async () => {
      await renderComponent({
        ui: (
          <DepositEcoContributionForm />
        ),
      });
    });
    it('should have correct form content', async () => {
      expect(screen.getByText('Deposit')).toBeInTheDocument();
      expect(screen.getByText('Eco Contribution Fee')).toBeInTheDocument();
    });
    it('should change disable/enable fields after click edit', async () => {
      const editButton = await screen.findByTestId('edit-button');
      userEvent.click(editButton);
      expect(screen.getByTestId('deposit')).toBeEnabled();
      expect(screen.getByTestId('ecoContribution')).toBeEnabled();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();

      const cancelButton = await screen.findByTestId('cancel-button');
      userEvent.click(cancelButton);
      expect(screen.getByTestId('deposit')).toBeDisabled();
      expect(screen.getByTestId('ecoContribution')).toBeDisabled();
      expect(screen.getByTestId('edit-button')).toBeInTheDocument();
    });
  });
});
