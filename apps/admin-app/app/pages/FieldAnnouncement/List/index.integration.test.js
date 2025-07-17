import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, within, act, waitFor } from '@testing-library/react';

import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething, waitForAntTableHeaderTables, waitForAntTableBodies } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import { formatDate } from '@shared/utils/dateHelper';
import { getAnnouncementsMock } from '@shared/api/fieldAnnouncement/index.mock.data';
import { t } from '@shared/i18n';
import { convertStringFromCamelCaseToUpperCase } from './utils';
import PageComponent from '.';

const initialUrl = '/field-announcement/list';

describe('In Warehouse/Franchise Announcements Page:', () => {
  afterAll(cleanup);
  let renderResult;

  describe('For app level features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_FIELD_ANNOUNCEMENT_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });

  describe('For page features', () => {
    let announcementTableHeader;
    let announcementTableBody;

    it('should have correct filter fields when page first opened', async () => {
      const [announcementTypeInputTitle] = await screen.findAllByText(/^Announcement Type$/);
      expect(announcementTypeInputTitle).toBeInTheDocument();
      const [announcementTypeInput] = screen.getAllByRole('combobox');
      expect(announcementTypeInput).toBeInTheDocument();
      expect(announcementTypeInput).toBeEnabled();
      expect(announcementTypeInput).not.toHaveValue();

      const [titleInputTitle] = await screen.findAllByText(/^Title$/);
      expect(titleInputTitle).toBeInTheDocument();
      const titleInput = screen.getByPlaceholderText('Write Title');
      expect(titleInput).toBeInTheDocument();
      expect(titleInput).toBeEnabled();
      expect(titleInput).not.toHaveValue();

      const descriptionInputTitle = await screen.findByText(/^Description$/);
      expect(descriptionInputTitle).toBeInTheDocument();
      const descriptionInput = screen.getByPlaceholderText('Write Description');
      expect(descriptionInput).toBeInTheDocument();
      expect(descriptionInput).toBeEnabled();
      expect(descriptionInput).not.toHaveValue();

      const [activeInputTitle] = await screen.findAllByText(/^Active$/);
      expect(activeInputTitle).toBeInTheDocument();
      const [, activeInput] = screen.getAllByRole('combobox');
      expect(activeInput).toBeInTheDocument();
      expect(activeInput).toBeEnabled();
    });

    it('should have correct table component header', async () => {
      [announcementTableHeader] = await waitForAntTableHeaderTables();
      within(announcementTableHeader).getByText('Announcement Type');
      within(announcementTableHeader).getByText('Title');
      within(announcementTableHeader).getByText('Created By');
      within(announcementTableHeader).getByText('Start Date');
      within(announcementTableHeader).getByText('Active');
      within(announcementTableHeader).getByText('Action');
    });

    it('should show announcement information and action buttons in announcement table', async () => {
      [announcementTableBody] = await waitForAntTableBodies();
      within(announcementTableBody).getByText(t(`${convertStringFromCamelCaseToUpperCase(getAnnouncementsMock.data[0].announcementType)}`));
      within(announcementTableBody).getByText(getAnnouncementsMock.data[0].title.native);
      within(announcementTableBody).getByText(getAnnouncementsMock.data[0].createdBy);
      within(announcementTableBody).getByText(formatDate(getAnnouncementsMock.data[0].startDate));
      within(announcementTableBody).getByText(getAnnouncementsMock.data[0].active ? 'Yes' : 'No');
      within(announcementTableBody).getAllByRole('button', { name: 'Detail' });
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_FIELD_ANNOUNCEMENT_LIST_COMPONENT_DELETE_ANNOUNCEMENT]);
      });
      await waitFor(() => {
        within(announcementTableBody).getByRole('button', { name: 'Delete' });
      });
    });

    it('should be enable detail and delete buttons on table', async () => {
      const [detailButtonForFirstAnnouncement, detailButtonForSecondAnnouncement] = screen.getAllByRole('button', { name: 'Detail' });
      let deleteButtonForSecondAnnouncement;
      await waitFor(() => {
        deleteButtonForSecondAnnouncement = screen.getByRole('button', { name: 'Delete' });
        expect(deleteButtonForSecondAnnouncement).toBeInTheDocument();
      });
      expect(detailButtonForFirstAnnouncement).toBeEnabled();
      expect(detailButtonForSecondAnnouncement).toBeEnabled();
      expect(deleteButtonForSecondAnnouncement).toBeEnabled();
    });
  });
});
