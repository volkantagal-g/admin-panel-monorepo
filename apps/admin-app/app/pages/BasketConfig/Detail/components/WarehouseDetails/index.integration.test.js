import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import WarehouseGeneralInfo from '.';
import { basketAmountDetailsSelector } from '../../redux/selectors';
import { warehouse } from '@shared/api/fleet/index.mock.data';

describe('WarehouseGeneralInfo Component', () => {
  beforeAll(() => {
    const basketConfig = jest.spyOn(basketAmountDetailsSelector, 'getData');
    basketConfig.mockReturnValue({ warehouse });
  });

  it('should render WarehouseGeneralInfo Component with no error', async () => {
    await renderComponent({ ui: <WarehouseGeneralInfo /> });
    const component = screen.getByTestId('basket-config-warehouse-details-info');
    expect(component).toBeInTheDocument();
  });
});
