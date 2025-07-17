import '@test/publicUtils/configureWithoutCleanup';
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import moment from 'moment';

import renderPage from '@test/publicUtils/renderPage';

import {
  waitPageToRenderSomething,
  waitForItemToBeSelected,
  expectSelectDate,
} from '@test/publicUtils/assertions';

import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';

const initialUrl = '/franchiseDynamicConfig/new';

describe('In Franchise Dynamic Config Creation Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_CONFIG_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('Create New Franchise Dynamic Config')).toBeInTheDocument();
      expect(screen.getByText('New Dynamic Config')).toBeInTheDocument();
      expect(screen.getByText('Select Config Type')).toBeInTheDocument();
      expect(screen.getByText('Confirm Config Type')).toBeInTheDocument();
    });
  });
  describe('For page features', () => {
    it('should not enable save button when config type is not selected', async () => {
      const saveButton = screen.getByRole('button', { name: 'Save' });
      expect(saveButton).toBeDisabled();
    });

    it('should enable save button when config type is selected', async () => {
      const configTypeSelect = screen.getByRole('combobox');
      userEvent.click(configTypeSelect);
      const [selectedConfigTypeItem] = screen.getAllByText('properConfigType');
      userEvent.click(selectedConfigTypeItem);
      await waitForItemToBeSelected('properConfigType');

      expect(screen.getByText('start_date')).toBeInTheDocument();
      expect(screen.getByText('end_date')).toBeInTheDocument();

      const confirmConfigTypeButton = screen.getByRole('button', { name: 'Confirm Config Type' });
      userEvent.click(confirmConfigTypeButton);

      const saveButton = screen.getByRole('button', { name: 'Save' });
      expect(saveButton).toBeEnabled();
    });

    it('should show validation errors when required fields are not filled', async () => {
      const saveButton = screen.getByRole('button', { name: 'Save' });
      userEvent.click(saveButton);

      const customRequiredErrorMessages = await screen.findAllByText('This field is required');
      expect(customRequiredErrorMessages).toHaveLength(7);
      const translationRequiredErrorMessages = await screen.findAllByText('Required.');
      expect(translationRequiredErrorMessages).toHaveLength(4);
    });

    it('should show validation error when end date is before start date', async () => {
      const startDateInput = screen.getByPlaceholderText('Start Date');
      const dayAfterTomorrowDate = moment().add(2, 'days').format('YYYY-MM-DD');

      fireEvent.change(startDateInput, { target: { value: dayAfterTomorrowDate } });
      await waitFor(() => {
        expectSelectDate(startDateInput, dayAfterTomorrowDate);
      });

      const tomorrowDate = moment().add(1, 'days').format('YYYY-MM-DD');

      const endDateInput = screen.getByPlaceholderText('End Date');
      fireEvent.change(endDateInput, { target: { value: tomorrowDate } });
      await waitFor(() => {
        expectSelectDate(endDateInput, tomorrowDate);
      });

      const saveButton = screen.getByRole('button', { name: 'Save' });
      userEvent.click(saveButton);

      expect(await screen.findByText('End date must be greater than or equal to start date')).toBeInTheDocument();
    });

    it('should fill general information fields', async () => {
      // objectId (objetcId)
      const objectIdInput = screen.getByPlaceholderText('Unique id for this config');
      fireEvent.change(objectIdInput, { target: { value: '7b629e659b725f611c74bf2a' } });
      await waitFor(() => {
        expect(objectIdInput).toHaveValue('7b629e659b725f611c74bf2a');
      });

      // databaseUrl (string)
      const databaseUrlInput = screen.getByPlaceholderText('Database URL');
      fireEvent.change(databaseUrlInput, { target: { value: 'test database url' } });
      await waitFor(() => {
        expect(databaseUrlInput).toHaveValue('test database url');
      });

      // maxRetryAttempts (integer)
      const maxRetryAttemptsInput = screen.getByPlaceholderText('Max attempt count after a failure');
      fireEvent.change(maxRetryAttemptsInput, { target: { value: '5' } });
      await waitFor(() => {
        expect(maxRetryAttemptsInput).toHaveValue('5');
      });

      // cacheExpirationTime (date)
      const cacheExpirationTimeInput = screen.getByPlaceholderText('Cache Expiration Time');
      const cacheDate = moment().format('YYYY-MM-DD');
      fireEvent.change(cacheExpirationTimeInput, { target: { value: cacheDate } });
      await waitFor(() => {
        expectSelectDate(cacheExpirationTimeInput, cacheDate);
      });

      // enableCaching (boolean)
      const [, enableCachingSelect] = screen.getAllByRole('combobox');
      userEvent.click(enableCachingSelect);
      const [selectedEnableCachingItem] = await screen.findAllByText('True');
      userEvent.click(selectedEnableCachingItem);
      await waitForItemToBeSelected('True');

      // emailAddress (string)
      const emailAddressInput = screen.getByPlaceholderText('E-mail address');
      fireEvent.change(emailAddressInput, { target: { value: 'foo@bar.com' } });
      await waitFor(() => {
        expect(emailAddressInput).toHaveValue('foo@bar.com');
      });

      // emailSubject (translation) (MultiLanguageInput)
      const emailSubjectTrInput = screen.getByTestId('emailSubject-tr');
      const emailSubjectEngInput = screen.getByTestId('emailSubject-en');

      fireEvent.change(emailSubjectTrInput, { target: { value: 'test email subject tr' } });
      await waitFor(() => {
        expect(emailSubjectTrInput).toHaveValue('test email subject tr');
      });

      fireEvent.change(emailSubjectEngInput, { target: { value: 'test email subject eng' } });
      await waitFor(() => {
        expect(emailSubjectEngInput).toHaveValue('test email subject eng');
      });

      // emailContent (translation) (MultiLanguageInput)
      const emailContentTrInput = screen.getByTestId('emailContent-tr');
      const emailContentEngInput = screen.getByTestId('emailContent-en');

      fireEvent.change(emailContentTrInput, { target: { value: 'test email content tr' } });
      await waitFor(() => {
        expect(emailContentTrInput).toHaveValue('test email content tr');
      });

      fireEvent.change(emailContentEngInput, { target: { value: 'test email content eng' } });
      await waitFor(() => {
        expect(emailContentEngInput).toHaveValue('test email content eng');
      });

      // warehosueDomain (warehosueDomain)
      const [,, warehouseDomainSelect] = screen.getAllByRole('combobox');
      userEvent.click(warehouseDomainSelect);
      const [selectedWarehouseDomainItem] = await screen.findAllByText('Store Conversion');
      userEvent.click(selectedWarehouseDomainItem);
      await waitForItemToBeSelected('Store Conversion');

      // start_date (date)
      const startDateInput = screen.getByPlaceholderText('Start Date');
      const startDate = moment().add(1, 'days').format('YYYY-MM-DD');
      fireEvent.change(startDateInput, { target: { value: startDate } });
      await waitFor(() => {
        expectSelectDate(startDateInput, startDate);
      });

      // end_date (date)
      const endDateInput = screen.getByPlaceholderText('End Date');
      const endDate = moment().add(2, 'days').format('YYYY-MM-DD');

      fireEvent.change(endDateInput, { target: { value: endDate } });
      await waitFor(() => {
        expectSelectDate(endDateInput, endDate);
      });
    });

    it('should create new config and redirect to listing page', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_FRANCHISE_CONFIG_LIST]);
      });
      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);

      await waitForLoading();
    });
  });
});
