import '@test/publicUtils/configureWithoutCleanup';
import { screen, waitFor, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import { mockedTransactionDetail, transactionId } from '@shared/api/payment/index.mock.data';
import PageComponent from '.';
import { formatUTCDate } from '@shared/utils/dateHelper';
import { CUSTOM_DATE_FORMAT } from '../../constants';

const initialUrl = `/payment/transactions/detail/${transactionId}`;

describe('In Transaction Detail Page:', () => {
  describe('For Page Details', () => {
    let renderResult;
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_PAYMENT_TRANSACTION_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });

      await waitPageToRenderSomething();
    });
    it('refund button should be visible if the user has permission', async () => {
      act(() => {
        renderResult.addUserPermissions(
          [permKey.PAGE_PAYMENT_TRANSACTION_DETAIL_COMPONENT_REFUND_BUTTON],
        );
      });
      await waitFor(() => {
        const refundButton = within(renderResult.container).queryByText('Refund');
        expect(refundButton).toBeInTheDocument();
      });
    });
  });
  describe('For Payment Overview', () => {
    it('payment overview section should be visible', async () => {
      const paymentOverviewSection = screen.getByTestId('payment-overview-section');
      expect(paymentOverviewSection).toBeInTheDocument();
    });
    it('payment overview section display values', async () => {
      await screen.findAllByText(mockedTransactionDetail.data.transactionId);
      await screen.findAllByText(mockedTransactionDetail.data.data.financialSummary.status);
    });
  });
  describe('For General Details', () => {
    it('general details section should be visible', async () => {
      const generalDetailsSection = screen.getByTestId('general-details-section');
      expect(generalDetailsSection).toBeInTheDocument();
    });
    it('should match mock data information in general detail component', async () => {
      await screen.findAllByText(mockedTransactionDetail.data.data.merchantReference);
      await screen.findAllByText(mockedTransactionDetail.data.data.location);
      await screen.findAllByText(formatUTCDate(mockedTransactionDetail?.data?.createdAt, CUSTOM_DATE_FORMAT, 'UTC'));
      await screen.findAllByText(formatUTCDate(mockedTransactionDetail.data.updatedAt, CUSTOM_DATE_FORMAT, 'UTC'));
    });
  });
  describe('For Shopper Details', () => {
    it('shopper details section should be visible', async () => {
      const shopperDetailsSection = screen.getByTestId('shopper-details-section');
      expect(shopperDetailsSection).toBeInTheDocument();
    });
    it('should match mock data information in shopper detail component', async () => {
      await screen.findAllByText(mockedTransactionDetail.data.data.shopper.name);
      await screen.findAllByText(mockedTransactionDetail.data.data.shopper._id);
      await screen.findAllByText(mockedTransactionDetail.data.data.shopper.email);
      await screen.findAllByText(mockedTransactionDetail.data.data.shopper.phoneNumber);
    });
  });
  describe('For Merchant Details', () => {
    it('merchant details section should be visible', async () => {
      const merchantDetailsSection = screen.getByTestId('merchant-details-section');
      expect(merchantDetailsSection).toBeInTheDocument();
    });
    it('should match mock data information in merchant detail component', async () => {
      await screen.findAllByText(mockedTransactionDetail.data.data.merchant.key);
      await screen.findAllByText(mockedTransactionDetail.data.data.merchant._id);
    });
  });
  describe('For Device Details', () => {
    it('device details section should be visible', async () => {
      const deviceDetailsSection = screen.getByTestId('device-details-section');
      expect(deviceDetailsSection).toBeInTheDocument();
    });
    it('should match mock data information in merchant detail component', async () => {
      await screen.findAllByText(mockedTransactionDetail.data.data.shopper.device.buildNumber);
      await screen.findAllByText(mockedTransactionDetail.data.data.shopper.device.deviceId);
      await screen.findAllByText(mockedTransactionDetail.data.data.shopper.device.deviceType);
      await screen.findAllByText(mockedTransactionDetail.data.data.shopper.device.sdk);
      await screen.findAllByText(mockedTransactionDetail.data.data.shopper.device.version);
    });
    it('refund modal details', async () => {
      const refundButton = screen.getByText('Refund');
      userEvent.click(refundButton);
      await screen.findAllByText('Refund Transaction');
      await screen.findAllByText('I confirm the refund');
    });
  });
});
