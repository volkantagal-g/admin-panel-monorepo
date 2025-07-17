import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import ListInformationForm from './index';

describe('<ListInformationForm /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<Form> <ListInformationForm form={{ getFieldValue: () => 2 }} /></Form>) });
    expect(screen.getByText('List Information')).toBeInTheDocument();
  });
});
