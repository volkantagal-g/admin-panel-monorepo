// TESTING_PRACTICE_EXAMPLE PAGE_INTEGRATION_TEST
import '@test/publicUtils/configureWithoutCleanup';

import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import renderPage from '@test/publicUtils/renderPage';
import PageComponent from '.';

import permKey from '@shared/shared/permKey.json';
import FranchiseAreaInfo from './components/FranchiseAreaInfo';
import renderComponent from '@test/publicUtils/renderComponent';
import { getFranchiseAreas as getFranchiseAreasMock } from '@shared/api/marketFranchise/index.mock.data';

const initialUrl = '/warehouse/detail/test_id';

describe('Warehouse Detail Page:', () => {
  describe('For page details', () => {
    it('should render successfully', async () => {
      await renderPage({
        pagePermKey: permKey.PAGE_WAREHOUSE_DETAIL,
        pageUrl: initialUrl,
        pageComponent: PageComponent,
      });
    });
  });

  describe('For Franchise Area Info box', () => {
    let franchiseArea;
    it('should show correctly', async () => {
      const { addUserPermissions } = await renderComponent({
        ui: (
          <FranchiseAreaInfo
            franchiseArea=""
            franchiseAreas={getFranchiseAreasMock}
            submitRequest={jest.fn()}
            getFranchiseAreasRequest={jest.fn()}
          />
        ),
      });
      addUserPermissions([
        permKey.PAGE_WAREHOUSE_DETAIL_COMPONENT_EDIT_FRANCHISE_AREA_INFO,
        permKey.PAGE_WAREHOUSE_DETAIL_COMPONENT_EDIT_FRANCHISE_AREA_INFO,
      ]);

      await screen.findAllByText('Franchise Area');
      franchiseArea = screen.getByRole('combobox', { name: 'Franchise Area' });
    });

    it('should send form', async () => {
      expect(franchiseArea).toBeDisabled();

      const editButton = screen.getByText(/edit/i);
      userEvent.click(editButton);

      userEvent.click(editButton);
      expect(franchiseArea).toBeEnabled();
      userEvent.click(franchiseArea);

      const firstOption = screen.getByText(getFranchiseAreasMock[0].name);
      userEvent.click(firstOption);

      const saveButton = screen.getByText(/save/i);
      userEvent.click(saveButton);
    });

    it('should reset form', async () => {
      const editButton = screen.getByText(/edit/i);
      userEvent.click(editButton);
      expect(franchiseArea).toBeEnabled();
      userEvent.click(franchiseArea);
      const secondOption = screen.getByText(getFranchiseAreasMock[1].name);
      userEvent.click(secondOption);

      const cancelButton = screen.getByText(/cancel/i);
      userEvent.click(cancelButton);
    });
  });
});
