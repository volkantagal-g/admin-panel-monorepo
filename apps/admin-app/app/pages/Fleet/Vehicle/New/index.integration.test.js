import '@test/publicUtils/configureWithoutCleanup';

import { screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import permKey from '@shared/shared/permKey.json';
import { waitPageToRenderSomething, expectToHavePageHeaderText } from '@test/publicUtils/assertions';
import PageComponent from '.';

const initialUrl = '/fleet/vehicle/new';

describe('In the vehicle Page', () => {
  describe('For app level Features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_VEHICLE_NEW,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });
    it('should have correct page header', () => {
      expectToHavePageHeaderText('New Vehicle');
    });

    it('should have correct page content', async () => {
      expect(screen.getByText('License Holder')).toBeInTheDocument();
      expect(screen.getByText('License Series')).toBeInTheDocument();
      expect(screen.getByText('License Number')).toBeInTheDocument();
      expect(screen.getByText('License Picture')).toBeInTheDocument();
    });

    it('testing Form fields', async () => {
      // eslint-disable-next-line testing-library/no-node-access
      const licenseHolderInput = screen.getByPlaceholderText('License Holder');
      userEvent.type(licenseHolderInput, 'test');
      await waitFor(() => {
        expect(screen.getByPlaceholderText('License Holder')).toHaveValue('test');
      });

      // eslint-disable-next-line testing-library/no-node-access
      const vehicleTypeOption = screen.getByTestId('vehicleType').firstChild;
      fireEvent.mouseDown(vehicleTypeOption);
      await waitFor(() => expect(screen.getByText('Mitu')));
      const optionsVehicleType = screen.getByText('Mitu');
      userEvent.click(optionsVehicleType);

      const plateInput = screen.getByTestId('plateTest');
      fireEvent.change(plateInput, { target: { value: 'ABC' } });
      await waitFor(() => {
        expect(plateInput).toHaveValue('ABC');
      });

      const licenseSeriesTestInput = screen.getByPlaceholderText('License Number');
      fireEvent.change(licenseSeriesTestInput, { target: { value: '123' } });
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

      const createVehicle = screen.queryByTestId('createVehicle');
      userEvent.click(createVehicle);
    });

    it('toggles "Create Another" checkbox state on click', async () => {
      const createAnotherCheckbox = screen.getByTestId('isCreatingAnotherVehicle');

      // The checkbox should be unchecked by default
      expect(createAnotherCheckbox.checked).toBe(false);

      fireEvent.click(createAnotherCheckbox);

      expect(createAnotherCheckbox.checked).toBe(true);
    });
  });
});
