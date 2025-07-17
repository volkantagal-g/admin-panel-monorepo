// TESTING_PRACTICE_EXAMPLE COMPONENT_INTEGRATION_TEST
import '@test/publicUtils/configureWithoutCleanup';

import renderComponent from '@test/publicUtils/renderComponent';
import MapField from '.';

describe('Testing Map Fields Component', () => {
  it('should render Map field component from Warehouse Details without error', async () => {
    await renderComponent({
      ui: (
        <MapField
          warehouseId="5dfa4a2e17b571cea40dff89"
        />
      ),
    });
  });

  it('should render Map field component from Franchise Details without error', async () => {
    await renderComponent({
      ui: (
        <MapField
          franchiseId="5dfa4a2e17b571cea40dff89"
        />
      ),
    });
  });
});
