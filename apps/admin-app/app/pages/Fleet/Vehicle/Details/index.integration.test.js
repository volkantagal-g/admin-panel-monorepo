import '@test/publicUtils/configureWithoutCleanup';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import waitForLoading from '@test/utils/waitForLoading';
import PageComponent from '.';
import mockApiPerTestCase from '@test/publicUtils/mockApiPerTestCase';
import { getFranchiseListConfigMock, getWarehouseListConfigMock } from '@shared/api/kds/auditForm/index.mock.handler';

const initialUrl = '/fleet/vehicle/detail/61a8aadd355088239a51c7a1';

describe('In the vehicle Page', () => {
  describe('For app level Features', () => {
    it('should render without an error', async () => {
      mockApiPerTestCase(getWarehouseListConfigMock);
      mockApiPerTestCase(getFranchiseListConfigMock);
      await renderPage({
        pagePermKey: permKey.PAGE_VEHICLE_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have filled inputs', async () => {
      await waitForLoading();
      const bringVehicle = screen.queryByTestId('editButton');
      userEvent.click(bringVehicle);

      const plateInput = screen.getByTestId('plateTest');
      fireEvent.change(plateInput, { target: { value: 'ABC' } });
      await waitFor(() => {
        expect(plateInput).toHaveValue('ABC');
      });

      const licenseSeriesTestInput = screen.getByPlaceholderText('License Number');
      fireEvent.change(licenseSeriesTestInput, { target: { value: 123 } });
      await waitFor(() => {
        expect(licenseSeriesTestInput).toHaveValue(123);
      });

      const licenseNumberTestInput = screen.getByPlaceholderText('License Series');
      fireEvent.change(licenseNumberTestInput, { target: { value: 'test title tr' } });
      await waitFor(() => {
        expect(licenseNumberTestInput).toHaveValue('test title tr');
      });

      const licensePictureTestInput = screen.getByPlaceholderText('License Picture');
      fireEvent.change(licensePictureTestInput, { target: { value: 'test title tr' } });
      await waitFor(() => {
        expect(licensePictureTestInput).toHaveValue('test title tr');
      });

      const brandTestInput = screen.getByPlaceholderText('Brand');
      fireEvent.change(brandTestInput, { target: { value: 'test title tr' } });
      await waitFor(() => {
        expect(brandTestInput).toHaveValue('test title tr');
      });

      const modalTestInput = screen.getByPlaceholderText('Model');
      fireEvent.change(modalTestInput, { target: { value: 'test title tr' } });
      await waitFor(() => {
        expect(modalTestInput).toHaveValue('test title tr');
      });

      const modalYearTestInput = screen.getByPlaceholderText('Model Year');
      fireEvent.change(modalYearTestInput, { target: { value: '2022' } });
      await waitFor(() => {
        expect(modalYearTestInput).toHaveValue(2022);
      });

      const colorTestInput = screen.getByPlaceholderText('Color');
      fireEvent.change(colorTestInput, { target: { value: 'test title tr' } });
      await waitFor(() => {
        expect(colorTestInput).toHaveValue('test title tr');
      });

      const gradeTestInput = screen.getByPlaceholderText('Grade');
      fireEvent.change(gradeTestInput, { target: { value: 'test title tr' } });
      await waitFor(() => {
        expect(gradeTestInput).toHaveValue('test title tr');
      });

      const bodyTestInput = screen.getByPlaceholderText('Body Type');
      fireEvent.change(bodyTestInput, { target: { value: 'test title tr' } });
      await waitFor(() => {
        expect(bodyTestInput).toHaveValue('test title tr');
      });

      const engineTestInput = screen.getByPlaceholderText('Engine Number');
      fireEvent.change(engineTestInput, { target: { value: 'test title tr' } });
      await waitFor(() => {
        expect(engineTestInput).toHaveValue('test title tr');
      });

      const chasisTestInput = screen.getByPlaceholderText('Chassis Number');
      fireEvent.change(chasisTestInput, { target: { value: 'test title tr' } });
      await waitFor(() => {
        expect(chasisTestInput).toHaveValue('test title tr');
      });

      const inspectionTestInput = screen.getByTestId('inspectionTest');
      fireEvent.change(inspectionTestInput, { target: { value: '1990-01-01' } });
      await waitFor(() => {
        expect(inspectionTestInput).toHaveValue('1990-01-01');
      });

      const firstRegistryTestInput = screen.getByTestId('firstRegistryTest');
      fireEvent.change(firstRegistryTestInput, { target: { value: '1990-01-01' } });
      await waitFor(() => {
        expect(firstRegistryTestInput).toHaveValue('1990-01-01');
      });

      const registryTestInput = screen.getByTestId('registryTest');
      fireEvent.change(registryTestInput, { target: { value: '1990-01-01' } });
      await waitFor(() => {
        expect(registryTestInput).toHaveValue('1990-01-01');
      });
    });
    it('should have vehicle logs content', () => {
      expect(screen.getByText('Old City')).toBeInTheDocument();
    });
  });
});
