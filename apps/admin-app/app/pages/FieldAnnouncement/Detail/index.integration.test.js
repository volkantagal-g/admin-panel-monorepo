import '@test/publicUtils/configureWithoutCleanup';
import { cleanup, screen } from '@testing-library/react';

import PageComponent from '.';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import { getFranchiseAnnouncementDetailMock } from '@shared/api/fieldAnnouncement/index.mock.data';
import { formatDate } from '@shared/utils/dateHelper';
import { getLocalDateFormat } from '@shared/utils/localization';

const exAnnouncementId = '63dbd29c5311ea1759a5837c';
const initialUrl = `/field-announcement/detail/${exAnnouncementId}`;

describe('In Warehouse Franchise Announcement Detail Page:', () => {
  afterAll(cleanup);

  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_FIELD_ANNOUNCEMENT_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
  });

  describe('For page features', () => {
    it('should have correct card and page titles for Franchise Announcement', async () => {
      expect(screen.getByText('Franchise Announcement')).toBeInTheDocument();
      expect(screen.getByText('Announcement Detail')).toBeInTheDocument();
    });

    it('should have correct fields for franchise announcement', () => {
      expect(screen.getByText('Franchises')).toBeInTheDocument();
      const [franchiseSelectInput] = screen.getAllByRole('combobox');
      expect(franchiseSelectInput).toBeInTheDocument();
      expect(franchiseSelectInput).toBeDisabled();

      expect(screen.getByText('Announcement Date')).toBeInTheDocument();
      const startDateInput = screen.getByPlaceholderText('Start date');
      expect(startDateInput).toBeInTheDocument();
      expect(startDateInput).toBeDisabled();
      expect(startDateInput).toHaveValue(formatDate(getFranchiseAnnouncementDetailMock.startDate, getLocalDateFormat()));

      const endDateInput = screen.getByPlaceholderText('End date');
      expect(endDateInput).toBeInTheDocument();
      expect(endDateInput).toBeDisabled();
      expect(endDateInput).toHaveValue(formatDate(getFranchiseAnnouncementDetailMock.endDate, getLocalDateFormat()));

      expect(screen.getByText('Title in Native Language')).toBeInTheDocument();
      const titleNativeInput = screen.getByPlaceholderText('Title in Native Language');
      expect(titleNativeInput).toBeInTheDocument();
      expect(titleNativeInput).toBeDisabled();
      expect(titleNativeInput).toHaveValue(getFranchiseAnnouncementDetailMock.title.native);

      expect(screen.getByText('Description in Native Language')).toBeInTheDocument();
      const descriptionNativeInput = screen.getByPlaceholderText('Description in Native Language');
      expect(descriptionNativeInput).toBeInTheDocument();
      expect(descriptionNativeInput).toBeDisabled();
      expect(titleNativeInput).toHaveValue(getFranchiseAnnouncementDetailMock.description.native);

      expect(screen.getByText('Active')).toBeInTheDocument();
      const activeSwitchInput = screen.getByRole('switch', { name: 'Active' });
      expect(activeSwitchInput).toBeInTheDocument();
      expect(activeSwitchInput).toBeDisabled();
      expect(activeSwitchInput).toHaveValue(`${getFranchiseAnnouncementDetailMock.active}`);
    });
  });
});
