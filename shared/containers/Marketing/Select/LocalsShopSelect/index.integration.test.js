import { screen } from '@testing-library/react';

import LocalsShopSelect from '@shared/containers/Marketing/Select/LocalsShopSelect';

import renderComponent from '@test/publicUtils/renderComponent';

describe('<LocalsShopSelect /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<LocalsShopSelect />) });
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
