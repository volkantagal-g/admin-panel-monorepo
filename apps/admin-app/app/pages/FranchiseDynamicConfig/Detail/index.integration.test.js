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
import { getCongfigTypeDetail2Mock } from '@shared/api/franchiseDynamicConfig/index.mock.handler';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { mockedConfigDetail } from '@shared/api/franchiseDynamicConfig/index.mock.data';

const configId = '64638d27f0bc7e8908f58e64';
const initialUrl = `/franchiseDynamicConfig/detail/${configId}`;

describe('In Franchise Config Detail Page:', () => {
  afterAll(cleanup);
  let renderResult;
  describe('For app level features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getCongfigTypeDetail2Mock);
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_CONFIG_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      act(() => {
        renderResult.addUserPermissions([permKey.PAGE_FRANCHISE_CONFIG_DETAIL_COMPONENT_BIZ_PERM_KEY,
          permKey.PAGE_FRANCHISE_CONFIG_DETAIL_COMPONENT_DATA_PERM_KEY]);
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page content', () => {
      expect(screen.getByText('objetcId')).toBeInTheDocument();
      expect(screen.getByText('databaseUrl')).toBeInTheDocument();
      expect(screen.getByText('maxRetryAttempts')).toBeInTheDocument();
      expect(screen.getByText('cacheExpirationTime')).toBeInTheDocument();
      expect(screen.getByText('enableCaching')).toBeInTheDocument();
      expect(screen.getByText('emailAddress')).toBeInTheDocument();
      expect(screen.getByText('warehosueDomain')).toBeInTheDocument();
      expect(screen.getByText('start_date')).toBeInTheDocument();
      expect(screen.getByText('end_date')).toBeInTheDocument();
    });
  });
  describe('For page features', () => {
    it('should value disabled initially', () => {
      expect(screen.getByDisplayValue(mockedConfigDetail.objetcId)).toBeDisabled();
      expect(screen.getByDisplayValue(mockedConfigDetail.databaseUrl)).toBeDisabled();
      expect(screen.getByDisplayValue(mockedConfigDetail.maxRetryAttempts)).toBeDisabled();
      expect(screen.getByDisplayValue(mockedConfigDetail.emailAddress)).toBeDisabled();
    });

    it('should enable after user click edit button', async () => {
      const editButton = await screen.findByText('Edit');
      userEvent.click(editButton);

      expect(screen.getByDisplayValue(mockedConfigDetail.objetcId)).toBeEnabled();
      expect(screen.getByDisplayValue(mockedConfigDetail.databaseUrl)).toBeEnabled();
      expect(screen.getByDisplayValue(mockedConfigDetail.maxRetryAttempts)).toBeEnabled();
      expect(screen.getByDisplayValue(mockedConfigDetail.emailAddress)).toBeEnabled();
    });

    it('should edit every field', async () => {
      const objectIdField = await screen.findByDisplayValue(mockedConfigDetail.objetcId);
      fireEvent.change(objectIdField, { target: { value: '7b629e659b725f611c74bf2a' } });
      await waitFor(() => {
        expect(objectIdField).toHaveValue('7b629e659b725f611c74bf2a');
      });

      const databaseUrlInput = await screen.findByDisplayValue(mockedConfigDetail.databaseUrl);
      fireEvent.change(databaseUrlInput, { target: { value: 'test database url' } });
      await waitFor(() => {
        expect(databaseUrlInput).toHaveValue('test database url');
      });

      const maxRetryAttemptsInput = screen.getByPlaceholderText('Max attempt count after a failure');
      fireEvent.change(maxRetryAttemptsInput, { target: { value: '5' } });
      await waitFor(() => {
        expect(maxRetryAttemptsInput).toHaveValue('5');
      });

      const cacheExpirationTimeInput = screen.getByPlaceholderText('Cache Expiration Time');
      const todayDate = moment().format('DD/MM/YYYY HH:mm');
      fireEvent.change(cacheExpirationTimeInput, { target: { value: todayDate } });
      await waitFor(() => {
        expectSelectDate(cacheExpirationTimeInput, todayDate);
      });

      const [, enableCachingSelect] = screen.getAllByRole('combobox');
      userEvent.click(enableCachingSelect);
      const [selectedEnableCachingItem] = await screen.findAllByText('True');
      userEvent.click(selectedEnableCachingItem);
      await waitForItemToBeSelected('True');

      const emailAddressInput = screen.getByPlaceholderText('E-mail address');
      fireEvent.change(emailAddressInput, { target: { value: 'foo@bar.com' } });
      await waitFor(() => {
        expect(emailAddressInput).toHaveValue('foo@bar.com');
      });

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
    });

    it('should save changed fields', async () => {
      const saveButton = await screen.findByText('Save');

      userEvent.click(saveButton);

      const okButton = await screen.findByText('OK');
      userEvent.click(okButton);

      await waitFor(() => {
        expect(screen.getByText('Franchise Dynamic Config Detail')).toBeInTheDocument();
      });
    });
  });
});
