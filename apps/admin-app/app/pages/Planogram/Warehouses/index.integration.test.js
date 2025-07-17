import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '@app/pages/Planogram/Warehouses/index';
import Filters from './components/Filters';
import renderComponent from '@test/publicUtils/renderComponent';

const getRegionsRequest = jest.fn();
const setFormValues = jest.fn();

describe('Warehouses List Page', () => {
  const initialUrl = '/planogram/warehouses';
  describe('For app level features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_PLANOGRAM_WAREHOUSES,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
    });
  });
  describe('For page features', () => {
    beforeEach(() => {
      setFormValues.mockReset();
      getRegionsRequest.mockReset();
    });

    it('should have correct filter form content', async () => {
      await renderComponent({
        ui: (
          <Filters
            getRegionsRequest={getRegionsRequest}
            setFormValues={setFormValues}
            initialPagination={{ page: 1, pageSize: 10 }}
          />
        ),
      });
      expect(screen.getByText('Warehouse Id')).toBeInTheDocument();
      expect(screen.getByText('Warehouse Name')).toBeInTheDocument();
      expect(screen.getByText('Demography')).toBeInTheDocument();
      expect(screen.getByText('Size')).toBeInTheDocument();
      expect(screen.getByText('Domain')).toBeInTheDocument();
      expect(screen.getByText('Warehouse Type')).toBeInTheDocument();
      expect(screen.getByText('City')).toBeInTheDocument();
      expect(screen.getByText('Region')).toBeInTheDocument();
      expect(screen.getByText('Apply')).toBeInTheDocument();
    });
    it('should have domains', async () => {
      expect(screen.queryByText('Getir10')).not.toBeInTheDocument();
      const domain = screen.getByLabelText('Domain');
      userEvent.click(domain);
      expect(screen.getByText('G10')).toBeInTheDocument();
      const selectedDomain = screen.getByLabelText('Domain');
      userEvent.click(selectedDomain);
      expect(screen.queryByPlaceholderText('Domain')).not.toBeInTheDocument();
    });
  });
});
