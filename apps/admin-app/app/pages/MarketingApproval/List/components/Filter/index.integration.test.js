import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import BannerFilter from './index';

describe('<BannerFilter /> Component - Integration Tests', () => {
  it('should filter form render successfully', async () => {
    await renderComponent({ ui: (<BannerFilter />) });
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
});
