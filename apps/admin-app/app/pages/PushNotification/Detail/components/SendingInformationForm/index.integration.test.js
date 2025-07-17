import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import SendingInformationForm from './index';

describe('<SendingInformationForm /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({ ui: (<Form> <SendingInformationForm form={{ getFieldValue: () => 2 }} /></Form>) });
    expect(screen.getByText('Notification Sending Information')).toBeInTheDocument();
  });
});
