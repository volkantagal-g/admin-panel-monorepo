import '@test/publicUtils/configureWithoutCleanup';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PageComponent from '.';
import permKey from '@shared/shared/permKey.json';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';

describe('For app level Features', () => {
  let renderResult;
  it('should render without an error', async () => {
    renderResult = await renderPage({
      pagePermKey: permKey.PAGE_PERSON_DETAIL,
      pageUrl: '/person/detail/6374bb8a9c0088907ab11d80',
      pageComponent: PageComponent,
    });
    await waitPageToRenderSomething();
  });

  describe('For page features', () => {
    it('should show Profile box', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_PROFILE_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_PROFILE_BOX_EDIT,
      ]);
      let changeMainPictureButton;
      let changePasswordButton;
      let activeSwitch;
      await waitFor(() => {
        changePasswordButton = screen.getByRole('button', { name: /change password/i });
        changeMainPictureButton = screen.getByRole('button', { name: /change main picture/i });
        activeSwitch = screen.getByRole('switch', { name: /active/i });
      });
      expect(changePasswordButton).toBeInTheDocument();
      expect(changeMainPictureButton).toBeInTheDocument();
      expect(activeSwitch).toBeInTheDocument();

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_PROFILE_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_PROFILE_BOX_EDIT,
      ]);
    });

    it('should show GeneralInfo box correctly if has permission', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_GENERAL_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_GENERAL_BOX_EDIT,
      ]);
      await screen.findAllByText('Name');
      await screen.findAllByText('Username');
      await screen.findAllByText('Gsm');
      await screen.findAllByText('E-mail');
      await screen.findAllByText('Created At');
      await screen.findAllByText('Safe Riding Training Date');
      await screen.findAllByText('GetirFinance Delivery Training Date');
      await screen.findAllByText('Blood Type');
      await screen.findAllByText('Payment Country Info');
      await screen.findAllByText('IBAN');
      await screen.findAllByText('Is outsourced ?');
      await screen.findAllByText('Gorillas Employee');
      await screen.findAllByText('Date of Birth');
      await screen.findAllByText('Driving License Date');
      await screen.findAllByText('Driving License Types');
      await screen.findAllByText('Employment Start Date');

      // All fields should be disabled first
      const nameInput = screen.getByLabelText('Name');
      const usernameInput = screen.getByLabelText('Username');
      const gsmInput = screen.getByLabelText('Gsm');
      const emailInput = screen.getByLabelText('E-mail');
      const createdAtInput = screen.getByLabelText('Created At');
      const safeRidingTrainingDateInput = screen.getByLabelText('Safe Riding Training Date');
      const getirFinanceDeliveryTrainingDateInput = screen.getByLabelText('GetirFinance Delivery Training Date');
      const ibanInput = screen.getByLabelText('IBAN');
      const dateOfBirthInput = screen.getByLabelText('Date of Birth');
      const drivingLicenseDateInput = screen.getByLabelText('Driving License Date');
      const employmentStartDateInput = screen.getByLabelText('Employment Start Date');
      const [
        bloodTypeInput,
        paymentCountryInfoInput,
        isOutsourcedInput,
        gorillasEmployeeInput,
        drivingLicenseTypesInput,
      ] = screen.getAllByRole('combobox');

      expect(nameInput).toBeDisabled();
      expect(usernameInput).toBeDisabled();
      expect(gsmInput).toBeDisabled();
      expect(emailInput).toBeDisabled();
      expect(createdAtInput).toBeDisabled();
      expect(safeRidingTrainingDateInput).toBeDisabled();
      expect(getirFinanceDeliveryTrainingDateInput).toBeDisabled();
      expect(bloodTypeInput).toBeDisabled();
      expect(paymentCountryInfoInput).toBeDisabled();
      expect(ibanInput).toBeDisabled();
      expect(isOutsourcedInput).toBeDisabled();
      expect(gorillasEmployeeInput).toBeDisabled();
      expect(dateOfBirthInput).toBeDisabled();
      expect(drivingLicenseDateInput).toBeDisabled();
      expect(drivingLicenseTypesInput).toBeDisabled();
      expect(employmentStartDateInput).toBeDisabled();

      const editButton = screen.getByText(/edit/i);
      userEvent.click(editButton);

      expect(nameInput).toBeEnabled();
      expect(usernameInput).toBeEnabled();
      expect(emailInput).toBeEnabled();
      expect(safeRidingTrainingDateInput).toBeEnabled();
      expect(getirFinanceDeliveryTrainingDateInput).toBeEnabled();
      expect(bloodTypeInput).toBeEnabled();
      expect(paymentCountryInfoInput).toBeEnabled();
      expect(ibanInput).toBeEnabled();
      expect(isOutsourcedInput).toBeEnabled();
      expect(gorillasEmployeeInput).toBeEnabled();
      expect(dateOfBirthInput).toBeEnabled();
      expect(drivingLicenseDateInput).toBeEnabled();
      expect(drivingLicenseTypesInput).toBeEnabled();
      expect(employmentStartDateInput).toBeEnabled();

      // Gsm and Created At fields should stay disabled
      expect(gsmInput).toBeDisabled();
      expect(createdAtInput).toBeDisabled();
      userEvent.type(paymentCountryInfoInput, '{enter}');
      userEvent.type(drivingLicenseTypesInput, '{enter}');
      userEvent.type(ibanInput, 'TR860006237839483589815536');
      const saveButton = screen.getByText(/save/i);
      userEvent.click(saveButton);
      const okButton = screen.getByText(/ok/i);
      userEvent.click(okButton);

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_GENERAL_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_GENERAL_BOX_EDIT,
      ]);
    });

    it('should show PersonalInfo box correctly if has permission', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_PERSONAL_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_PERSONAL_BOX_EDIT,
      ]);
      await screen.findAllByText('National ID');
      await screen.findAllByText('Country');
      await screen.findAllByText('Personal Gsm');
      await screen.findAllByText('Employee Discount');

      const nationalIdInput = screen.getByLabelText('National ID');
      const countryInput = screen.getByLabelText('Country');
      const personalGsmInput = screen.getByLabelText('Personal Gsm');
      const employeeDiscountInput = screen.getByLabelText('Employee Discount');

      expect(nationalIdInput).toBeDisabled();
      expect(countryInput).toBeDisabled();
      expect(personalGsmInput).toBeDisabled();
      expect(employeeDiscountInput).toBeDisabled();

      const editButton = screen.getByText(/edit/i);
      userEvent.click(editButton);

      expect(nationalIdInput).toBeEnabled();
      expect(countryInput).toBeEnabled();
      expect(personalGsmInput).toBeEnabled();
      expect(employeeDiscountInput).toBeEnabled();

      userEvent.type(nationalIdInput, '66371011038');

      userEvent.click(countryInput);
      userEvent.type(countryInput, '{enter}');

      userEvent.type(personalGsmInput, '5554443322');

      userEvent.click(employeeDiscountInput);
      userEvent.type(employeeDiscountInput, '{enter}');

      const saveButton = screen.getByText(/save/i);
      userEvent.click(saveButton);
      const okButton = screen.getByText(/ok/i);
      userEvent.click(okButton);

      await waitFor(() => {
        const [alertBox] = screen.getAllByRole('alert');
        expect(alertBox).toBeInTheDocument();
      });

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_PERSONAL_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_PERSONAL_BOX_EDIT,
      ]);
    });

    it('should show RelativeInfo box correctly if has permission', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_RELATIVE_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_RELATIVE_BOX_EDIT,
      ]);
      await screen.findAllByText('Name');
      await screen.findAllByText('Gsm');
      await screen.findAllByText('Relative Status');

      const nameInput = screen.getByPlaceholderText('Name');
      const relativeStatus = screen.getByLabelText('Relative Status');

      expect(nameInput).toBeDisabled();

      const editButton = screen.getByText(/edit/i);
      userEvent.click(editButton);

      await waitFor(() => {
        expect(nameInput).toBeEnabled();
      });

      userEvent.type(nameInput, 'name');
      expect(nameInput).toHaveValue('name');

      userEvent.click(relativeStatus);
      userEvent.type(relativeStatus, '{enter}');

      const saveButton = screen.getByText(/save/i);
      userEvent.click(saveButton);
      const okButton = screen.getByText(/ok/i);
      userEvent.click(okButton);
      await waitFor(() => {
        const [alertBox] = screen.getAllByRole('alert');
        expect(alertBox).toBeInTheDocument();
      });

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_RELATIVE_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_RELATIVE_BOX_EDIT,
      ]);
    });

    it('should show Home Adress box correctly if has permission', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_HOME_ADDRESS_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_HOME_ADDRESS_BOX_EDIT,
      ]);

      await screen.findByLabelText('Home Address');
      const addressInput = screen.getByLabelText('Home Address');
      expect(addressInput).toBeDisabled();
      const editButton = screen.getByText(/edit/i);
      userEvent.click(editButton);
      await waitFor(() => {
        expect(addressInput).toBeEnabled();
      });
      userEvent.type(addressInput, 'address');

      const saveButton = screen.getByText(/save/i);
      userEvent.click(saveButton);
      const okButton = screen.getByText(/ok/i);
      userEvent.click(okButton);

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_HOME_ADDRESS_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_HOME_ADDRESS_BOX_EDIT,
      ]);
    });

    it('should show EmploymentInfo box correctly if has permission', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_EMPLOYMENT_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_EMPLOYMENT_BOX_EDIT,
      ]);
      await screen.findAllByText('Employment Info');

      const employmentType = screen.getByLabelText('Employment Info');
      expect(employmentType).toBeDisabled();
      const editButton = screen.getByText(/edit/i);
      userEvent.click(editButton);
      await waitFor(() => {
        expect(employmentType).toBeEnabled();
      });

      userEvent.type(employmentType, 'Self Employed{enter}');
      const saveButton = screen.getByText(/save/i);
      userEvent.click(saveButton);
      const okButton = screen.getByText(/ok/i);
      userEvent.click(okButton);

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_EMPLOYMENT_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_EMPLOYMENT_BOX_EDIT,
      ]);
    });

    it('should show TrainingsInfo box correctly if has permission', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_TRAININGS_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_TRAININGS_BOX_EDIT,
      ]);
      await screen.findAllByText('Franchise');
      await screen.findAllByText('Date');
      await screen.findAllByText('Certificate No');
      await screen.findAllByText('Trainer');
      await screen.findAllByText('Training Name');

      const dateInput = screen.getByLabelText(/date/i);
      const certificateNoInput = screen.getByLabelText('Certificate No');
      const trainerInput = screen.getByLabelText('Trainer');
      const [franchise, trainingNameInput] = screen.getAllByRole('combobox');

      expect(franchise).toBeDisabled();
      expect(dateInput).toBeDisabled();
      expect(certificateNoInput).toBeDisabled();
      expect(trainerInput).toBeDisabled();
      expect(trainingNameInput).toBeDisabled();

      const editButton = screen.getByText(/edit/i);
      userEvent.click(editButton);

      expect(franchise).toBeEnabled();
      expect(dateInput).toBeEnabled();
      expect(certificateNoInput).toBeEnabled();
      expect(trainerInput).toBeEnabled();
      expect(trainingNameInput).toBeEnabled();

      userEvent.type(franchise, '{enter}');
      userEvent.type(dateInput, '2024-03-12{enter}');
      userEvent.type(certificateNoInput, '112233');
      userEvent.type(trainerInput, 'trainer');
      userEvent.type(trainingNameInput, '{enter}');

      const saveButton = screen.getByText(/save/i);
      userEvent.click(saveButton);
      const okButton = screen.getByText(/ok/i);
      userEvent.click(okButton);

      await waitFor(() => {
        const [alertBox] = screen.getAllByRole('alert');
        expect(alertBox).toBeInTheDocument();
      });

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_TRAININGS_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_TRAININGS_BOX_EDIT,
      ]);
    });

    it('should show Courier Login box', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_COURIER_LOGIN_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_COURIER_LOGIN_BOX_EDIT,
      ]);
      await screen.findAllByText('Courier Login');

      const loginDisabled = screen.getByLabelText('Login Disabled');
      expect(loginDisabled).toBeDisabled();
      const editButton = screen.getByText(/edit/i);
      userEvent.click(editButton);
      await waitFor(() => {
        expect(loginDisabled).toBeEnabled();
      });

      userEvent.type(loginDisabled, 'Yes{enter}');
      const reasonInput = screen.getByLabelText('Reason');
      const explanationInput = screen.getByLabelText('Explanation');
      userEvent.type(reasonInput, 'Violation of Law{enter}');
      userEvent.type(explanationInput, 'note{enter}');

      const saveButton = screen.getByText(/save/i);
      userEvent.click(saveButton);
      const okButton = screen.getByText(/ok/i);
      userEvent.click(okButton);

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_COURIER_LOGIN_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_COURIER_LOGIN_BOX_EDIT,
      ]);
    });

    it('should show Courier Login Open Close History box', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_COURIER_LOGIN_HISTORY_BOX_VIEW,
      ]);
      await waitFor(() => {
        const table = screen.getByTestId('courier-login-history-table');
        expect(table).toBeInTheDocument();
      });
      await screen.findByText('Date');
      await screen.findByText('Reason');
      await screen.findByText('Explanation');

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_COURIER_LOGIN_HISTORY_BOX_VIEW,
      ]);
    });

    it('should show Couriers box', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_COURIERS_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_COURIERS_BOX_EDIT,
      ]);
      await screen.findByText('Create Courier');
      await screen.findByText('Type');
      await screen.findByText('Status');
      await screen.findByText('Activeness');
      await screen.findByText('Warehouse');

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_COURIERS_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_COURIERS_BOX_EDIT,
      ]);
    });

    it('should show Pickers box', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_PICKERS_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_PICKERS_BOX_EDIT,
      ]);
      await screen.findByText('Create Picker');
      await screen.findByText('Type');
      await screen.findByText('Status');
      await screen.findByText('Activeness');
      await screen.findByText('Warehouse');

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_PICKERS_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_PICKERS_BOX_EDIT,
      ]);
    });

    it('should show Note box', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_NOTES_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_NOTES_BOX_EDIT,
      ]);
      await screen.findByText('Note');

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_NOTES_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_NOTES_BOX_EDIT,
      ]);
    });

    it('should show Franchise Employers Info box correctly and edit if has permission', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_FRANCHISE_EMPLOYERS_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_FRANCHISE_EMPLOYERS_BOX_EDIT,
      ]);
      await screen.findByText('Franchise Employers Info');
      const [employer, workType, contractType, franchiseArea] = screen.getAllByRole('combobox');

      const editButton = screen.getByText(/edit employers/i);
      userEvent.click(editButton);
      await waitFor(() => {
        expect(franchiseArea).toBeEnabled();
      });
      userEvent.type(franchiseArea, '{enter}');
      userEvent.type(workType, '{enter}');
      userEvent.type(employer, '{enter}');
      userEvent.type(contractType, '{enter}');
      const saveButton = screen.getByText(/save/i);
      userEvent.click(saveButton);
      const okButton = screen.getByText(/ok/i);
      userEvent.click(okButton);
    });

    it('should add new Franchise Employer if has permission', async () => {
      await screen.findByText('Add New Employer');
      const addNewTab = screen.getByText(/add new employer/i);
      userEvent.click(addNewTab);
      const [employer, workType, contractType, franchiseArea] = screen.getAllByRole('combobox');
      await waitFor(() => {
        expect(franchiseArea).toBeEnabled();
      });

      userEvent.type(employer, '{enter}');
      userEvent.type(workType, '{enter}');
      userEvent.type(contractType, '{enter}');
      await waitFor(() => {
        expect(franchiseArea).toBeEnabled();
      });
      userEvent.type(franchiseArea, '{enter}');

      const submitButton = screen.getByText(/submit/i);
      userEvent.click(submitButton);
      const okButton = screen.getByText(/ok/i);
      userEvent.click(okButton);

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_FRANCHISE_EMPLOYERS_BOX_VIEW,
        permKey.PAGE_PERSON_DETAIL_FRANCHISE_EMPLOYERS_BOX_EDIT,
      ]);
    });

    it('should show Integrations box', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_INTEGRATIONS_BOX,
      ]);
      await screen.findByText('Payroll ID');
      const loginInput = screen.getByLabelText('Payroll ID');
      expect(loginInput).toBeDisabled();

      const editButton = screen.getByText(/edit/i);
      userEvent.click(editButton);
      await waitFor(() => {
        expect(loginInput).toBeEnabled();
      });
      userEvent.type(loginInput, 'payroll_id{enter}');
      const saveButton = screen.getByText(/save/i);
      userEvent.click(saveButton);
      const okButton = screen.getByText(/ok/i);
      userEvent.click(okButton);

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_INTEGRATIONS_BOX,
      ]);
    });

    it('should show Getir Up Trainings table if has permission', async () => {
      renderResult.addUserPermissions([
        permKey.PAGE_PERSON_DETAIL_COMPONENT_GETIRUP_TRAININGS_BOX,
        permKey.PAGE_PERSON_DETAIL_COMPONENT_GETIRUP_TRAININGS_BOX,
      ]);
      await waitFor(() => {
        const table = screen.getByTestId('getir-up-trainings-table');
        expect(table).toBeInTheDocument();
      });
      await screen.findAllByText('Training Name');
      await screen.findAllByText('Training Date');
      await screen.findAllByText('Status');
      await screen.findAllByText('Exam Result');

      renderResult.removeUserPermissions([
        permKey.PAGE_PERSON_DETAIL_COMPONENT_GETIRUP_TRAININGS_BOX,
        permKey.PAGE_PERSON_DETAIL_COMPONENT_GETIRUP_TRAININGS_BOX,
      ]);
    });
  });
});
