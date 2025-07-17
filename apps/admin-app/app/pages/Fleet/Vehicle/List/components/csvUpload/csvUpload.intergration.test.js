import '@test/publicUtils/configureWithoutCleanup';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { BULK_CREATION_CSV_CONTENT, BULK_CREATION_CSV_HEADER } from '@app/pages/Fleet/Vehicle/List/constant';
import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectSidebarMenuToHaveV2 } from '@test/publicUtils/assertions';
import waitForLoading from '@test/utils/waitForLoading';

import PageComponent from '../..';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getFranchiseListConfigMock, getWarehouseListConfigMock } from '@shared/api/kds/auditForm/index.mock.handler';

const initialUrl = '/fleet/vehicle/list';

describe('In the vehicle Page CSV UPLOAD', () => {
  let renderResult;

  describe('For app level Features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getWarehouseListConfigMock);
      mockApiPerTestCase(getFranchiseListConfigMock);
      renderResult = await renderPage({
        pagePermKey: permKey.PAGE_VEHICLE_LIST,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should show related menu group', () => {
      expectSidebarMenuToHaveV2('Field', ['Fleet', 'Vehicle']);
    });
  });

  describe('For page features', () => {
    it('should open Upload Vehicle CSV List modal', async () => {
      const { addUserPermissions } = renderResult;
      act(() => {
        addUserPermissions([permKey.PAGE_VEHICLE_NEW_COMPONENT_CSV_BULK_UPLOAD]);
      });
      const uploadVehicleCsvButton = await screen.findByText('Upload Vehicle CSV List');

      expect(uploadVehicleCsvButton).toBeInTheDocument();
      userEvent.click(uploadVehicleCsvButton);

      const uploadFileText = await screen.findByText('Upload File');
      expect(uploadFileText).toBeInTheDocument();

      const downloadVehicleList = await screen.findByText('Download Vehicle List Template');
      userEvent.click(downloadVehicleList);
      expect(downloadVehicleList).toBeInTheDocument();

      const cancelButton = await screen.findByText('Cancel');
      userEvent.click(cancelButton);
      expect(uploadFileText).toBeInTheDocument();
    });

    it('should be able to add file', async () => {
      const uploadVehicleCsvButton = await screen.findByText('Upload Vehicle CSV List');

      expect(uploadVehicleCsvButton).toBeInTheDocument();
      userEvent.click(uploadVehicleCsvButton);

      const selectFileInput = await screen.findByLabelText(/Select file/i);
      await waitForLoading();

      const csvHeaders = BULK_CREATION_CSV_HEADER.join(',');
      const csvExamples = BULK_CREATION_CSV_CONTENT.join(',');
      const csvContent = `${csvHeaders}\n${csvExamples}\n`;

      fireEvent.change(selectFileInput, {
        target: {
          files: [
            new File([csvContent], 'test-file.csv', { type: 'text/csv' }),
          ],
        },
      });
      await waitFor(() => {
        expect(screen.getByText('Ready to import')).toBeInTheDocument();
      });

      const removeButton = await screen.findByText('Remove');
      expect(removeButton).toBeEnabled();
    });

    it('should remove button delete file', async () => {
      const removeButton = await screen.findByText(/Remove/i);

      userEvent.click(removeButton);

      await waitFor(() => {
        expect(screen.queryByText(/test-file/i)).not.toBeInTheDocument();
      });
    });

    xit('should change tab', async () => {
      const secondTab = screen.getByRole('tab', { name: 'Active / Inactive Vehicle List Template' });
      expect(secondTab).toHaveAttribute('aria-selected', 'false');

      const activeVehiclePage = await screen.findByText('Active / Inactive Vehicle List Template');
      userEvent.click(activeVehiclePage);
      expect(activeVehiclePage).toBeInTheDocument();

      expect(secondTab).toHaveAttribute('aria-selected', 'true');

      const downloadActiveVehicle = await screen.findByText('Download Active/Inactive Vehicle list template');
      userEvent.click(downloadActiveVehicle);
      expect(downloadActiveVehicle).toBeInTheDocument();
    });
  });
});
