import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';
import TargetDomainSelect from '@shared/containers/Marketing/Select/TargetDomainSelect';

describe('<TargetDomainSelect /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<TargetDomainSelect />) });
    expect(screen.getByRole('combobox', { name: 'Target Domain' })).toBeInTheDocument();
  });
});
