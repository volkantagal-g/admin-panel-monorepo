import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PageComponent from '.';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getFranchisesConfigMock } from '@shared/api/fieldAnnouncement/index.mock.handler';

const initialUrl = '/field-announcement/create';

describe('In Field Announcement Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    mockApiPerTestCase(getFranchisesConfigMock);
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_FIELD_ANNOUNCEMENT_CREATE,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });

  describe('For page features', () => {
    it('should have correct card titles', () => {
      expect(screen.getByText('Announcement Type')).toBeInTheDocument();
      expect(screen.getByText('Announcement')).toBeInTheDocument();
    });

    it('should have correct fields when page first opened', async () => {
      const [announcementTypeSelectInput] = screen.getAllByRole('combobox');
      expect(announcementTypeSelectInput).toBeInTheDocument();
      expect(announcementTypeSelectInput).toBeEnabled();
      expect(announcementTypeSelectInput).not.toHaveValue();

      expect(screen.getByText('Warehouses')).toBeInTheDocument();
      const [, warehouseSelectInput] = screen.getAllByRole('combobox');
      expect(warehouseSelectInput).toBeInTheDocument();
      expect(warehouseSelectInput).toBeDisabled();
      expect(warehouseSelectInput).not.toHaveValue();

      expect(screen.getByText('Franchises')).toBeInTheDocument();
      const franchiseSelectInput = screen.getByPlaceholderText('Select Franchises');
      expect(franchiseSelectInput).toBeInTheDocument();
      expect(franchiseSelectInput).toBeDisabled();
      expect(franchiseSelectInput).not.toHaveValue();

      expect(screen.getByText('Title in Native Language')).toBeInTheDocument();
      const titleNativeInput = screen.getByPlaceholderText('Title in Native Language');
      expect(titleNativeInput).toBeInTheDocument();
      expect(titleNativeInput).toBeDisabled();
      expect(titleNativeInput).not.toHaveValue();

      expect(screen.getByText('Title in English')).toBeInTheDocument();
      const titleEnInput = screen.getByPlaceholderText('Title in English');
      expect(titleEnInput).toBeInTheDocument();
      expect(titleEnInput).toBeDisabled();
      expect(titleEnInput).not.toHaveValue();

      expect(screen.getByText('Description in Native Language')).toBeInTheDocument();
      const descriptionNativeInput = screen.getByPlaceholderText('Description in Native Language');
      expect(descriptionNativeInput).toBeInTheDocument();
      expect(descriptionNativeInput).toBeDisabled();
      expect(descriptionNativeInput).not.toHaveValue();

      expect(screen.getByText('Description in English')).toBeInTheDocument();
      const descriptionEnInput = screen.getByPlaceholderText('Description in English');
      expect(descriptionEnInput).toBeInTheDocument();
      expect(descriptionEnInput).toBeDisabled();
      expect(descriptionEnInput).not.toHaveValue();

      expect(screen.getByText('Active')).toBeInTheDocument();
      const activeSwitchInput = screen.getByRole('switch', { name: 'Active' });
      expect(activeSwitchInput).toBeInTheDocument();
      expect(activeSwitchInput).toBeDisabled();

      expect(screen.getByText('Send Notification')).toBeInTheDocument();
      const isNotification = screen.getByRole('checkbox', { name: 'Send Notification' });
      expect(isNotification).toBeInTheDocument();
      expect(isNotification).toBeDisabled();

      expect(screen.getByText('Announcement Date')).toBeInTheDocument();
      const startDateInput = screen.getByPlaceholderText('start date');
      const endDateInput = screen.getByPlaceholderText('end date');
      expect(startDateInput).toBeInTheDocument();
      expect(startDateInput).toBeDisabled();
      expect(startDateInput).not.toHaveValue();
      expect(endDateInput).toBeInTheDocument();
      expect(endDateInput).toBeDisabled();
      expect(endDateInput).not.toHaveValue();

      const createButton = screen.getByRole('button', { name: 'Create' });
      expect(createButton).toBeInTheDocument();
      expect(createButton).toBeDisabled();
    });

    it('should have working correctly announcement type selectbox when warehouse is selected', async () => {
      const [announcementTypeSelectInput] = screen.getAllByRole('combobox');
      userEvent.click(announcementTypeSelectInput);
      const selectedAnnouncementType = await screen.findByText(/^WAREHOUSE$/);
      userEvent.click(selectedAnnouncementType);

      const [, warehouseSelectInput] = screen.getAllByRole('combobox');
      expect(warehouseSelectInput).toBeEnabled();

      const franchiseSelectInput = screen.getByPlaceholderText('Select Franchises');
      expect(franchiseSelectInput).toBeDisabled();

      const titleNativeInput = screen.getByPlaceholderText('Title in Native Language');
      expect(titleNativeInput).toBeEnabled();

      const titleEnInput = screen.getByPlaceholderText('Title in English');
      expect(titleEnInput).toBeEnabled();

      const descriptionNativeInput = screen.getByPlaceholderText('Description in Native Language');
      expect(descriptionNativeInput).toBeEnabled();

      const descriptionEnInput = screen.getByPlaceholderText('Description in English');
      expect(descriptionEnInput).toBeEnabled();

      const activeSwitchInput = screen.getByRole('switch', { name: 'Active' });
      expect(activeSwitchInput).toBeEnabled();

      const isNotification = screen.getByRole('checkbox', { name: 'Send Notification' });
      expect(isNotification).toBeDisabled();

      const startDateInput = screen.getByPlaceholderText('start date');
      expect(startDateInput).toBeDisabled();

      const endDateInput = screen.getByPlaceholderText('end date');
      expect(endDateInput).toBeDisabled();

      const createButton = screen.getByRole('button', { name: 'Create' });
      expect(createButton).toBeEnabled();
    });

    it('should have working correctly announcement type selectbox when franchise is selected', async () => {
      const [announcementTypeSelectInput] = screen.getAllByRole('combobox');
      userEvent.click(announcementTypeSelectInput);
      const selectedAnnouncementType = await screen.findByText(/^FRANCHISE$/);
      userEvent.click(selectedAnnouncementType);

      const [, warehouseSelectInput] = screen.getAllByRole('combobox');
      expect(warehouseSelectInput).toBeDisabled();

      const franchiseSelectInput = screen.getByPlaceholderText('Select Franchises');
      expect(franchiseSelectInput).toBeEnabled();

      const titleNativeInput = screen.getByPlaceholderText('Title in Native Language');
      expect(titleNativeInput).toBeEnabled();

      const titleEnInput = screen.getByPlaceholderText('Title in English');
      expect(titleEnInput).toBeDisabled();

      const descriptionNativeInput = screen.getByPlaceholderText('Description in Native Language');
      expect(descriptionNativeInput).toBeEnabled();

      const descriptionEnInput = screen.getByPlaceholderText('Description in English');
      expect(descriptionEnInput).toBeDisabled();

      const activeSwitchInput = screen.getByRole('switch', { name: 'Active' });
      expect(activeSwitchInput).toBeDisabled();

      const isNotification = screen.getByRole('checkbox', { name: 'Send Notification' });
      expect(isNotification).toBeEnabled();

      const startDateInput = screen.getByPlaceholderText('start date');
      expect(startDateInput).toBeEnabled();

      const endDateInput = screen.getByPlaceholderText('end date');
      expect(endDateInput).toBeEnabled();

      const createButton = screen.getByRole('button', { name: 'Create' });
      expect(createButton).toBeEnabled();
    });
  });
});
