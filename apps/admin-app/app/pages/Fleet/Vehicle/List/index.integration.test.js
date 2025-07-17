import '@test/publicUtils/configureWithoutCleanup';
import { fireEvent, screen, waitFor, within } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectSidebarMenuToHaveV2, waitForAntTableBodies, waitForItemToBeSelected } from '@test/publicUtils/assertions';

import { mockedVehicles } from '@shared/api/fleet/index.mock.data';
import PageComponent from '.';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getFranchiseListConfigMock, getWarehouseListConfigMock } from '@shared/api/kds/auditForm/index.mock.handler';

const initialUrl = '/fleet/vehicle/list';

describe('In the vehicle Page', () => {
  describe('For app level Features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getFranchiseListConfigMock);
      mockApiPerTestCase(getWarehouseListConfigMock);
      await renderPage({
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
    it('should fill filter parameters', async () => {
      const [
        domainTypes,
        whTypes,
        warehouse,
        franchise,
        vehicleType,
        status,
        city,
        tags,
      ] = screen.getAllByRole('combobox');

      userEvent.click(domainTypes);
      const domainTypeName = await screen.findByText('Getir10');
      userEvent.click(domainTypeName);
      await waitForItemToBeSelected('Getir10');

      userEvent.click(whTypes);
      const whTypeName = await screen.findByText('Main Warehouse');
      userEvent.click(whTypeName);
      await waitForItemToBeSelected('Main Warehouse');

      userEvent.click(warehouse);
      const whName = await screen.findByText('Gaziemir');
      userEvent.click(whName);
      await waitForItemToBeSelected('Gaziemir');

      userEvent.click(franchise);
      const franchiseName = await screen.findByText(/Merve Ayçiçek/i);
      userEvent.click(franchiseName);
      await waitForItemToBeSelected(/Merve Ayçiçek/i);

      userEvent.click(tags);
      const tagName = await screen.findByText('Dio');
      userEvent.click(tagName);
      await waitForItemToBeSelected('Dio');

      userEvent.click(city);
      const selectedCity = await screen.findByText('Istanbul');
      userEvent.click(selectedCity);
      await waitForItemToBeSelected('Istanbul');

      const plateNumberInput = await screen.findByTestId('plateVehicleWarehouse');
      fireEvent.change(plateNumberInput, { target: { value: '34BRK97' } });
      await waitFor(() => {
        expect(plateNumberInput).toHaveValue('34BRK97');
      });

      userEvent.click(vehicleType);
      const selectedVehicle = await screen.findByText('Mitu');
      userEvent.click(selectedVehicle);
      await waitForItemToBeSelected('Mitu');

      userEvent.click(status);
      const selectedStatus = await screen.findByText('In Use');
      userEvent.click(selectedStatus);
      await waitForItemToBeSelected('In Use');

      const bringButton = await screen.findByText('Bring');
      expect(bringButton).toBeInTheDocument();
      userEvent.click(bringButton);

      const [body] = await waitForAntTableBodies();

      await within(body).findByText(mockedVehicles.vehicles[0].constraint.name);
    });

    it('should match mock data information with engine number in vehicle table', async () => {
      const [body] = await waitForAntTableBodies();

      await within(body).findByText(mockedVehicles.vehicles[0].licence.engineNumber);
    });

    it('should pagination work', async () => {
      const comboboxes = await screen.findAllByRole('combobox');
      userEvent.click(comboboxes[8]);
      const [, selectedLimitNumber] = screen.getAllByText('10');
      userEvent.click(selectedLimitNumber);
      await waitForItemToBeSelected('10');
    });
  });
});
