import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import PageHeader from './index';

describe('<PageHeader /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<PageHeader getAudienceStatistics={jest.fn()} />) });
    expect(screen.getByText('Sms Detail Page')).toBeInTheDocument();
  });
});
