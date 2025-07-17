import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import CitySelect from '@shared/containers/Marketing/Select/CitySelect';

describe('<CitySelect /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<CitySelect />) });
    expect(screen.getByRole('button', { name: 'Select All' })).toBeInTheDocument();
  });
});
