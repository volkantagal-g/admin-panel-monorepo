import '@test/publicUtils/configureWithoutCleanup';
import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import WarehouseGeneralInfo from '.';

describe('WarehouseGeneralInfo component', () => {
  it('should render WarehouseGeneralInfo component without error', async () => {
    await renderComponent({ ui: <WarehouseGeneralInfo /> });
    const component = screen.getByTestId('warehouse-general-info');
    expect(component).toBeInTheDocument();
  });
});
