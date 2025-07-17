// TESTING_PRACTICE_EXAMPLE COMPONENT_INTEGRATION_TEST
import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderComponent from '@test/publicUtils/renderComponent';
import Filter from '.';

const onVisibleChange = jest.fn();

describe('Filter in Listing Page:', () => {
  describe('Filter component', () => {
    it('should render Filter without error', async () => {
      await renderComponent({
        ui: (
          <Filter
            handleSubmit={onVisibleChange}
          />
        ),
      });
      await screen.findByText('Filters');
    });

    it('should have rendered Action button correctly', async () => {
      const statusSelect = screen.queryByTestId('plateVehicleWarehouse');
      userEvent.type(statusSelect, 'test');
      expect(screen.getByTestId('plateVehicleWarehouse')).toHaveValue('test');
    });

    it('should have rendered Bring button correctly', async () => {
      const bringVehicle = screen.queryByTestId('bringVehicle');
      userEvent.click(bringVehicle);
    });
  });
});
