import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';

import ImageUploader from './index';

describe('<ImageUploader /> Component - Integration Tests', () => {
  it('should upload btn render successfully', async () => {
    await renderComponent({ ui: (<ImageUploader />) });
    expect(screen.getByRole('button', { name: 'Change Image' })).toBeInTheDocument();
  });

  it('should upload modal render successfully', async () => {
    const modalTitle = 'modalTitle';
    await renderComponent({ ui: (<ImageUploader modalTitle={modalTitle} />) });
    const modalToggleBtn = screen.getByRole('button', { name: 'Change Image' });
    await modalToggleBtn.click();
    expect(screen.getByText(modalTitle)).toBeInTheDocument();
  });
});
