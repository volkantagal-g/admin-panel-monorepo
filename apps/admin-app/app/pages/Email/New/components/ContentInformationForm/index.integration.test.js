import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import ContentInformationForm from './index';

describe('<ContentInformationForm /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<Form> <ContentInformationForm form={{ getFieldValue: () => 0 }} /></Form>) });
    expect(screen.getByText('Content Information')).toBeInTheDocument();
  });
});
