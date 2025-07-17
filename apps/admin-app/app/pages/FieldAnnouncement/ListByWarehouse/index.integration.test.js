import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen, within } from '@testing-library/react';

import PageComponent from '.';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething, waitForAntTableHeaderTables, waitForAntTableBodies } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import { formatDate } from '@shared/utils/dateHelper';
import { getWarehouseAnnouncementsMock } from '@shared/api/fieldAnnouncement/index.mock.data';

const initialUrl = '/field-announcement/list-by-warehouse';

describe('In Warehouse Announcements Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_FIELD_ANNOUNCEMENT_LIST_BY_WAREHOUSE,
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
      const [warehouseSelectInputTitle] = await screen.findAllByText(/^Warehouse$/);
      expect(warehouseSelectInputTitle).toBeInTheDocument();
      const [warehouseSelectInput] = screen.getAllByRole('combobox');
      expect(warehouseSelectInput).toBeInTheDocument();
      expect(warehouseSelectInput).toBeEnabled();
      expect(warehouseSelectInput).not.toHaveValue();
    });

    it('should have correct table component header', async () => {
      [announcementTableHeader] = await waitForAntTableHeaderTables();
      within(announcementTableHeader).getByText('ID');
      within(announcementTableHeader).getByText('Title');
      within(announcementTableHeader).getByText('Warehouse');
      within(announcementTableHeader).getByText('Created By');
      within(announcementTableHeader).getByText('Date');
      within(announcementTableHeader).getByText('Active');
      within(announcementTableHeader).getByText('Action');
    });

    it('should show announcement information and detail buttons in announcement table', async () => {
      [announcementTableBody] = await waitForAntTableBodies();
      within(announcementTableBody).getByText(getWarehouseAnnouncementsMock.announcements[0].announcement._id);
      within(announcementTableBody).getByText(getWarehouseAnnouncementsMock.announcements[0].announcement.title.en);
      within(announcementTableBody).getByText(getWarehouseAnnouncementsMock.announcements[0].warehouse);
      within(announcementTableBody).getByText(getWarehouseAnnouncementsMock.announcements[0].announcement.createdBy);
      within(announcementTableBody).getByText(formatDate(getWarehouseAnnouncementsMock.announcements[0].announcement.createdAt));
      within(announcementTableBody).getAllByText(getWarehouseAnnouncementsMock.announcements[0].announcement.active ? 'Yes' : 'No');
      within(announcementTableBody).getAllByRole('button', { name: 'Detail' });
    });

    it('should be enable detail buttons on table', async () => {
      const [detailButtonForFirstAnnouncement, detailButtonForSecondAnnouncement] = screen.getAllByRole('button', { name: 'Detail' });
      expect(detailButtonForFirstAnnouncement).toBeEnabled();
      expect(detailButtonForSecondAnnouncement).toBeEnabled();
    });
  });
});
