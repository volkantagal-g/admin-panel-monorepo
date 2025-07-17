import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup, waitFor, act, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import {
  waitPageToRenderSomething,
  waitForAntTableHeaderTables,
  waitForAntTableBodies,
} from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import {
  getFranchiseMock as franchiseInformationMock,
  getCrisesManagementCards as getCrisesManagementCardsMock,
} from '@shared/api/marketFranchise/index.mock.data';
import PageComponent from '.';

const franchiseTestId = '625fb9b85180d85391aa41cb';
const initialUrl = `/marketFranchise/detail/${franchiseTestId}`;

afterAll(cleanup);
describe('In Franchise Detail Page:', () => {
  let renderResult;

  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_MARKET_FRANCHISE_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });

  describe('For page features', () => {
    const exampleTopic = 'Incompatibility compared to employees';

    it('should have correct franchise type box content', () => {
      expect(screen.getAllByText('Franchise Type').length).toBe(2);
      const [editButton] = screen.getAllByRole('button', { name: 'Edit' });
      expect(editButton).toBeInTheDocument();
    });

    it('should show error toaster when clicking edit button if user is inactive in franchise type box', async () => {
      const [editButton] = screen.getAllByRole('button', { name: 'Edit' });
      userEvent.click(editButton);
      const errorText = 'Franchise status should be inactive';
      await waitFor(() => {
        expect(screen.getByText(errorText)).toBeInTheDocument();
      });
    });

    it('should have correct franchise information box content', () => {
      expect(screen.getByText('Franchise Info')).toBeInTheDocument();

      expect(screen.getByText('Tax Office')).toBeInTheDocument();
      const franchiseTaxOfficeInput = screen.getByLabelText('Tax Office');
      expect(franchiseTaxOfficeInput).toBeInTheDocument();
      expect(franchiseTaxOfficeInput).toBeDisabled();

      expect(screen.getByText('Tax Number')).toBeInTheDocument();
      const franchiseTaxNumberInput = screen.getByLabelText('Tax Number');
      expect(franchiseTaxNumberInput).toBeInTheDocument();
      expect(franchiseTaxNumberInput).toBeDisabled();

      expect(screen.getByText('Franchise Name')).toBeInTheDocument();
      const franchiseNameInput = screen.getByLabelText('Franchise Name');
      expect(franchiseNameInput).toBeInTheDocument();
      expect(franchiseNameInput).toBeDisabled();

      const [, editButton] = screen.getAllByRole('button', { name: 'Edit' });
      expect(editButton).toBeInTheDocument();
    });

    it('should show save and cancel buttons after clicked edit button in franchise information box', async () => {
      expect(screen.queryByRole('button', { name: 'Cancel' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();
      const [, editButton] = screen.getAllByRole('button', { name: 'Edit' });
      userEvent.click(editButton);
      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
      });
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('should be able to change inputs in franchise information box', () => {
      const mockFranchiseTaxOfficeText = 'Franchise Tax Office Testing Library Test';
      const franchiseTaxOfficeInput = screen.getByLabelText('Tax Office');
      expect(franchiseTaxOfficeInput.value).toBe(franchiseInformationMock.taxOffice);
      userEvent.clear(franchiseTaxOfficeInput);
      userEvent.type(franchiseTaxOfficeInput, mockFranchiseTaxOfficeText);
      expect(franchiseTaxOfficeInput.value).toBe(mockFranchiseTaxOfficeText);

      const mockFranchiseTaxNumberText = '1122334455';
      const franchiseTaxNumberInput = screen.getByLabelText('Tax Number');
      expect(franchiseTaxNumberInput.value).toBe(franchiseInformationMock.taxNumber);
      userEvent.clear(franchiseTaxNumberInput);
      userEvent.type(franchiseTaxNumberInput, mockFranchiseTaxNumberText);
      expect(franchiseTaxNumberInput.value).toBe(mockFranchiseTaxNumberText);

      const mockFranchiseNameText = 'Franchise Name Testing Library Test';
      const franchiseNameInput = screen.getByLabelText('Franchise Name');
      expect(franchiseNameInput.value).toBe(franchiseInformationMock.name);
      userEvent.clear(franchiseNameInput);
      userEvent.type(franchiseNameInput, mockFranchiseNameText);
      expect(franchiseNameInput.value).toBe(mockFranchiseNameText);
    });

    it('should be able to save changes in franchise information box', async () => {
      userEvent.click(screen.getByRole('button', { name: 'Save' }));
      await waitFor(() => {
        expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument();
      });
      expect(screen.getAllByRole('button', { name: 'Edit' }).length).toBe(3);
    });

    it('should work correctly cancel button in franchise information box', async () => {
      const [, editButton] = screen.getAllByRole('button', { name: 'Edit' });
      userEvent.click(editButton);
      await waitFor(() => {
        expect(screen.getAllByRole('button', { name: 'Edit' }).length).toBe(2);
      });

      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      userEvent.click(cancelButton);
      await waitFor(() => {
        expect(screen.getAllByRole('button', { name: 'Edit' }).length).toBe(3);
      });
    });

    it('should have correct ownership box header', () => {
      expect(screen.getByText('Ownership')).toBeInTheDocument();
    });

    it('should have correct Owner Info box content', async () => {
      expect(screen.getByText('Owner Info')).toBeInTheDocument();

      const ownerNameInput = screen.getByLabelText('Name');
      expect(ownerNameInput).toBeInTheDocument();

      const ownerPhoneNumberInput = screen.getByLabelText('Phone Number');
      expect(ownerPhoneNumberInput).toBeInTheDocument();

      const ownerPhoneNumberAlternativeInput = screen.getByLabelText('Phone Number (Alternative)');
      expect(ownerPhoneNumberAlternativeInput).toBeInTheDocument();

      const ownerPhoneEmailInput = screen.getByLabelText('Email');
      expect(ownerPhoneEmailInput).toBeInTheDocument();
    });

    it('Owner Info should revert back to initial values on cancel', async () => {
      expect(screen.getByText('Owner Info')).toBeInTheDocument();

      const ownerPhoneNumberAlternativeInput = screen.getByLabelText('Phone Number (Alternative)');

      const [, , editButton] = screen.getAllByRole('button', { name: 'Edit' });
      userEvent.click(editButton);
      await waitFor(() => {
        expect(ownerPhoneNumberAlternativeInput).toBeEnabled();
      });

      fireEvent.change(ownerPhoneNumberAlternativeInput, { target: { value: 'Foo Bar' } });

      const cancelButton = screen.getByRole('button', { name: 'Cancel' });
      userEvent.click(cancelButton);

      await waitFor(() => {
        expect(ownerPhoneNumberAlternativeInput).toHaveValue(franchiseInformationMock.owners[0].gsmAlt);
      });
    });

    it('Owner Info should save succesfully', async () => {
      const ownerPhoneNumberAlternativeInput = screen.getByLabelText('Phone Number (Alternative)');

      const [, , editButton] = screen.getAllByRole('button', { name: 'Edit' });
      userEvent.click(editButton);
      await waitFor(() => {
        expect(ownerPhoneNumberAlternativeInput).toBeEnabled();
      });

      fireEvent.change(ownerPhoneNumberAlternativeInput, { target: { value: '111222' } });

      const saveButton = screen.getByRole('button', { name: 'Save' });
      userEvent.click(saveButton);
    });

    it('Owner Info should not submit if no data has changed', async () => {
      const ownerPhoneNumberAlternativeInput = screen.getByLabelText('Phone Number (Alternative)');

      await waitFor(() => {
        expect(ownerPhoneNumberAlternativeInput).toBeEnabled();
      });

      fireEvent.change(ownerPhoneNumberAlternativeInput, { target: { value: franchiseInformationMock.owners[0].gsmAlt } });

      const saveButton = screen.getByRole('button', { name: 'Save' });
      userEvent.click(saveButton);

      await waitFor(() => {
        expect(ownerPhoneNumberAlternativeInput).toBeEnabled();
      });
    });

    it('should have correct ownership table component header', async () => {
      const [ownershipTableHeader] = await waitForAntTableHeaderTables();
      within(ownershipTableHeader).getByText('Name');
      within(ownershipTableHeader).getByText('Phone Number');
    });

    it('should have correct ownership table component content', async () => {
      const [ownershipTableContent] = await waitForAntTableBodies();
      await waitFor(() => {
        within(ownershipTableContent).getByText(franchiseInformationMock.owners[0].name);
      });
      within(ownershipTableContent).getByText(franchiseInformationMock.owners[0].gsm);
      within(ownershipTableContent).getByRole('button', { name: 'Detail' });
    });

    it('should show detail buttons and edit modal in crises management box', async () => {
      const { addUserPermissions } = renderResult;
      const ownersCount = franchiseInformationMock.owners.length;
      let detailButtonsArr;

      act(() => {
        addUserPermissions([
          permKey.PAGE_MARKET_FRANCHISE_DETAIL_CRISIS_CARD_LIST,
          permKey.PAGE_MARKET_FRANCHISE_DETAIL_CRISIS_CARD_DETAIL,
          permKey.PAGE_MARKET_FRANCHISE_DETAIL_UPDATE_CRISIS_CARD_MODAL,
        ]);
      });

      await waitFor(() => {
        detailButtonsArr = screen.getAllByRole('button', { name: 'Detail' });
        expect(detailButtonsArr.length).toBe(getCrisesManagementCardsMock.count + ownersCount);
      });

      userEvent.click(detailButtonsArr[ownersCount]);
      await waitFor(() => {
        expect(screen.getByText('Edit Card')).toBeInTheDocument();
      });
      await waitFor(() => {
        expect(screen.getAllByText('Topic').length).toBe(2);
      });
    });

    it('should have correct Franchise Area box content', async () => {
      expect(screen.getByText('Franchise Areas')).toBeInTheDocument();
      const addButton = screen.getByRole('button', { name: 'Add Area' });
      const areaInput = screen.getByPlaceholderText('Input Area Name');
      expect(areaInput).toBeInTheDocument();
      userEvent.type(areaInput, 'area 1');
      await waitFor(() => {
        expect(areaInput).toHaveValue('area 1');
      });
      userEvent.click(addButton);
      const confirmButton = screen.getByText(/yes/i);
      userEvent.click(confirmButton);
    });

    it('should update Franchise Area box content', async () => {
      const [editButton] = screen.getAllByRole('button', { name: 'edit-franchise-area' });
      expect(editButton).toBeInTheDocument();
      userEvent.click(editButton);

      const saveButton = screen.getByRole('button', { name: 'edit-franchise-area' });
      expect(saveButton).toBeInTheDocument();

      const updatedAreaInput = screen.getByDisplayValue('Area 1');
      expect(updatedAreaInput).toBeInTheDocument();

      userEvent.type(updatedAreaInput, 'updated area');
      await waitFor(() => {
        expect(updatedAreaInput).toHaveValue('Area 1updated area');
      });

      userEvent.click(saveButton);

      await waitFor(() => {
        expect(updatedAreaInput).toHaveValue('Area 1updated area');
      });
    });

    it('should delete Franchise Area box content', async () => {
      const [editButton] = screen.getAllByRole('button', { name: 'edit-franchise-area' });
      expect(editButton).toBeInTheDocument();
      userEvent.click(editButton);

      const deleteButton = screen.getByRole('button', { name: 'delete-franchise-area' });
      expect(deleteButton).toBeInTheDocument();

      userEvent.click(deleteButton);

      await waitFor(() => {
        expect(screen.queryByText('Area 1')).not.toBeInTheDocument();
      });
    });

    it('should cancel  Franchise Area box content', async () => {
      const [editButton] = screen.getAllByRole('button', { name: 'edit-franchise-area' });
      expect(editButton).toBeInTheDocument();
      userEvent.click(editButton);

      const cancelButton = screen.getByRole('button', { name: 'cancel-franchise-area' });
      expect(cancelButton).toBeInTheDocument();

      const areaInput = screen.getByDisplayValue('Area 1');
      expect(areaInput).toBeInTheDocument();

      userEvent.type(areaInput, 'updated area');
      await waitFor(() => {
        expect(areaInput).toHaveValue('Area 1updated area');
      });

      userEvent.click(cancelButton);
    });

    // TODO: fails randomly, fix it
    it.skip('should be able to edit changes in crises management box', async () => {
      const [, , , topicSelectInput] = screen.getAllByRole('combobox');
      await waitFor(() => {
        expect(topicSelectInput).toBeInTheDocument();
      });
      expect(topicSelectInput).toBeEnabled();

      userEvent.click(topicSelectInput);
      let selectedTopic;
      await waitFor(() => {
        selectedTopic = screen.getByText(exampleTopic);
        expect(selectedTopic).toBeInTheDocument();
      });

      userEvent.click(selectedTopic);
      await waitFor(() => {
        expect(selectedTopic).toHaveTextContent(exampleTopic);
      });

      const firstOkButton = screen.getByRole('button', { name: 'Ok' });
      let secondOkButton;
      userEvent.click(firstOkButton);
      await waitFor(() => {
        [, secondOkButton] = screen.getAllByRole('button', { name: 'Ok' });
        expect(secondOkButton).toBeInTheDocument();
      });

      userEvent.click(secondOkButton);
      await waitFor(() => {
        expect(screen.getAllByText(exampleTopic).length).toBe(2);
      });
    });
  });
});
