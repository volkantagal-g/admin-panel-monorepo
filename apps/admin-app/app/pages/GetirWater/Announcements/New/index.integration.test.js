import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { mockedAnnouncementBody, expectedAnnouncementBody } from '@shared/api/water/index.mock.data';

import createAnnouncementBody from '../utils/createAnnouncementBody';
import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';
import waitForLoading from '@test/utils/waitForLoading';

const initialUrl = '/getirWater/announcement/new';

describe('In GetirWater Announcement Creation Page:', () => {
  // eslint-disable-next-line no-unused-vars
  let renderResult;
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_GETIR_WATER_ANNOUNCEMENT_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitForLoading();
      await waitPageToRenderSomething();
    });
    it('should have correct page content', async () => {
      expect(screen.getByText('Getir Water New Announcement')).toBeInTheDocument();
      expect(screen.getByText('Target')).toBeInTheDocument();
      expect(screen.getAllByText('Priority').length).toBeGreaterThan(1);
      expect(screen.getByText('Title (EN)', { exact: true })).toBeInTheDocument();
      expect(screen.getByText('Title (TR)', { exact: true })).toBeInTheDocument();
      expect(screen.getByText('Description (TR)')).toBeInTheDocument();
      expect(screen.getByText('Description (EN)')).toBeInTheDocument();
      expect(screen.getByText('Accessibility Label (TR)')).toBeInTheDocument();
      expect(screen.getByText('Accessibility Label (EN)')).toBeInTheDocument();
      expect(screen.getByText('Announcement Page Title (TR)')).toBeInTheDocument();
      expect(screen.getByText('Announcement Page Title (EN)')).toBeInTheDocument();
      expect(screen.getByText('Announcement Content Section Title (TR)')).toBeInTheDocument();
      expect(screen.getByText('Announcement Content Section Title (EN)')).toBeInTheDocument();
      expect(screen.getByText('Announcement Content HTML (EN)')).toBeInTheDocument();
      expect(screen.getByText('Announcement Content HTML (TR)')).toBeInTheDocument();

      expect(screen.getAllByText('Past Getir10 Order Count').length).toBeGreaterThan(1);
      expect(screen.getAllByText('Past GetirWater MP Order Count').length).toBeGreaterThan(1);
      expect(screen.getByText('Cities')).toBeInTheDocument();
      expect(screen.getByText('Vendors')).toBeInTheDocument();
      expect(screen.getByText('Brands')).toBeInTheDocument();
      expect(screen.getByText('Exclude White Collar')).toBeInTheDocument();
      expect(screen.getByText('Platform')).toBeInTheDocument();
      expect(screen.getByText('Exclude Field Staff')).toBeInTheDocument();

      expect(screen.getAllByText('Start Date').length).toBeGreaterThan(1);
      expect(screen.getAllByText('End Date').length).toBeGreaterThan(1);
      expect(screen.getByText('Picture Preview')).toBeInTheDocument();
      expect(screen.getByText('Valid Times')).toBeInTheDocument();
      expect(screen.getByText('Picture Preview (TR)')).toBeInTheDocument();
      expect(screen.getByText('Picture Preview (EN)')).toBeInTheDocument();
      expect(screen.getByText('Date Information')).toBeInTheDocument();

      expect(screen.getAllByText('Button Action').length).toBeGreaterThan(1);
      expect(screen.getByText('Button Text (TR)')).toBeInTheDocument();
      expect(screen.getByText('Button Text (EN)')).toBeInTheDocument();
      expect(screen.getAllByText('Type').length).toBeGreaterThan(1);
      expect(screen.getAllByText('Redirect to X').length).toBeGreaterThan(1);

      expect(screen.getByText('Banner Details')).toBeInTheDocument();
      expect(screen.getAllByText('General Info').length).toBeGreaterThan(1);
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Banner Action')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
    });
  });

  describe('For page features', () => {
    it('should show validation errors when required fields are not filled', async () => {
      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);

      const citiesError = await screen.findByText('Please enter Cities');
      const statusInvalidError = await screen.findAllByRole('alert');

      expect(citiesError).toBeInTheDocument();
      expect(statusInvalidError.length).toBeGreaterThanOrEqual(9);
    });
  });

  describe('For Button Action Sections', () => {
    it('should show validation errors when required fields are not filled', async () => {
      const buttonActionActivateSwitch = screen.getByRole('switch', { name: 'Button Action' });
      userEvent.click(buttonActionActivateSwitch);

      const submitButton = screen.getByText('Save');
      userEvent.click(submitButton);

      const trButtonText = await screen.findByText('Please enter Button Text (TR)');
      const statusInvalidError = await screen.findAllByRole('alert');

      expect(trButtonText).toBeInTheDocument();
      expect(statusInvalidError.length).toBeGreaterThanOrEqual(13);
    });
  });

  describe('Create Announcement Body ', () => {
    it('should create new Announcement Body', async () => {
      const ourResponse = createAnnouncementBody(mockedAnnouncementBody, null, false);

      expect(ourResponse).toEqual(expectedAnnouncementBody);
    });
  });
});
