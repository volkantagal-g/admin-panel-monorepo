import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup, act, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething, waitForToastElementToAppear } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import { courierDetailMock } from '@shared/api/courierHandler/index.mock.data';

const franchiseUserTestId = '61d578c24a90159d5ecf2e33';
const initialUrl = `/courier/detail/${franchiseUserTestId}`;

describe('In Courier Detail Page:', () => {
  let renderResult;
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_COURIER_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it('should have correct courier location box content', () => {
      expect(screen.getByText('Courier Location')).toBeInTheDocument();
    });

    it('should have correct general information box header', () => {
      expect(screen.getByText('General Information')).toBeInTheDocument();
      expect(screen.getByText('Person Detail')).toBeInTheDocument();
    });

    it('should have correct general information box content', () => {
      expect(screen.getByText('General Information')).toBeInTheDocument();

      expect(screen.getAllByText('Name').length).toBe(2);
      const franchiseUserNameInput = screen.getByLabelText('Name');
      expect(franchiseUserNameInput).toBeInTheDocument();
      expect(franchiseUserNameInput).toBeDisabled();

      expect(screen.getAllByText('Gsm').length).toBe(3);
      const [franchiseUserGsmInput] = screen.getAllByLabelText('Gsm');
      expect(franchiseUserGsmInput).toBeInTheDocument();
      expect(franchiseUserGsmInput).toBeDisabled();

      expect(screen.getByText('Username')).toBeInTheDocument();
      const franchiseUserEmailInput = screen.getByLabelText('Username');
      expect(franchiseUserEmailInput).toBeInTheDocument();
      expect(franchiseUserEmailInput).toBeDisabled();

      expect(screen.getByText('Type:')).toBeInTheDocument();
      expect(screen.getByText('Courier Service Type:')).toBeInTheDocument();
      expect(screen.getByText('Created At:')).toBeInTheDocument();
      expect(screen.getByText('Safe Riding Training Date:')).toBeInTheDocument();
      expect(screen.getByText('Certificate Number:')).toBeInTheDocument();
    });

    it('should have correct employment type box content', () => {
      expect(screen.getByText('Employment Type')).toBeInTheDocument();
      const [employmentTypeInput] = screen.getAllByRole('combobox');
      expect(employmentTypeInput).toBeInTheDocument();
      expect(employmentTypeInput).toBeDisabled();
    });

    it('should show edit button in employment type box', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_COURIER_DETAIL_EMPLOYMENT]);
      });
      await waitFor(() => {
        const editButton = screen.getByRole('button', { name: 'Edit' });
        expect(editButton).toBeInTheDocument();
      });
    });

    it('should have correct domain box content', () => {
      expect(screen.getByText('Domain')).toBeInTheDocument();
      const [, domainSelectInput] = screen.getAllByRole('combobox');
      expect(domainSelectInput).toBeInTheDocument();
      expect(domainSelectInput).toBeDisabled();
    });

    it('should show edit button in domain box', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_COURIER_DETAIL_DOMAIN]);
      });
      await waitFor(() => {
        const [, editButton] = screen.getAllByRole('button', { name: 'Edit' });
        expect(editButton).toBeInTheDocument();
      });
    });

    it('should show save and cancel buttons after clicked edit button in domain box', async () => {
      const [, editButton] = screen.getAllByRole('button', { name: 'Edit' });
      userEvent.click(editButton);
      await waitFor(() => {
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        expect(cancelButton).toBeInTheDocument();
      });
      await waitFor(() => {
        const saveButton = screen.getByRole('button', { name: 'Save' });
        expect(saveButton).toBeInTheDocument();
      });
    });

    it('should be able to select domain in domain box', async () => {
      const [, domainSelectInput] = screen.getAllByRole('combobox');
      userEvent.click(domainSelectInput);
      const selectedDomain = screen.getByText('GetirLocals');
      userEvent.click(selectedDomain);
      await waitFor(() => {
        expect(screen.getAllByText('GetirLocals').length).toBe(2);
      });
    });

    it('should be able to select Gorillas in domain box', async () => {
      const [, domainSelectInput] = screen.getAllByRole('combobox');
      userEvent.click(domainSelectInput);
      const selectedDomain = screen.getByText('Gorillas');
      userEvent.click(selectedDomain);
      await waitFor(() => {
        expect(screen.getAllByText('Gorillas').length).toBe(2);
      });
    });

    it('should show edit button when clicked cancel button in domain box', async () => {
      let cancelButton = screen.getByRole('button', { name: 'Cancel' });
      userEvent.click(cancelButton);
      await waitFor(() => {
        cancelButton = screen.queryByRole('button', { name: 'Cancel' });
        expect(cancelButton).not.toBeInTheDocument();
      });
      await waitFor(() => {
        const saveButton = screen.queryByRole('button', { name: 'Save' });
        expect(saveButton).not.toBeInTheDocument();
      });
      await waitFor(() => {
        const [, editButton] = screen.getAllByRole('button', { name: 'Edit' });
        expect(editButton).toBeInTheDocument();
      });
    });

    it('should have correct available vehicles box content', () => {
      expect(screen.getByText('Available Vehicles')).toBeInTheDocument();
      const [, , availableVehiclesInput] = screen.getAllByRole('combobox');
      expect(availableVehiclesInput).toBeInTheDocument();
      expect(availableVehiclesInput).toBeDisabled();
    });

    it('should show edit button in available vehicles box', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_COURIER_DETAIL_VEHICLE]);
      });
      await waitFor(() => {
        const [, , editButton] = screen.getAllByRole('button', { name: 'Edit' });
        expect(editButton).toBeInTheDocument();
      });
    });

    it('should show save and cancel buttons after clicked edit button in available vehicles box', async () => {
      const [, , editButton] = screen.getAllByRole('button', { name: 'Edit' });
      userEvent.click(editButton);
      await waitFor(() => {
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        expect(cancelButton).toBeInTheDocument();
      });
      await waitFor(() => {
        const saveButton = screen.getByRole('button', { name: 'Save' });
        expect(saveButton).toBeInTheDocument();
      });
    });

    it('should show edit button when clicked cancel button in available vehicles box', async () => {
      let cancelButton = screen.getByRole('button', { name: 'Cancel' });
      userEvent.click(cancelButton);
      await waitFor(() => {
        cancelButton = screen.queryByRole('button', { name: 'Cancel' });
        expect(cancelButton).not.toBeInTheDocument();
      });
      await waitFor(() => {
        const saveButton = screen.queryByRole('button', { name: 'Save' });
        expect(saveButton).not.toBeInTheDocument();
      });
      await waitFor(() => {
        const [, , editButton] = screen.getAllByRole('button', { name: 'Edit' });
        expect(editButton).toBeInTheDocument();
      });
    });

    it('should have correct login box content', () => {
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Login Disabled')).toBeInTheDocument();
      const [loginCheckboxInput] = screen.getAllByRole('checkbox');
      expect(loginCheckboxInput).toBeInTheDocument();
      expect(loginCheckboxInput).toBeEnabled();
    });

    it('should show edit button in login box', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_COURIER_DETAIL_LOGIN]);
      });
      await waitFor(() => {
        const [, , , editButton] = screen.getAllByRole('button', { name: 'Edit' });
        expect(editButton).toBeInTheDocument();
      });
    });

    it('should show save and cancel buttons after clicked edit button in login box', async () => {
      const [, , , editButton] = screen.getAllByRole('button', { name: 'Edit' });
      userEvent.click(editButton);
      await waitFor(() => {
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        expect(cancelButton).toBeInTheDocument();
      });
      await waitFor(() => {
        const saveButton = screen.getByRole('button', { name: 'Save' });
        expect(saveButton).toBeInTheDocument();
      });
    });

    it('should show edit button when clicked cancel button in login box', async () => {
      let cancelButton = screen.getByRole('button', { name: 'Cancel' });
      userEvent.click(cancelButton);
      await waitFor(() => {
        cancelButton = screen.queryByRole('button', { name: 'Cancel' });
        expect(cancelButton).not.toBeInTheDocument();
      });
      await waitFor(() => {
        const saveButton = screen.queryByRole('button', { name: 'Save' });
        expect(saveButton).not.toBeInTheDocument();
      });
      await waitFor(() => {
        const [, , , editButton] = screen.getAllByRole('button', { name: 'Edit' });
        expect(editButton).toBeInTheDocument();
      });
    });

    it('should have correct home address box content', () => {
      expect(screen.getByText('Home Address')).toBeInTheDocument();
      const homeAddressInput = screen.getByPlaceholderText('Home Address');
      expect(homeAddressInput).toBeInTheDocument();
      expect(homeAddressInput).toBeDisabled();
    });

    it('should have correct personal info box content', () => {
      expect(screen.getByText('Personal Info')).toBeInTheDocument();
      expect(screen.getByText('National ID')).toBeInTheDocument();
      expect(screen.getAllByText('Country Code').length).toBe(2);
      expect(screen.getAllByText('Gsm').length).toBe(3);
    });

    it('should have correct relative info box content', () => {
      expect(screen.getByText('Relative Info')).toBeInTheDocument();
      expect(screen.getAllByText('Name').length).toBe(2);
      expect(screen.getAllByText('Country Code').length).toBe(2);
      expect(screen.getAllByText('Gsm').length).toBe(3);
      expect(screen.getByText('Relative Status')).toBeInTheDocument();
    });
    it('should have correct store information box content', () => {
      expect(screen.getByText('Store Information')).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Detail' })).not.toBeInTheDocument();
      expect(screen.getAllByText('Warehouse').length).toBe(1);
      expect(screen.getByText('Employer')).toBeInTheDocument();
      expect(screen.getByText('Work Status')).toBeInTheDocument();
    });

    it('should all inputs must be disabled initially in store information box', () => {
      const [, , , , , , warehousesSelectInput, employersSelectInput, workStatusSelectInput] = screen.getAllByRole('combobox');
      expect(warehousesSelectInput).toBeDisabled();
      expect(employersSelectInput).toBeDisabled();
      expect(workStatusSelectInput).toBeDisabled();
    });

    it('should show edit button in store information box', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_COURIER_DETAIL_STORE_INFORMATION]);
      });
      await waitFor(() => {
        const [, , , , editButton] = screen.getAllByRole('button', { name: 'Edit' });
        expect(editButton).toBeInTheDocument();
      });
    });

    it('should show save and cancel buttons after clicked edit button in store information box', async () => {
      const [, , , , editButton] = screen.getAllByRole('button', { name: 'Edit' });
      userEvent.click(editButton);
      await waitFor(() => {
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        expect(cancelButton).toBeInTheDocument();
      });
      await waitFor(() => {
        const saveButton = screen.getByRole('button', { name: 'Save' });
        expect(saveButton).toBeInTheDocument();
      });
    });

    it('should be able to select warehouse in store information box', async () => {
      let [, , , , , , warehousesSelectInput] = screen.getAllByRole('combobox');
      userEvent.click(warehousesSelectInput);
      const testText = await screen.findByText('test');
      userEvent.click(testText);
      [, , , , , , warehousesSelectInput] = screen.getAllByRole('combobox');
    });

    // TODO: fix this test. I tried myself, following these steps didn't work.
    // it('should be able to work correctly 2 times popconfirm for save button in store information box', async () => {
    //   const firstConfirmText = /Are you sure/;
    //   const secondConfirmText = /Do you confirm/;

    //   let saveButton = screen.getByRole('button', { name: 'Save' });
    //   userEvent.click(saveButton);
    //   await waitFor(() => {
    //     expect(screen.getByText(firstConfirmText)).toBeInTheDocument();
    //   });

    //   const [, cancelButton] = screen.getAllByRole('button', { name: 'Cancel' });
    //   userEvent.click(cancelButton);
    //   saveButton = await screen.findByRole('button', { name: 'Save' });
    //   userEvent.click(saveButton);
    //   await waitFor(() => {
    //     expect(screen.getByText(firstConfirmText)).toBeInTheDocument();
    //   });
    //   const okButton = await screen.findByRole('button', { name: 'OK' });
    //   userEvent.click(okButton);
    //   await expect(screen.getByText(secondConfirmText)).toBeInTheDocument();
    //   await expect(screen.queryByText(firstConfirmText)).not.toBeInTheDocument();
    // });

    // TODO fix this test. I tried myself, following these steps didn't work.
    // https://admin.develop.getirapi.com/courier/detail/587c9e24a1a56d0004072d82
    // it('should be able to save warehouse in store information box', async () => {
    //   const okButton = screen.getByRole('button', { name: 'OK' });
    //   userEvent.click(okButton);

    //   await waitFor(() => {
    //     const releaseButton = screen.getByRole('button', { name: 'Release' });
    //     expect(releaseButton).toBeInTheDocument();
    //   });
    // });

    // TODO: fix this test. I don't know if that's because the above test fails or not, release button is not in the view.
    // probably because no warehouse is assigned
    // it('should be able to work correctly release button in store information box', async () => {
    //   const releaseButton = screen.getByRole('button', { name: 'Release' });
    //   expect(releaseButton).toBeInTheDocument();
    //   userEvent.click(releaseButton);
    //   await waitFor(() => {
    //     expect(screen.getByText('Are you sure to RELEASE courier?')).toBeInTheDocument();
    //   });
    //   const okButton = screen.getByRole('button', { name: 'OK' });
    //   userEvent.click(okButton);
    // });

    it('should have correct current vehicle box content', () => {
      expect(screen.getByText('Current Vehicle')).toBeInTheDocument();
    });

    it('should have correct employers info box content', () => {
      expect(screen.getByText('GM & G10 Employers Info')).toBeInTheDocument();
    });

    let CourierStatusLogsCollapseHeader;
    it('should have courier status logs history component', () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_COURIER_DETAIL_STATUS_LOGS]);
      });
      CourierStatusLogsCollapseHeader = screen.getByText('Courier Status Logs History');
      expect(CourierStatusLogsCollapseHeader).toBeInTheDocument();
    });

    // it('should be able to fetch courier status logs when clicked on the header', async () => {
    //   userEvent.click(CourierStatusLogsCollapseHeader);
    //   await waitFor(() => {
    //     const CourierStatusLogsTable = screen.getByTestId('COURIER_DETAIL_STATUS_LOGS_TABLE');
    //     within(CourierStatusLogsTable).getByText('Log Time');
    //     within(CourierStatusLogsTable).getByText('Before');
    //     within(CourierStatusLogsTable).getByText('After');
    //     within(CourierStatusLogsTable).getByText('API Method');
    //     within(CourierStatusLogsTable).getByText('Changed By');
    //     within(CourierStatusLogsTable).getByText('Domain Types');
    //     within(CourierStatusLogsTable).getByText('2022-07-31 00:04:59');
    //     within(CourierStatusLogsTable).getByText('Returning');
    //     within(CourierStatusLogsTable).getAllByText('Free');
    //     within(CourierStatusLogsTable).getByText('/courier/{courierId}/free');
    //     within(CourierStatusLogsTable).getByText('Courier');
    //   });
    // });

    it('should have different text on orders table on initial load', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_COURIER_DETAIL_ORDER]);
      });

      await waitFor(() => {
        const orderHistoryTable = screen.getByTestId('courierOrdersTable');
        expect(orderHistoryTable).toBeInTheDocument();
        within(orderHistoryTable).getByText('To show entries, load the data');
      });
    });

    it('should have different text on orders table on after sending request', async () => {
      const loadDataBtn = screen.getByRole('button', { name: 'Load Data' });
      const orderHistoryTable = screen.getByTestId('courierOrdersTable');

      expect(loadDataBtn).toBeInTheDocument();
      expect(orderHistoryTable).toBeInTheDocument();

      userEvent.click(loadDataBtn);

      await waitFor(() => {
        within(orderHistoryTable).getByText('No Data');
      });
    });

    it('should collect logs button work ', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_COURIER_DETAIL_COMPONENT_MDU_DIAGNOSTIC_LOGS]);
      });
      let collectLogsButton;
      await waitFor(() => {
        collectLogsButton = screen.getByRole('button', { name: /Collect Courier Logs/i });
        expect(collectLogsButton).toBeInTheDocument();
      });

      userEvent.click(collectLogsButton);
      waitForToastElementToAppear();
    });

    it('should reset password button work ', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_COURIER_DETAIL_COMPONENT_RESET_PASSWORD]);
      });
      let resetPasswordButton;
      await waitFor(() => {
        resetPasswordButton = screen.getByRole('button', { name: /Reset Password/i });
        expect(resetPasswordButton).toBeInTheDocument();
      });

      userEvent.click(resetPasswordButton);
      waitForToastElementToAppear();
    });

    it('should download logs button work ', async () => {
      const downloadLogButton = await screen.findByText(/Download Courier Log/i);
      expect(downloadLogButton).toBeInTheDocument();

      userEvent.click(downloadLogButton);

      await waitFor(() => {
        expect(window.open).toHaveBeenCalledWith(courierDetailMock.mduDiagnosticLogInfo.url, '_blank');
      });
    });
  });
});
