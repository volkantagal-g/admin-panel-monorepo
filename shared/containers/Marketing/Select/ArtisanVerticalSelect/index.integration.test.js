import { screen } from '@testing-library/react';

import ArtisanVerticalSelect from '@shared/containers/Marketing/Select/ArtisanVerticalSelect';

import renderComponent from '@test/publicUtils/renderComponent';

describe('<ArtisanVerticalSelect /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<ArtisanVerticalSelect />) });
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
