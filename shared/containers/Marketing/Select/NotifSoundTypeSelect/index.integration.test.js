import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';

import NotifSoundTypeSelect from '@shared/containers/Marketing/Select/NotifSoundTypeSelect/index';

describe('<NotifSoundTypeSelect /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<NotifSoundTypeSelect />) });
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
