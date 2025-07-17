import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import GeneralInformationForm from './index';

describe('<GeneralInformationForm /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<Form> <GeneralInformationForm form={{ getFieldValue: () => 2 }} /></Form>) });
    expect(screen.getByText('General Information')).toBeInTheDocument();
  });
});
