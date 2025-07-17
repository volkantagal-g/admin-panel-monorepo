import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import WarehouseSelect from '@shared/containers/Marketing/Select/WarehouseSelect';

describe('<WarehouseSelect /> Component - Integration Tests', () => {
  it('should select all button render successfully', async () => {
    await renderComponent({ ui: (<WarehouseSelect form={{ getFieldValue: () => [], setFields: () => true }} />) });
    expect(screen.getByRole('button', { name: 'Select All' })).toBeInTheDocument();
  });
});
