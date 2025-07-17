import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';

import PageHeader from './index';

describe('<PageHeader /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<PageHeader />) });
    expect(screen.getByText('Announcement Detail Page')).toBeInTheDocument();
  });
});
