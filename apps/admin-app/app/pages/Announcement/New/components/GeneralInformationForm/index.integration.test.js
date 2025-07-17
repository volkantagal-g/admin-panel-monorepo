import { screen } from '@testing-library/react';

import renderComponent from '@test/publicUtils/renderComponent';

import GeneralInformationForm from './index';

describe('<GeneralInformationForm /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<GeneralInformationForm />) });
    expect(screen.getByText('General Information')).toBeInTheDocument();
  });
});
