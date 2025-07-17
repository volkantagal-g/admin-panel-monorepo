import '@test/publicUtils/configureWithoutCleanup';
import { screen, act, waitFor } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';

import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const franchiseUserTestId = '5de969573aed804787ca0b43';
const initialUrl = `/marketFranchise/user/detail/${franchiseUserTestId}`;

describe('In Market Franchise User Detail Page:', () => {
  let renderResult;

  describe('For page features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_MARKET_FRANCHISE_USER_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should have correct general informations box content', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([
          permKey.PAGE_MARKET_FRANCHISE_USER_ROLE_GROUP_LIST,
          permKey.PAGE_MARKET_FRANCHISE_USER_ROLE_LIST,
          permKey.PAGE_MARKET_FRANCHISE_USER_REPORT_LIST,
        ]);
      });

      await waitFor(() => {
        expect(screen.getByText('General Information')).toBeInTheDocument();
      });

      expect(screen.getByText('Name')).toBeInTheDocument();
      const franchiseUserNameInput = screen.getByLabelText('Name');
      expect(franchiseUserNameInput).toBeInTheDocument();
      expect(franchiseUserNameInput).toBeDisabled();

      expect(screen.getByText('Username')).toBeInTheDocument();
      const franchiseUserUsernameInput = screen.getByLabelText('Username');
      expect(franchiseUserUsernameInput).toBeInTheDocument();
      expect(franchiseUserUsernameInput).toBeDisabled();

      expect(screen.getByText('Gsm')).toBeInTheDocument();
      const franchiseUserGsmInput = screen.getByLabelText('Gsm');
      expect(franchiseUserGsmInput).toBeInTheDocument();
      expect(franchiseUserGsmInput).toBeDisabled();

      expect(screen.getByText('E-mail')).toBeInTheDocument();
      const franchiseUserEmailInput = screen.getByLabelText('E-mail');
      expect(franchiseUserEmailInput).toBeInTheDocument();
      expect(franchiseUserEmailInput).toBeDisabled();

      expect(screen.getByText('Is Owner')).toBeInTheDocument();
      const franchiseUserIsOwnerInput = screen.getByLabelText('Is Owner');
      expect(franchiseUserIsOwnerInput).toBeInTheDocument();
      expect(franchiseUserIsOwnerInput).toBeDisabled();

      expect(screen.getByText('Is Getir Employee')).toBeInTheDocument();
      const franchiseUserIsGetirEmployeeInput = screen.getByLabelText('Is Getir Employee');
      expect(franchiseUserIsGetirEmployeeInput).toBeInTheDocument();
      expect(franchiseUserIsGetirEmployeeInput).toBeDisabled();

      expect(screen.getByText('User Permission Group')).toBeInTheDocument();
      const franchiseUserUserPermissionGroupInput = screen.getByLabelText('User Permission Group');
      expect(franchiseUserUserPermissionGroupInput).toBeInTheDocument();
      expect(franchiseUserUserPermissionGroupInput).toBeDisabled();
    });

    it('should have correct role groups box content', () => {
      expect(screen.getByText('Role Groups')).toBeInTheDocument();
      expect(screen.getAllByText('Group').length).toBe(2);
    });

    it('should have correct franchise informations box content', () => {
      expect(screen.getByText('Franchise Information')).toBeInTheDocument();
      expect(screen.getByText('Franchise')).toBeInTheDocument();
      expect(screen.getByText('Franchise Owners')).toBeInTheDocument();
      expect(screen.getByText('Warehouses')).toBeInTheDocument();
    });

    it('should have correct permissions box content', () => {
      expect(screen.getAllByText('Permissions').length).toBe(2);
    });

    it('should have correct accesible reports content', () => {
      expect(screen.getByText('Accessible Reports')).toBeInTheDocument();
    });
  });
});
