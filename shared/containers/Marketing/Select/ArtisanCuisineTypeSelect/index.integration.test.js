import { screen } from '@testing-library/react';

import ArtisanCuisineTypeSelect from '@shared/containers/Marketing/Select/ArtisanCuisineTypeSelect';

import renderComponent from '@test/publicUtils/renderComponent';

describe('<ArtisanCuisineTypeSelect /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<ArtisanCuisineTypeSelect />) });
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
