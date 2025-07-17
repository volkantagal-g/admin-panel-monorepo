import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import Header from './index';

describe('<Header /> Component - Integration Tests', () => {
  it('should header component render successfully', async () => {
    await renderComponent({ ui: (<Header />) });
    expect(screen.getByText('Notification Center')).toBeInTheDocument();
  });
});
