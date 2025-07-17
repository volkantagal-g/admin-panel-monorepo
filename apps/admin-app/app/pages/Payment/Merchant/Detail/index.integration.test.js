import '@test/publicUtils/configureWithoutCleanup';

import { screen, within } from '@testing-library/react';

import moment from 'moment';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import { merchantId, mockedMerchantDetail } from '@shared/api/payment/index.mock.data';
import PageComponent from '.';
import { DEFAULT_TIME_FORMAT } from '@shared/shared/constants';

const initialUrl = `/payment/merchants/detail/${merchantId}`;

describe('In Payments Merchant Detail Page:', () => {
  describe('For Page Detail', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PAYMENT_MERCHANT_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });
  describe('For General Info', () => {
    it('general info section display values', async () => {
      const labelledComponent = screen.getByTestId('general-info-section');
      expect(labelledComponent).toBeInTheDocument();
      within(labelledComponent).getByText('ID');
      within(labelledComponent).getByText('Key');
      within(labelledComponent).getByText('Created At');
      within(labelledComponent).getByText('Updated At');
    });
    it('should match mock data information in general info component', async () => {
      screen.getByDisplayValue(mockedMerchantDetail.data.key);
      const generalInfoCreatedAt = screen.getByTestId('general-info-createdAt');
      const generalInfoUpdatedAt = screen.getByTestId('general-info-updatedAt');

      within(generalInfoCreatedAt).getByDisplayValue(moment(mockedMerchantDetail.data.createdAt).format(DEFAULT_TIME_FORMAT));
      within(generalInfoUpdatedAt).getByDisplayValue(moment(mockedMerchantDetail.data.updatedAt).format(DEFAULT_TIME_FORMAT));
    });
  });
  describe('For Webhooks', () => {
    it('webhooks section display values', async () => {
      const labelledComponent = screen.getByTestId('webhooks-section');
      expect(labelledComponent).toBeInTheDocument();
      within(labelledComponent).getByText('Type');
      within(labelledComponent).getByText('URL');
      within(labelledComponent).getByText('Enabled');
    });
    // TODO: after webhooks api update, uncomment this test
    /*     it('should match mock data information in webhook component', async () => {
      screen.getByText(mockedMerchantDetail.data.settings.webhooks[0].type);
      screen.getByDisplayValue(mockedMerchantDetail.data.settings.webhooks[0].url);
    }); */
  });
  describe('For Custom Identifiers', () => {
    it('custom identifiers section display values', async () => {
      const labelledComponent = screen.getByTestId('custom-identifiers-section');
      expect(labelledComponent).toBeInTheDocument();
      within(labelledComponent).getByText('Key');
      within(labelledComponent).getByText('Value');
    });
    it('should match mock data information in custom identifiers component', async () => {
      const customIdentifierValue = screen.getByTestId('custom-identifier-value-0');
      screen.getByDisplayValue(mockedMerchantDetail.data.customIdentifiers[0].key);
      expect(customIdentifierValue).toBeInTheDocument();
      within(customIdentifierValue).getByDisplayValue(mockedMerchantDetail.data.customIdentifiers[0].value);
    });
  });
  describe('For Settings', () => {
    it('settings section display values', async () => {
      const labelledComponent = screen.getByTestId('settings-section');
      expect(labelledComponent).toBeInTheDocument();
      // General Settings
      within(labelledComponent).getByText('Display Name');
      within(labelledComponent).getByText('Country Code');
      within(labelledComponent).getByText('Capture Type');
      within(labelledComponent).getByText('Enabled');
      // Currency
      within(labelledComponent).getByText('Symbol');
      within(labelledComponent).getByText('Prefix Symbol');
      within(labelledComponent).getByText('Suffix Symbol');
      within(labelledComponent).getByText('Decimal Separator');
      within(labelledComponent).getByText('Thousand Separator');
      within(labelledComponent).getByText('Precision');
      within(labelledComponent).getByText('Code Name');
      within(labelledComponent).getByText('Code Numeric');
      within(labelledComponent).getByText('Code Alpha2');
      within(labelledComponent).getByText('Code Alpha3');
      // Time Zone
      within(labelledComponent).getByText('ID');
      within(labelledComponent).getByText('Name');
      within(labelledComponent).getByText('Offset');
    });
    it('should match mock data information in settings component', async () => {
      const pageContent = screen.getByRole('main');
      // General Settings
      within(pageContent).getByDisplayValue(mockedMerchantDetail.data.settings.displayName);
      within(pageContent).getByText(mockedMerchantDetail.data.settings.countryCode);
      within(pageContent).getByText(mockedMerchantDetail.data.settings.captureType);
      within(screen.getByTestId('settings-section')).getByRole('switch', { checked: mockedMerchantDetail.data.settings.enabled });
      // Currency
      const symbol = screen.getAllByTestId('currency-symbol');
      const decimalSeparator = screen.getAllByTestId('currency-decimal-separator');
      const codeName = screen.getAllByTestId('currency-code-name');
      const codeAlpha2 = screen.getAllByTestId('currency-code-alpha2');
      const prefixSymbol = screen.getAllByTestId('currency-prefixSymbol');
      const thousandSeparator = screen.getAllByTestId('currency-thousand-separator');
      const codeNumeric = screen.getAllByTestId('currency-code-numeric');
      const codeAlpha3 = screen.getAllByTestId('currency-code-alpha3');
      /* const suffixSymbol = screen.getAllByTestId('currency-suffix-symbol'); */
      const precision = screen.getAllByTestId('currency-precision');
      within(symbol[0]).getByDisplayValue(mockedMerchantDetail.data.settings.currency.symbol);
      within(decimalSeparator[0]).getByDisplayValue(mockedMerchantDetail.data.settings.currency.decimalSeparator);
      within(codeName[0]).getByDisplayValue(mockedMerchantDetail.data.settings.currency.codeName);
      within(codeAlpha2[0]).getByDisplayValue(mockedMerchantDetail.data.settings.currency.codeAlpha2);
      within(prefixSymbol[0]).getByDisplayValue(mockedMerchantDetail.data.settings.currency.prefixSymbol);
      within(thousandSeparator[0]).getByDisplayValue(mockedMerchantDetail.data.settings.currency.thousandSeparator);
      within(codeNumeric[0]).getByDisplayValue(mockedMerchantDetail.data.settings.currency.codeNumeric);
      within(codeAlpha3[0]).getByDisplayValue(mockedMerchantDetail.data.settings.currency.codeAlpha3);
      // TODO: fix suffix symbol issue
      // within(suffixSymbol[0]).getByDisplayValue(mockedMerchantDetail.data.settings.currency.suffixSymbol);
      within(precision[0]).getByDisplayValue(mockedMerchantDetail.data.settings.currency.precision);
    });
  });
  // TODO: payment provider test needs to be implemented after updates
});
