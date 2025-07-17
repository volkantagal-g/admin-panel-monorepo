import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, waitForItemToBeSelected } from '@test/publicUtils/assertions';
import renderComponent from '@test/publicUtils/renderComponent';
import CreateMerchantForm from './components/New/components/CreateMerchantForm';
import PageComponent from '.';

const initialUrl = '/payment/merchants/new';

const mockedFormValues = {
  displayName: 'Test Merchant Display Name',
  key: 'test.merchant.key',
  captureType: 'DIRECT',
  minPurchaseAmount: 0,
  maxPurchaseAmount: 1000,
  enabled: true,
  webHooks: [
    {
      type: 'PAYMENT_STATUS_WEBHOOK',
      url: 'https://www.new-merchant-test.com',
      enabled: true,
    },
  ],
  customIdentifiers: [
    {
      key: 'domainType',
      type: 'number',
      value: '1',
    },
  ],
};

describe('In Payments Merchant New Page:', () => {
  afterAll(cleanup);
  describe('For Page New', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PAYMENT_MERCHANT_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('General')).toBeInTheDocument();
      expect(screen.getByText('Web Hooks')).toBeInTheDocument();
      expect(screen.getByText('Custom Identifiers')).toBeInTheDocument();
    });
  });
});

describe('For Create Merchant Form Component', () => {
  afterAll(cleanup);
  it('successful submit', async () => {
    const onFinish = jest.fn();
    await renderComponent({ ui: <CreateMerchantForm onFinish={onFinish} /> });
    const displayName = screen.getByTestId('merchant-display-name');
    const key = screen.getByTestId('merchant-key');
    const customIdentifierKey = screen.getByPlaceholderText('Custom Id key');
    const customIdentifierValue = screen.getByPlaceholderText('Value');

    const webhookUrl = screen.getByTestId('merchant-webhook-url');
    const captureType = screen.getByText('Select Capture Type');

    fireEvent.change(displayName, { target: { value: mockedFormValues.displayName } });
    await waitFor(() => {
      expect(displayName).toHaveValue(mockedFormValues.displayName);
    });

    fireEvent.change(key, { target: { value: mockedFormValues.key } });
    await waitFor(() => {
      expect(key).toHaveValue(mockedFormValues.key);
    });

    await waitFor(() => {
      expect(captureType).toBeEnabled();
    });
    userEvent.click(captureType);
    const [, selectedCaptureType] = screen.getAllByText(mockedFormValues.captureType);
    userEvent.click(selectedCaptureType);
    await waitForItemToBeSelected(mockedFormValues.captureType);

    fireEvent.change(webhookUrl, { target: { value: mockedFormValues.webHooks[0].url } });
    await waitFor(() => {
      expect(webhookUrl).toHaveValue(mockedFormValues.webHooks[0].url);
    });

    fireEvent.change(customIdentifierKey, { target: { value: mockedFormValues.customIdentifiers[0].key } });
    await waitFor(() => {
      expect(customIdentifierKey).toHaveValue(mockedFormValues.customIdentifiers[0].key);
    });

    fireEvent.change(customIdentifierValue, { target: { value: 1 } });
    await waitFor(() => {
      expect(customIdentifierValue).toHaveValue(1);
    });
    userEvent.click(screen.getByRole('button', { name: /Submit/i }));
    await waitFor(() => expect(onFinish).toHaveBeenCalledWith({ ...mockedFormValues }));
  });
});
