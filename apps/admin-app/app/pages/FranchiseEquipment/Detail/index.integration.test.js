import '@test/publicUtils/configureWithoutCleanup';
import { screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import { waitPageToRenderSomething } from '@test/publicUtils/assertions';
import permKey from '@shared/shared/permKey.json';
import PageComponent from '.';

const franchiseEquipmentRightId = '62fe7668726aecc3d8bbf066';
const initialUrl = `/franchiseEquipment/detail/${franchiseEquipmentRightId}`;

describe('In Franchise Equipment Detail Page:', () => {
  afterAll(cleanup);
  describe('For page features', () => {
    it('should render without an error', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_FRANCHISE_EQUIPMENT_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
      await waitPageToRenderSomething();
    });

    it("should show initial equipment right inputs in 'New Franchise-Warehouse Equipment Right' box", async () => {
      expect(screen.getByText('Initial Equipment Right')).toBeInTheDocument();
      const motoCountPanel = screen.getByText('Moto Count (2)');
      userEvent.click(motoCountPanel);
      await waitFor(() => {
        expect(screen.getByText('helmet')).toBeInTheDocument();
      });
      const defaultEquipmentsPanel = screen.getByText('Default Equipments');
      userEvent.click(defaultEquipmentsPanel);
      await waitFor(() => {
        expect(screen.getByText('printer')).toBeInTheDocument();
      });
      const initialEquipmentRigthInputs = screen.getAllByPlaceholderText('Initial Equipment Right');
      expect(initialEquipmentRigthInputs.length).toBe(17);
    });

    it('should have correct vehicle count box', () => {
      expect(screen.getByText('Vehicle Count')).toBeInTheDocument();
      const carCountInput = screen.getByPlaceholderText('Car Count');
      expect(carCountInput).toBeInTheDocument();
      expect(carCountInput).toBeDisabled();
      const motoCountInput = screen.getByPlaceholderText('Moto Count');
      expect(motoCountInput).toBeInTheDocument();
      expect(motoCountInput).toBeDisabled();
      const [, editButton] = screen.getAllByRole('button', { name: 'Edit' });
      expect(editButton).toBeInTheDocument();
    });

    it('should show save and cancel buttons after clicked edit button in vehicle count box', async () => {
      const [, editButton] = screen.getAllByRole('button', { name: 'Edit' });
      userEvent.click(editButton);
      await waitFor(() => {
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        expect(cancelButton).toBeInTheDocument();
      });
      const saveButton = screen.getByRole('button', { name: 'Save' });
      expect(saveButton).toBeInTheDocument();
    });

    it('should be able to edit number inputs in vehicle count box', async () => {
      const carCountInput = screen.getByPlaceholderText('Car Count');
      userEvent.click(carCountInput);
      userEvent.clear(carCountInput);
      userEvent.type(carCountInput, '1');
      await waitFor(() => {
        expect(carCountInput).toHaveDisplayValue('01');
      });

      const motoCountInput = screen.getByPlaceholderText('Moto Count');
      userEvent.click(motoCountInput);
      userEvent.clear(motoCountInput);
      userEvent.type(motoCountInput, '2');
      await waitFor(() => {
        expect(motoCountInput).toHaveDisplayValue('02');
      });
    });

    it('should show confirm popup when clicking save button in vehicle count box', async () => {
      const confirmText = 'Are you sure you want to do this?';
      const saveButton = screen.getByRole('button', { name: 'Save' });
      userEvent.click(saveButton);
      await waitFor(() => {
        const okButton = screen.getByRole('button', { name: 'OK' });
        expect(okButton).toBeInTheDocument();
      });
      expect(screen.getByText(confirmText)).toBeInTheDocument();
    });

    it('should be able to save vehicle counts in vehicle count box', async () => {
      const okButton = screen.getByRole('button', { name: 'OK' });
      userEvent.click(okButton);
      await waitFor(() => {
        const saveButton = screen.getByRole('button', { name: 'Save' });
        expect(saveButton).toBeDisabled();
      });
    });
  });
});
