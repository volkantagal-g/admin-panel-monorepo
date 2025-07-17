import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import NotificationCenterFilter from './index';

describe('<NotificationCenterFilter /> Component - Integration Tests', () => {
  it('should filter form render successfully', async () => {
    await renderComponent({ ui: (<NotificationCenterFilter />) });
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
});
