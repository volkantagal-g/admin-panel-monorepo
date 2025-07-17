import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import AnnouncementFilter from './index';

describe('<AnnouncementFilter /> Component - Integration Tests', () => {
  it('should filter form render successfully', async () => {
    await renderComponent({ ui: (<AnnouncementFilter />) });
    expect(screen.getByRole('form')).toBeInTheDocument();
  });
});
