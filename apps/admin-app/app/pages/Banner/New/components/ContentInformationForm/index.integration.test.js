import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';

import ContentInformatıonForm from './index';

describe('<ContentInformatıonForm /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<ContentInformatıonForm />) });
    expect(screen.getByText('Content Information')).toBeInTheDocument();
  });
});
