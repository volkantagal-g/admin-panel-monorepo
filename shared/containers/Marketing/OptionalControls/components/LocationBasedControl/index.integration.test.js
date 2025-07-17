import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import CityAndWareHouseControl from './index';

describe('<CityAndWareHouseControl /> Component - Integration Tests', () => {
  // TODO: Fix the failing tests
  it.skip('should component wrapper render successfully', async () => {
    await renderComponent({ ui: (<CityAndWareHouseControl />) });
    expect(screen.getByRole('rowheader', { name: 'City and Warehouse Control' })).toBeInTheDocument();
  });
});
