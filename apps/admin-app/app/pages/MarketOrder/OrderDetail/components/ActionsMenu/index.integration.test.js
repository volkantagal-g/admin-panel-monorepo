import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import ActionsMenu from '.';

describe('ActionsMenu in CREATE mode:', () => {
  describe('when no inputs changed', () => {
    it('should render Actions Dropdown without error', async () => {
      await renderComponent({ ui: <ActionsMenu /> });
      await screen.findByText('Actions');
      const dropDownButton = screen.getByTestId('action-menu-dropdown-button');
      dropDownButton.click();
      await screen.findByTestId('action-menu-list-item-cancel');
      await screen.findByTestId('action-menu-list-item-slot-order');
    });

    it('should have rendered Action button correctly', async () => {
      const dropDownButton = screen.getByTestId('action-menu-dropdown-button');
      const dropDownButtonSvg = screen.getByTestId('action-menu-dropdown-svg');
      expect(dropDownButton).toBeInTheDocument();
      expect(dropDownButtonSvg).toBeInTheDocument();
    });

    it('should have rendered "Cancel the Order" button correctly', async () => {
      const dropDownButton = screen.getByTestId('action-menu-dropdown-button');
      dropDownButton.click();
      const actionMenu = screen.getByTestId('action-menu-list');
      const actionMenuItem = screen.getByTestId('action-menu-list-item-cancel');
      expect(actionMenu).toBeInTheDocument();
      expect(actionMenuItem).toBeInTheDocument();
    });

    it('should render "change slot" button correctly', async () => {
      const dropDownButton = screen.getByTestId('action-menu-dropdown-button');
      dropDownButton.click();
      const actionMenu = screen.getByTestId('action-menu-list');
      const changeSlotMenuItem = screen.getByTestId('action-menu-list-item-slot-order');
      expect(actionMenu).toBeInTheDocument();
      expect(changeSlotMenuItem).toBeInTheDocument();
    });
  });
});
