import { screen } from '@testing-library/react';
import { Form } from 'antd';

import renderComponent from '@test/publicUtils/renderComponent';
import SendingInformationForm from './index';

describe('<SendingInformationForm /> Component - Integration Tests', () => {
  it('should component render successfully', async () => {
    await renderComponent({
      ui: (
        <Form>
          <SendingInformationForm />
        </Form>
      ),
    });
    expect(screen.getByText('Sending Information')).toBeInTheDocument();
  });

  it('should date range input render successfully', async () => {
    await renderComponent({
      ui: (
        <Form>
          <SendingInformationForm />
        </Form>
      ),
    });
    expect(screen.getByLabelText('Date Range')).toBeInTheDocument();
  });
});
