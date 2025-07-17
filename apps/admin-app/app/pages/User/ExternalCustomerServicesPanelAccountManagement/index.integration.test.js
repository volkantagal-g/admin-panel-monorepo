import '@test/publicUtils/configureWithoutCleanup';
// import { act, cleanup, screen } from '@testing-library/react';
import { cleanup, screen, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import store from '@shared/redux/store';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import { Creators } from './redux/actions';
import {
  mockedBulkInactivateExternalCustomerServicesAccountsResponse,
  mockedBulkCreateTeleperformanceUsersResponse,
  mockedBulkCreateWebhelpUsersGlobalResponse,
  mockedBulkCreateWebhelpUsersTurkeyResponse,
  mockedBulkCreateAssisttUsersResponse,
} from '@shared/api/user/index.mock.data';

const initialUrl = '/user/externalCustomerServicesPanelAccountManagement';

const errorMessage = 'mails in the given list! Potential reasons: account already exists, wrong mail subdomain, ' +
  "the phone number should begin with the '+' sign & country code (Ex: +90..., +45...), missing fullName or username";

describe('In External Customer Services Panel Account Management Page:', () => {
  afterAll(cleanup);

  let pageContent;
  let csvImportButtonForBulkInactivate;
  let csvImportButtonForBulkTeleperformanceUserCreation;
  let csvImportButtonForBulkWebhelpUserCreationGlobal;
  let csvImportButtonForBulkWebhelpUserCreationTurkey;
  let csvImportButtonForBulkAssisttUserCreation;

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_EXTERNAL_CUSTOMER_SERVICES_PANEL_ACCOUNT_MANAGEMENT,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      pageContent = screen.getByRole('main');
    });
    it('should have correct document title', async () => {
      await waitFor(() => {
        expect(document.title).toContain('External Customer Services Panel Account Management');
      });
    });
    it('should show Bulk Inactivation section', async () => {
      await within(pageContent).findByText('Bulk Inactivation');
    });
    it('should show Bulk Teleperformance User Creation section', async () => {
      await within(pageContent).findByText('Bulk Teleperformance User Creation/Update');
    });
    it('should show Bulk Webhelp User Creation (Global) section', async () => {
      await within(pageContent).findByText('Bulk Webhelp User Creation/Update (Global)');
    });
    it('should show Bulk Webhelp User Creation (Turkey) section', async () => {
      await within(pageContent).findByText('Bulk Webhelp User Creation/Update (Turkey)');
    });
    it('should show Bulk Assistt User Creation section', async () => {
      await within(pageContent).findByText('Bulk Assistt User Creation/Update');
    });
    it('should have an img for csv import for each section', async () => {
      [
        csvImportButtonForBulkInactivate,
        csvImportButtonForBulkTeleperformanceUserCreation,
        csvImportButtonForBulkWebhelpUserCreationGlobal,
        csvImportButtonForBulkWebhelpUserCreationTurkey,
        csvImportButtonForBulkAssisttUserCreation,
      ] = within(pageContent).getAllByRole('img', { name: 'cloud-upload' });
    });
    it('clicking csv import should render csv upload modal', async () => {
      userEvent.click(csvImportButtonForBulkInactivate);
      screen.getAllByText('Upload Csv');

      userEvent.click(csvImportButtonForBulkTeleperformanceUserCreation);
      screen.getAllByText('Upload Csv');

      userEvent.click(csvImportButtonForBulkWebhelpUserCreationGlobal);
      screen.getAllByText('Upload Csv');

      userEvent.click(csvImportButtonForBulkWebhelpUserCreationTurkey);
      screen.getAllByText('Upload Csv');

      userEvent.click(csvImportButtonForBulkAssisttUserCreation);
      screen.getAllByText('Upload Csv');
    });
    it('should show the result successfully after submitting the csv for bulk inactivation', async () => {
      // THIS IS NOT RECOMMENDED, HOWEVER I COULDN'T FIND ANY ALTERNATIVE TO TEST CSV IMPORT FLOW
      store.dispatch(Creators.bulkInactivateExternalCustomerServicesAccountsRequest({
        mailAddressList: [
          'agent1@webhelp.getir.com',
          'agent2@teleperformance.getir.com',
          'agent3@assistt.getir.com',
        ],
      }));
      await waitFor(() => {
        within(pageContent).getByText('Completed');
        within(pageContent).getByText(
          `Successfully completed inactivating ${mockedBulkInactivateExternalCustomerServicesAccountsResponse.updatedCount} accounts.`,
        );
        within(pageContent).getByText(`There are ${mockedBulkInactivateExternalCustomerServicesAccountsResponse.problemMailAddressList.length} problematic ` +
          'mails in the given list! Potential reasons: Account is already closed, Wrong mail subdomain, Account doesn\'t exist');
      });
    });

    it('should show the result successfully after submitting the csv for bulk teleperformance creation', async () => {
      store.dispatch(Creators.bulkCreateTeleperformanceUsersRequest({
        users: [
          {
            country: 'USA',
            fullName: 'Test User',
            email: 'test.user@teleperformance.getir.com',
            user: 'test.user',
          },
        ],
      }));
      await waitFor(() => {
        within(pageContent).getByText('Completed');
        within(pageContent).getByText(
          `Successfully completed creating ${mockedBulkCreateTeleperformanceUsersResponse.updatedCount} accounts.`,
        );
        within(pageContent).getByText(`There are ${mockedBulkCreateTeleperformanceUsersResponse.problemMailAddressList.length} problematic ${errorMessage}`);
      });
    });

    it('should show the result successfully after submitting the csv for bulk webhelp (global) creation', async () => {
      store.dispatch(Creators.bulkCreateWebhelpUsersGlobalRequest({
        users: [
          {
            country: 'USA',
            fullName: 'Test User',
            email: 'test.user@webhelp.getir.com',
            user: 'test.user',
          },
        ],
      }));
      await waitFor(() => {
        within(pageContent).getByText('Completed');
        within(pageContent).getByText(
          `Successfully completed creating ${mockedBulkCreateWebhelpUsersGlobalResponse.updatedCount} accounts.`,
        );
        within(pageContent).getByText(`There are ${mockedBulkCreateWebhelpUsersGlobalResponse.problemMailAddressList.length} problematic ${errorMessage}`);
      });
    });

    it('should show the result successfully after submitting the csv for bulk teleperformance creation', async () => {
      store.dispatch(Creators.bulkCreateWebhelpUsersTurkeyRequest({
        users: [
          {
            fullName: 'Test User',
            email: 'test.user@webhelp.getir.com',
            user: 'test.user',
          },
        ],
      }));
      await waitFor(() => {
        within(pageContent).getByText('Completed');
        within(pageContent).getByText(
          `Successfully completed creating ${mockedBulkCreateWebhelpUsersTurkeyResponse.updatedCount} accounts.`,
        );
        within(pageContent).getByText(`There are ${mockedBulkCreateWebhelpUsersTurkeyResponse.problemMailAddressList.length} problematic ${errorMessage}`);
      });
    });

    it('should show the result successfully after submitting the csv for bulk assistt creation', async () => {
      store.dispatch(Creators.bulkCreateAssisttUsersRequest({
        users: [
          {
            country: 'USA',
            fullName: 'Test User',
            email: 'test.user@assistt.getir.com',
            user: 'test.user',
          },
        ],
      }));
      await waitFor(() => {
        within(pageContent).getByText('Completed');
        within(pageContent).getByText(
          `Successfully completed creating ${mockedBulkCreateAssisttUsersResponse.updatedCount} accounts.`,
        );
        within(pageContent).getByText(`There are ${mockedBulkCreateAssisttUsersResponse.problemMailAddressList.length} problematic ${errorMessage}`);
      });
    });
  });
});
