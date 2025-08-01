import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor, cleanup } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import GroupReasons from './GroupReasons';

const MOCK_REASONS = [{
  en: 'Missing/Wrong product',
  tr: 'Eksik/Yanlış ürün',
  id: 1,
  key: 'MISSING_WRONG_PRODUCT',
},
{
  en: 'Product Issue',
  tr: 'Ürün şikayeti',
  id: 2,
  key: 'PRODUCT_ISSUE',
}];

const MOCK_REASONS_WITHOUT_LANG = [{
  name: 'Diğer',
  id: 42,
  key: 'OTHER',
},
{
  name: 'Ulaşılamadı',
  id: 43,
  key: 'UNABLE_TO_REACH',
}];

describe('[AgentActions][Components] GroupReasons', () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it('should render a radio group with no errors', async () => {
    const mockHandler = jest.fn();

    await renderComponent({
      ui: (
        <GroupReasons
          title="Reasons"
          reasons={MOCK_REASONS}
          handleRadioChange={mockHandler}
        />
      ),
    });

    const title = screen.getByText('Reasons');
    const missingReason = screen.getByText('Missing/Wrong product');
    const productIssueReason = screen.getByText('Product Issue');

    const missingReasonRadioInput = screen.getByTestId('market-order-agent-actions-group-radio-button-missing_wrong_product');

    expect(title).toBeInTheDocument();
    expect(missingReason).toBeInTheDocument();
    expect(productIssueReason).toBeInTheDocument();

    userEvent.click(missingReasonRadioInput);
    await waitFor(() => {
      expect(mockHandler).toHaveBeenCalledWith(1);
    });
  });

  it('should render a group with initial divider', async () => {
    const mockHandler = jest.fn();

    await renderComponent({
      ui: (
        <GroupReasons
          divider
          title="Reasons"
          reasons={MOCK_REASONS}
          handleRadioChange={mockHandler}
        />
      ),
    });

    const divider = screen.getByTestId('market-order-agent-actions-group-reasons-divider');

    expect(divider).toBeInTheDocument();
  });

  it('should render a group of reasons with no lang specific', async () => {
    const mockHandler = jest.fn();

    await renderComponent({
      ui: (
        <GroupReasons
          divider
          title="Reasons"
          reasons={MOCK_REASONS_WITHOUT_LANG}
          handleRadioChange={mockHandler}
        />
      ),
    });

    const otherReason = screen.getByText('Diğer');
    const unableToReachReason = screen.getByText('Ulaşılamadı');

    expect(otherReason).toBeInTheDocument();
    expect(unableToReachReason).toBeInTheDocument();
  });

  it('should render a required group of reasons', async () => {
    const mockHandler = jest.fn();

    await renderComponent({
      ui: (
        <GroupReasons
          hasError
          divider
          title="Reasons"
          reasons={MOCK_REASONS}
          handleRadioChange={mockHandler}
        />
      ),
    });

    const requiredLabel = screen.getByText('(required)');

    expect(requiredLabel).toBeInTheDocument();
  });

  it('should render read only when isFeedbackDetails is true', async () => {
    const mockHandler = jest.fn();

    await renderComponent({
      ui: (
        <GroupReasons
          title="Reasons"
          reasons={MOCK_REASONS}
          isFeedbackDetails
          handleRadioChange={mockHandler}
        />
      ),
    });

    const title = screen.getByText('Reasons');
    expect(title).toBeInTheDocument();
  });
});
