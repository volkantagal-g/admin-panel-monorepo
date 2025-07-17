import { screen } from '@testing-library/react';

import NotificationTagSelect from '@shared/containers/Marketing/Select/NotificationTagSelect';

import renderComponent from '@test/publicUtils/renderComponent';

describe('<NotificationTagSelect /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<NotificationTagSelect />) });
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
