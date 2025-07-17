import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import ClientAppActionForm from './index';

describe('<ClientAppActionForm /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<Form> <ClientAppActionForm form={{ getFieldValue: () => 2 }} /></Form>) });
    expect(screen.getByText('AI App Actions')).toBeInTheDocument();
  });
});
